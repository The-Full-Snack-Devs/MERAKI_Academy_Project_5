const { query } = require("express");
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
    const servecies=req.params.servecies
    const query =`insert into Cart (userId,serveices) VALUES($1,$2) RETURNING * `
    pool.query(query,[userId,servecies])
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "add to cart successfully",
            result: result.rows,
          });

    })
    
    .catch((error)=>{
        res.status(500).json({
            success: false,
            message: "Server error",
          });
    })
}

const getCartById=(req,res)=>{
    const userId=req.token.userId
    const query =` select name,title,price from cart
     inner join servecies on cart.serveices=servecies.id
    inner join  parts on servecies.id= parts.service_id where cart.userId=$1 `
    pool.query(query,[userId])
    .then((result)=>{
        res.status(200).json({
            success: true,
            message: `The cart with id: ${id}`,
            cart: result.rows,
          });
    })
    .catch((error)=>{
        res.status(500).json({
            success: false,
            message: "Server error",
            err: error.message,
          });
    })
}
const createNewServices=(req,res)=>{
  const {Name,Des,img}=req.body
  const query=`insert  into orders (Name,Des,img) VALUES ($1,$2,$3) RETURNING * `
  const data=[Name,Des,img]
  pool.query(query,data)
  .then((result)=>{
    res.status(201).json({
      success: true,
      message: "Services created successfully",
      result: result.rows,
    });
  })
  .catch((error)=>{
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  })
}
const deleteServicesById=(req,res)=>{
  const {id}=req.params
  const query=`UPDATE servecies
SET is_deleted = 1
WHERE servecies.id=$1 `
pool
.query(query, [id])
.then((result) => {
  res.status(200).json({
    success: true,
    massage: `Services with id: ${id} deleted successfully`,
  });
})
.catch((error) => {
  res.status(500).json({
    success: false,
    message: "Server error",
    err: error.message,
  });
})
}
const updateServicesById=(req,res)=>{
  const id=req.params.id
  const {Name,Des}=req.body
  const query =`UPDATE servecies
SET Name = $1, Des = $2 
WHERE servecies.id=$3`
pool
.query(query,[Name,Des,id])
.then((result) => {
  res.status(200).json({
    success: true,
    message: `Servecies with id: ${id} updated successfully`,
    article: result.rows,
  });
})
.catch((error) => {
  res.status(500).json({
    success: false,
    message: "Server error",
    err: error.message,
  });
});
}
module.exports = {
  getAllServices,
  getServicesById,
  addToCart,
  getCartById,
  createNewServices,
  deleteServicesById,
  updateServicesById
};
