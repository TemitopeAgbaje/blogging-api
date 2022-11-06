const supertest = require("supertest");
const { connect } = require("./database");
const UserModel = require("../models/userModel");
const app = require("../index");

describe("Auth: Signup", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should signup a user", async () => {
    const response = await supertest(app)
      .post("/signup")
      .set("content-type", "application/json")
      .send({
        first_name: "Temitope",
        last_name: "Agbaje",
        email: "agbaje@gmail.com",
        password: "Temitope",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("first_name", "Temitope");
    expect(response.body.user).toHaveProperty("last_name", "Agbaje");
    expect(response.body.user).toHaveProperty("email", "agbaje@gmail.com");
  });

  it("should login a user", async () => {
    // create user in out db
    const user = await UserModel.create({
      first_name: "Temitope",
      last_name: "Agbaje",
      email: "agbaje@gmail.com",
      password: "Temitope",
    });

    // login user
    const response = await supertest(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "agbaje@gmail.com",
        password: "Temitope",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
