const express = require("express");

const {
  getAllServices,
  getServicesById,
  createNewCart,
  addToCart,
  createNewServices,
  addPartsToCart,
  deleteServicesById,
  updateServicesById,
} = require("../controllers/services");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const serveciesRouter = express.Router();
serveciesRouter.post("/", createNewServices);
serveciesRouter.delete("/:id", deleteServicesById);
serveciesRouter.put("/:id", updateServicesById);
serveciesRouter.get("/all", getAllServices);
serveciesRouter.get("/:id", getServicesById);
serveciesRouter.post("/createCart", authentication, createNewCart);
serveciesRouter.post("/addPartsToCart", addPartsToCart);
serveciesRouter.post("/addCart", addToCart);
serveciesRouter.get("/cart", addToCart);

module.exports = serveciesRouter;
