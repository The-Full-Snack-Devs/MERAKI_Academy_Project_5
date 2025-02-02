const express = require("express");
const {
  getAllServices,
  getServicesById,
  addToCart,
  createNewServices,
  deleteServicesById,
  updateServicesById,
} = require("../controllers/services");
const serveciesRouter = express.Router();
serveciesRouter.post("/", createNewServices);
serveciesRouter.delete("/:id", deleteServicesById);
serveciesRouter.put("/:id", updateServicesById);

serveciesRouter.get("/all", getAllServices);
serveciesRouter.get("/:id", getServicesById);
serveciesRouter.post("/addCart", addToCart);
serveciesRouter.get("/cart", addToCart);

module.exports = serveciesRouter;
