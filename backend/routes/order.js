const express = require("express");
const router = express.Router();
const {
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/", createNewOrder)
router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
