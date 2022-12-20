const supertest = require("supertest");
const app = require("../index");
const blogModel = require("../models/blogModel");
const { connect } = require("./database");

describe("Blog Route", () => {
  let conn;

  const user = {
    first_name: "Temitope",
    last_name: "Agbaje",
    email: "agbaje@gmail.com",
    password: "Liam0000",
  };

  const blogPost = {
    title: "My day",
    description: "My day in a few words",
    author: "Tope",
    tags: ["day"],
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus architecto enim cum tempore autem at, porro ad et nisi vel delectus aliquid! Ipsam odit saepe eaque sed fugiat dolores expedita perspiciatis ipsum tempore, iusto tenetur repellendus ratione esse blanditiis rerum voluptas officia adipisci alias enim ad dicta illo? Porro, non.",
  };

  beforeAll(async () => {
    conn = await connect();

    const signupResponse = await supertest(app).post("/signup").send(user);

    const loginResponse = await supertest(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: user.email,
        password: user.password,
      });

    token = loginResponse.body.token;
    userId = loginResponse.body.user._id;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should add blog post", async () => {
    const response = await supertest(app)
      .post("/blog/post")
      .set("Authorization", `Bearer ${token}`)
      .set("content-type", "application/json")
      .send(blogPost);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("New Post");
    expect(response.body.blogPost).toHaveProperty("title");
    expect(response.body.blogPost).toHaveProperty("description");
    expect(response.body.blogPost).toHaveProperty("body");
    expect(response.body.blogPost).toHaveProperty("tags");
    expect(response.body.blogPost.state).toBe("draft");
    expect(response.body.blogPost).toHaveProperty("reading_time");
    expect(response.body.blogPost).toHaveProperty("author");
    expect(response.body.blogPost).toHaveProperty("timestamp");
    expect(response.body.blogPost.read_count).toBe(0);
  });

  it("should get", async () => {
    const response = await supertest(app)
      .get("/blog/posts?read_count=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "All Post Loaded");
    expect(response.body).toHaveProperty("blogPosts");
  });

  it("should get per blog", async () => {
    const blog = await blogModel.create(blogPost);

    blogId = blog._id.toString();

    const response = await supertest(app)
      .get("/blog/post/" + blogId)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "Blog Post Loaded");
    expect(response.body).toHaveProperty("blogPost");
  });

  it("should update blog post", async () => {
    const blog = await blogModel.create(blogPost);

    blogId = blog._id.toString();

    const response = await supertest(app)
      .put("/blog/post/" + blogId)
      .set("Authorization", `Bearer ${token}`)
      .set("content-type", "application/json")
      .send({ state: "published" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Post Updated");
    expect(response.body.blogPost).toHaveProperty("title");
    expect(response.body.blogPost).toHaveProperty("description");
    expect(response.body.blogPost).toHaveProperty("body");
    expect(response.body.blogPost).toHaveProperty("tags");
    expect(response.body.blogPost.state).toBe("published");
    expect(response.body.blogPost).toHaveProperty("author");
    expect(response.body.blogPost.read_count).toBe(0);
  });

  it("should delete a post", async () => {
    const blog = await blogModel.create(blogPost);

    blogId = blog._id.toString();

    const response = await supertest(app)
      .delete("/blog/post/" + blogId)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Deleted successfully");
  });
});
