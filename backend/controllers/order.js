const pool = require("../models/db");

const createNewOrder = (req, res) => {
  const userId = req.token.userId
  const cart = req.token.cart_id
  
  const query = `INSERT INTO orders (user, cart) VALUES ($1, $2) RETURNING *;`;
  const data = [userId, cart];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllOrders = (req, res) => {
  const query = `SELECT * FROM orders WHERE orders.is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the order",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getOrderById = (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM orders WHERE orders.is_deleted=0 AND orders.id = ($1)`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The order with id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting orders");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateOrderById = (req, res) => {
  const id = req.params.id;
  const { Status, Team } = req.body;
  const query = `UPDATE orders
SET 
    Status = COALESCE($1, Status), 
    Team = COALESCE($2, Team)
WHERE id = $3 
RETURNING *;`;
  pool
    .query(query, [Status||null, Team||null, id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Orders with id: ${id} updated successfully `,
        Servecies:result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};
//

const deleteOrderById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE orders SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `order with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting order");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrderById,
  deleteOrderById,
};
