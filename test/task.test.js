const request = require("supertest");
const express = require("express");
const app = require("../app");
const mongoose = require("mongoose");

const Task = require("../db/task");

const { expect } = require("chai");

describe("Tasks API", function () {
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017", { dbName: "TodoDb" });
    await Task.deleteMany(); // Clear the collection before each test
  });

  after(async function () {
    await mongoose.connection.close();
  });

  let taskId;

  it("should create a new task", async function () {
    const res = await request(app).post("/tasks").send({
      user: "User 4",
      status: "Incomplete",
      dueDate: new Date(),
      priority: "High",
      description: "Test task",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    taskId = res.body._id; // Save the ID for later tests
  });

  it("should get all tasks", async function () {
    const res = await request(app).get("/tasks");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should get a single task by ID", async function () {
    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id", taskId);
  });

  it("should update a task", async function () {
    const res = await request(app).put(`/tasks/${taskId}`).send({
      status: "Complete",
    });

    expect(res.status).to.equal(200);

    const updatedTask = await Task.findById(taskId);
    expect(updatedTask.status).to.equal("Complete");
  });

  it("should delete a task", async function () {
    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.status).to.equal(200);

    const deletedTask = await Task.findById(taskId);
    expect(deletedTask).to.be.null;
  });
});
