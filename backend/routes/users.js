const express = require("express");

const { register, login, getProfile} = require("../controllers/users");

const usersRouter = express.Router();
const authentication = require("../middlewares/authentication");


usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", authentication, getProfile);

module.exports = usersRouter;
