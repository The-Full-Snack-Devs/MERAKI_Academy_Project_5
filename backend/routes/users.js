const express = require("express");

const { register, login, getProfile,getProfileTeam} = require("../controllers/users");

const usersRouter = express.Router();
const authentication = require("../middlewares/authentication");


usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", authentication, getProfile);
usersRouter.get("/team", authentication, getProfileTeam);

module.exports = usersRouter;
