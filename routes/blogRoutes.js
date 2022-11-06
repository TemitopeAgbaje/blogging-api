const express = require("express");
const BlogController = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.post("/post", BlogController.createBlogPost);

blogRouter.get("/posts", BlogController.getBlogPosts);

blogRouter.get("/post/:id", BlogController.getBlogPost);

blogRouter.put("/post/:id", BlogController.updateBlogPost);

blogRouter.delete("/post/:id", BlogController.deleteBlogPost);

module.exports = blogRouter;
