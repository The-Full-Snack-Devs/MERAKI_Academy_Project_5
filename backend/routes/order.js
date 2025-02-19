const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrderById,
  deleteOrderById,
  getAllOrdersById,
  getAllOrdersByTeam,updateOrderByIdEmp
} = require("../controllers/order");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");



router.post("/",authentication, createNewOrder)
router.get("/",authentication,authorization("admin"), getAllOrders);
router.get("/all",authentication, getAllOrdersById);
router.get("/team/:team",authentication, getAllOrdersByTeam);

router.get("/:id", getOrderById);
router.put("/emp/:id",authentication, updateOrderByIdEmp);

router.put("/:id",authentication,authorization("admin"), updateOrderById);

router.delete("/:id", deleteOrderById);

module.exports = router;
