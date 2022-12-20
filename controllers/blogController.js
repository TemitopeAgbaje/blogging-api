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
    findQuery = {
      ...findQuery,
      reading_time: { $regex: reading_time, $options: "i" },
    };
  }

  if (author) {
    // findQuery.author = author;
    findQuery = { ...findQuery, author: { $regex: author, $options: "i" } };
  }

  if (title) {
    findQuery = { ...findQuery, title: { $regex: title, $options: "i" } };
  }

  if (tags) {
    findQuery = { ...findQuery, tags: { $in: tags } };
  }

  const blogPosts = await blogModel
    .find(findQuery)
    .skip(page - 1)
    .limit(per_page);
  return res.status(200).json({ status: "All Post Loaded", blogPosts });
};

exports.getBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await blogModel.findById({ _id: id });

    if (!blogPost) {
      return res.status(404).json({ status: "Blog Post Not found" });
    }

    if (blogPost.state === "published") {
      blogPost.read_count = blogPost.read_count += 1;
    }

    await blogPost.save();

    return res.status(200).json({ status: "Blog Post Loaded", blogPost });
  } catch (err) {
    return res.status(400).json({ message: "Bad Request" });
  }
};

exports.updateBlogPost = async (req, res, next) => {
  const { id } = req.params;
  const blogPost = await blogModel.findById({ _id: id });

  if (!blogPost) {
    return res.status(400).json({ message: "No blog Post" });
  }

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

  const blogPost = await blogModel.findById({ _id: id });

  if (!blogPost) {
    return res.status(400).json({ message: "No blog Post" });
  }

  await blogPost.delete();

  return res.status(200).json({ status: "Deleted successfully"});
};
