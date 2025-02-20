const {pool }= require("../models/db");

const createNewPart = (req, res) => {
  console.log(req.body);
  
  const { namep, price, serviceId, imagep } = req.body;
  const query = `INSERT INTO parts (namep, price, service_id, imagep) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const data = [namep, price, serviceId, imagep];
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
      console.log(err);
      
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
  const query = `SELECT * FROM parts WHERE parts.idp=$1 AND parts.is_deleted=0;`;
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
  let { namep, price, service_id, imagep } = req.body;

  const query = `UPDATE parts 
  SET namep = COALESCE($1, namep), 
      price = COALESCE($2, price), 
      service_id = COALESCE($3, service_id),
      imagep = COALESCE($4, imagep)
  WHERE idp=$5 AND is_deleted = 0  
  RETURNING *;`;


  const data = [namep || null, price || null, service_id || null , imagep || null, id];

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
  const query = `UPDATE parts SET is_deleted=1 WHERE idp=$1;`;
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
