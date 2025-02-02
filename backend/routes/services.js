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

serveciesRouter.post("/",  authentication,createNewServices);
serveciesRouter.delete("/:id", authentication, deleteServicesById);
serveciesRouter.put("/:id", authentication, updateServicesById);
serveciesRouter.get("/all", authentication, getAllServices);
serveciesRouter.get("/:id", authentication, getServicesById);
serveciesRouter.post("/createCart", authentication, createNewCart);
serveciesRouter.post("/addPartsToCart", authentication, addPartsToCart);
serveciesRouter.post("/addCart", authentication, addToCart);
serveciesRouter.get("/cart", authentication, addToCart);


module.exports = serveciesRouter;
