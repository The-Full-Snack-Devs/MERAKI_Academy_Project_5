const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/order");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");



router.post("/",authentication, createNewOrder)
router.get("/",authentication,authorization("admin"), getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
