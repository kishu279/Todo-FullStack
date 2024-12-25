require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Cors
const cors = require("cors");

// routes
const UserRoutes = require("./route/UserRoutes");
const TodoRoutes = require("./route/TodoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  await mongoose
    .connect(process.env.DB_URL)
    .then(console.log("Database connected securely"))
    .catch((err) => console.log(err));

  app.listen(process.env.PORT, () => {
    console.log("Server listening");
  });
}

app.get("/", async (req, res) => {
  res.status(200).json({
    success: false,
    message: "Heii",
  });
});

app.use("/user", UserRoutes);
app.use("/todo", TodoRoutes);

app.post("/check", (req, res) => {
  const { body } = req.body;
  console.log(body);

  res.status(200).json({
    success: false,
    message: `Hii this side server responding to ${body}`,
  });
});

main();
