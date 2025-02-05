const express = require("express");
const {
  getAllServices,
  getServicesById,
  createNewCart,
  addToCart,
  createNewServices,
  deleteServicesById,
  updateServicesById,
  getCartById,
} = require("../controllers/services");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const serveciesRouter = express.Router();

serveciesRouter.post("/",  authentication,createNewServices);
serveciesRouter.delete("/:id", authentication, deleteServicesById);
serveciesRouter.put("/:id", authentication, updateServicesById);
//====================authentication, 
serveciesRouter.get("/all", getAllServices);
serveciesRouter.get("/:id", authentication, getServicesById);
serveciesRouter.post("/createCart", authentication, createNewCart);
serveciesRouter.post("/addCart", authentication, addToCart);
serveciesRouter.get("/getCart", authentication, getCartById);



module.exports = serveciesRouter;
