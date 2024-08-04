const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-route");
var cors = require("cors");

app.use(cors());
//we are requesting data throught json and we have need middleware for that
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Currently app is running");
});

app.use(taskRoutes);

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "TodoDb",
  });
}
connectDb().catch((err) => console.error(err));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
