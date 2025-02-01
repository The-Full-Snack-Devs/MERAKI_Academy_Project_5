const { pool } = require("../models/db");
const getAllServices = (req, res) => {
  const query = `select * from servecies RETURNING * `;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the servecies",
        servecies: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
    });
};

const getServicesById = (req, res) => {
  const id = req.params.id;
  const query = `select * from servecies where servecies.id=$1 and servecies.is_deleted=0 RETURNING *  `;
pool.query(query,[id])
.then((result)=>{
    res.status(200).json({
        success: true,
        message: `The services with id: ${id}`,
        article: result.rows,
      });
})
.catch((error)=>{
    res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
})
};

const addToCart=(req,res)=>{
    const userId=req.token.userId
    const servecies=req.servecies.params 
    const query =`insert into Cart (userId,serveices) `
}
module.exports = {
  getAllServices,
  getServicesById
};
