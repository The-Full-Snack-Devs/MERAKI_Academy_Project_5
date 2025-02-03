const pool = require("../models/db");

const createNewOrder = (req, res) => {
  const { title, description } = req.body;
  const author_id = req.token.userId;
  const query = `INSERT INTO orders (, , ) VALUES () RETURNING *;`;
  const data = [title, description, author_id];
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
  const query = `SELECT * FROM orders a WHERE a.is_deleted=0;`;

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
  const id = req.params.id;
  const query = `SELECT title,description,firstName,author_id FROM users INNER JOIN articles ON users.id=articles.author_id WHERE articles.id=$1 AND articles.is_deleted=0;`;
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
  let { title, description } = req.body;

  const query = `UPDATE articles SET title = COALESCE($1,title), description = COALESCE($2, description) WHERE id=$3 AND is_deleted = 0  RETURNING *;`;
  const data = [title || null, description || null, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Order with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating Order");
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
//

const deleteOrderById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE  SET is_deleted=1 WHERE id=$1;`;
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
