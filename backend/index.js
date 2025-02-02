const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const orderRoutes = require("./routes/order")
const usersRouter = require("./routes/users");
const { compareSync } = require("bcryptjs");
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/orders", orderRoutes);
app.use("/users", usersRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
