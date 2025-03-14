const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const partsRoutes = require("./routes/part");
const orderRoutes = require("./routes/order");
const usersRouter = require("./routes/users");
const serveciesRouter=require("./routes/services")
const googleRouter=require("./routes/googleLogin")
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/part", partsRoutes);
app.use("/orders", orderRoutes);
app.use("/users", usersRouter);
app.use("/services",serveciesRouter)
app.use("/google",googleRouter)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
