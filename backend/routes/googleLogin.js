const express = require("express");
const { googleLogin } = require("../controllers/googleLogin");
const googleRouter = express.Router();
googleRouter.post("/", googleLogin);
module.exports = googleRouter;
