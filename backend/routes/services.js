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
  getCartById2,
  removeFromCart
} = require("../controllers/services");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const serveciesRouter = express.Router();

serveciesRouter.post("/",  authentication,createNewServices);
serveciesRouter.put("/:id", authentication, updateServicesById);
//====================authentication, 
serveciesRouter.get("/all", getAllServices);
serveciesRouter.post("/createCart", authentication, createNewCart);
serveciesRouter.post("/addCart/:id", authentication, addToCart);
serveciesRouter.get("/getCartById2/:id", authentication, getCartById2);
serveciesRouter.get("/getCart", authentication, getCartById);
serveciesRouter.get("/:id", authentication, getServicesById);
serveciesRouter.delete("removeFromCart/:id", authentication, removeFromCart);
serveciesRouter.delete("/:id", authentication, deleteServicesById);



module.exports = serveciesRouter;
