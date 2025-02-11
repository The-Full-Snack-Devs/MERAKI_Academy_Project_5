const {pool} = require("../models/db");

const createNewOrder = (req, res) => {
  const userId = req.token.userId
  const cart = req.token.cart_id 
  const {date_time , position} = req.body
  console.log(req.body);
  const query = `INSERT INTO orders (user_id, cart_id, date_time, location) VALUES ($1,$2,$3,$4) RETURNING *`;
  const data = [userId, cart, date_time, JSON.stringify(position)];
  pool.query(query, data)
    .then((result) => {
            pool
      .query(`UPDATE cart
              SET 
              status = 'order'
              WHERE idc = $1
              RETURNING *;`, [cart])
      .then((result) => {
      })
      .catch((error) => {
        console.error(error);
      }); 

      pool
      .query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`, [userId])
      .then((result) => {
        console.log(result);
        
        res.status(200).json({
          success: true,
          message: "Order created successfully",
          result: result.rows[0].idc,
        });
      })
      .catch((error) => {
        console.error(error);
      }); 
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};

const getAllOrders = (req, res) => {
  const query = `SELECT * FROM orders
INNER JOIN users ON users.id = orders.user_id
WHERE orders.is_deleted=0`;
  pool.query(query)
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
