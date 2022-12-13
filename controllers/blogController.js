const blogModel = require("../models/blogModel");
const moment = require("moment");

exports.createBlogPost = async (req, res) => {
  const text = req.body.body;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  const blogPost = await blogModel.create({
    author: req.body.author,
    description: req.body.description,
    timestamp: moment().toDate(),
    reading_time: `${time} mins`,
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
  });
  return res.status(201).json({ status: "New Post", blogPost });
};

exports.getBlogPosts = async (req, res) => {
  const { query } = req;

  const {
    timestamp,
    state,
    page = 1,
    per_page = 20,
    read_count,
    reading_time,
    author,
    title,
    tags,
  } = query;

  let findQuery = {};

  if (timestamp) {
    findQuery.timestamp = {
      $gt: moment(timestamp).startOf("day").toDate(),
      $lt: moment(timestamp).endOf("day").toDate(),
    };
  }

  if (state) {
    findQuery.state = state;
  }

  if (read_count) {
    findQuery.read_count = read_count;
  }

  if (reading_time) {
    findQuery.reading_time = reading_time;
  }

  if (author) {
    // findQuery.author = author;
    findQuery = { ...findQuery, "author": { "$regex": author, "$options": "i" } }
  }

  if (title) {
    findQuery.title = title;
  }

  if (tags) {
    findQuery.tags = tags.split("");
  //  findQuery = { tags: { $in:  tags } }
  //  console.log({ tags: { $in:  tags } })
  //  console.log(findQuery.tags = tags.split(""))
  }

  const blogPosts = await blogModel.find(findQuery).skip(page).limit(per_page);
  return res.status(200).json({ status: "All Post Loaded", blogPosts });
};

exports.getBlogPost = async (req, res) => {
  const { id } = req.params;

  const blogPost = await blogModel.findById({ _id: id });

  blogPost.read_count = blogPost.read_count += 1;

  await blogPost.save();

  return res.status(200).json({ status: "Post Loaded", blogPost });
};

exports.updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogModel.findById({ _id: id });

  if (req.body.state) {
    blogPost.state = req.body.state;
  }

  if (req.body.author) {
    blogPost.author = req.body.author;
  }

  if (req.body.body) {
    blogPost.body = req.body.body;
  }

  if (req.body.tags) {
    blogPost.tags = req.body.tags;
  }

  await blogPost.save();

  return res.status(200).json({ status: "Post Updated", blogPost });
};

exports.deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogModel.deleteOne({ _id: id });

  return res.status(200).json({ status: "Deleted  successful", blogPost });
};
