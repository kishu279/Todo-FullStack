require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// routes
const UserRoutes = require("./route/UserRoutes");
const TodoRoutes = require("./route/TodoRoutes");

const app = express();
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
  res.send("Heiii");
});

app.use("/user", UserRoutes);
app.use("/todo", TodoRoutes);

main();
