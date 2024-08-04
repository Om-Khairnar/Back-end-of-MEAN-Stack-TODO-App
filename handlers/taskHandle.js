const Task = require("./../db/task");

async function addTask(userModel) {
  //todo
  let task = new Task({
    ...userModel,
  });
  await task.save();
  return task.toObject();
}

async function getTasks() {
  const tasks = await Task.find();
  return tasks.map((x) => x.toObject());
}

async function getTask(id) {
  const tasks = await Task.findById(id);
  return tasks.toObject();
}

async function updateTask(id, userModel) {
  const filter = { _id: id };
  await Task.findOneAndUpdate(filter, userModel);
}

async function deleteTask(id) {
  await Task.findByIdAndDelete(id);
}

module.exports = { addTask, getTasks, getTask, updateTask, deleteTask };