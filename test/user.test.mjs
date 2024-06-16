// test/user.test.mjs
import request from "supertest";
import { expect } from "chai";
import app from "../index.js";

describe("User API", () => {
  let userId;

  it("should create a new user", (done) => {
    request(app)
      .post("/users")
      .send({ name: "John Doe" })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("id");
        expect(res.body.name).to.equal("John Doe");
        userId = res.body.id;
        done();
      });
  });

  it("should get all users", (done) => {
    request(app)
      .get("/users")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.above(0);
        done();
      });
  });

  it("should get a user by ID", (done) => {
    request(app)
      .get(`/users/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("id");
        expect(res.body.id).to.equal(userId);
        done();
      });
  });

  it("should update a user by ID", (done) => {
    request(app)
      .put(`/users/${userId}`)
      .send({ name: "Jane Doe" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("name");
        expect(res.body.name).to.equal("Jane Doe");
        done();
      });
  });

  it("should delete a user by ID", (done) => {
    request(app)
      .delete(`/users/${userId}`)
      .expect(204)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 404 for a non-existing user", (done) => {
    request(app)
      .get("/users/999")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("User not found");
        done();
      });
  });
});
