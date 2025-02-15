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
  getCartById2
} = require("../controllers/services");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const serveciesRouter = express.Router();

serveciesRouter.post("/",  authentication,createNewServices);
serveciesRouter.delete("/:id", authentication, deleteServicesById);
serveciesRouter.put("/:id", authentication, updateServicesById);
//====================authentication, 
serveciesRouter.get("/all", getAllServices);
serveciesRouter.post("/createCart", authentication, createNewCart);
serveciesRouter.post("/addCart/:id", authentication, addToCart);
serveciesRouter.get("/getCartById2/:id", authentication, getCartById2);
serveciesRouter.get("/getCart", authentication, getCartById);
serveciesRouter.get("/:id", authentication, getServicesById);



module.exports = serveciesRouter;
