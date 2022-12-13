const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: "Please add a title",
  },
  description: String,
  author: String,
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  read_count: { type: Number, default: 0 },
  reading_time: String,
  tags: Array,
  body: {
    type: String,
    required: "Please add a body",
  },
  timestamp: Date,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
