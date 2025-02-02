const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  getAllServices,
  getServicesById,
  addToCart,
  createNewServices,
  deleteServicesById,
  updateServicesById,
} = require("../controllers/services");
const serveciesRouter = express.Router();
serveciesRouter.post("/", authentication, createNewServices);
serveciesRouter.delete("/:id", authentication, deleteServicesById);
serveciesRouter.put("/:id", authentication, updateServicesById);

serveciesRouter.get("/all", authentication, getAllServices);
serveciesRouter.get("/:id", authentication, getServicesById);
serveciesRouter.post("/:id/addCart", authentication, addToCart);
serveciesRouter.get("/cart", authentication, addToCart);

module.exports = serveciesRouter;
