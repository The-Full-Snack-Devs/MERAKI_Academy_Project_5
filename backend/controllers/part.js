const {pool }= require("../models/db");

const createNewPart = (req, res) => {
  const { title, price, service_id } = req.body;
  const query = `INSERT INTO parts (title, price, service_id) VALUES ($1, $2, $3) RETURNING *;`;
  const data = [title, price, service_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Part created successfully",
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

const getAllParts = (req, res) => {
  const query = `SELECT * FROM parts a WHERE a.is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the parts",
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

const getPartById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM parts WHERE parts.id=$1 AND parts.is_deleted=0;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The part with id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting parts");
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

const getPartsByServiceId = (req, res) => {

  const id = req.params.id;
  const query = `SELECT * FROM parts INNER JOIN servecies ON servecies.id = parts.service_id WHERE parts.service_id = $1 AND parts.is_deleted = 0;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the parts with service: '${id}'`,
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

const updatePartById = (req, res) => {
  const id = req.params.id;
  let { title, price, service_id } = req.body;

  const query = `UPDATE parts 
  SET title = COALESCE($1,title), 
  price = COALESCE($2, price), 
  service_id($3, service_id) 
  WHERE id=$4 AND is_deleted = 0  
  RETURNING *;`;

  const data = [title || null, price || null, service_id || null];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Part with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating part");
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


const deletePartById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE parts SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Part with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting Part");
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
  createNewPart,
  getAllParts,
  getPartById,
  getPartsByServiceId,
  updatePartById,
  deletePartById,
};
