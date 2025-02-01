const express = require("express");
const { getAllServices,
    getServicesById,
    addToCart
  }=require("../controllers/services")
  const serveciesRouter=express.Router()
  serveciesRouter.get("/all",getAllServices)
  serveciesRouter.get("/:id",getAllServices)
  serveciesRouter.post("/all",getAllServices)




  module.exports = serveciesRouter;

