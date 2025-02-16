const {pool}  = require("../models/db");
const { login } = require("./users");
const getAllServices = (req, res) => {
  const query = `select * from servecies where is_deleted=0 `;
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

const createNewCart=(req,res)=>{
  const userId = req.token.userId;
  pool
    .query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`, [userId])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Cart created successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
}

const addToCart = (req,res)=>{ 
  console.log(req.body, req.token);
  newId = req.body.cart_id
  cart_id = newId || req.token.cart_id   
  parts_id = req.params.id
  console.log(cart_id, parts_id);
    const query =`insert into cart_parts (cart_id,parts_id) VALUES($1,$2) RETURNING * `
    pool.query(query,[cart_id, parts_id])
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "added to cart successfully",
            result: result.rows,
          });

    })
    .catch((error)=>{
      console.log(error);
      
        res.status(500).json({
            success: false,
            message: "Server error",
          });
    })
}

const removeFromCart = (req,res)=>{ 
  parts_id = req.params.id
  console.log(cart_id, parts_id);
    const query =`DELETE FROM cart_parts
WHERE id = $1`
    pool.query(query,[parts_id])
    .then((result)=>{
        res.status(201).json({
            success: true,
            message: "added to cart successfully",
            result: result.rows,
          });

    })
    .catch((error)=>{
      console.log(error);
      
        res.status(500).json({
            success: false,
            message: "Server error",
          });
    })
}



const getCartById=(req,res)=>{
    const userId=req.token.userId    
    const query =`SELECT * FROM cart_parts
INNER JOIN cart ON cart_parts.cart_id = cart.idc 
INNER JOIN parts ON cart_parts.parts_id = parts.idp
INNER JOIN servecies ON parts.service_id = servecies.id
INNER JOIN users ON users.id = cart.user_id
WHERE cart.user_id = $1 AND cart.status = 'user'`
    pool.query(query,[userId])
    .then((result)=>{
      console.log(result.rows);
      
        res.status(200).json({
            success: true,
            message: `The cart with id`,
            cart: result.rows,
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

const getCartById2=(req,res)=>{
  console.log(2);
  const cart_id = req.params.id
  const query =`SELECT * FROM cart_parts
INNER JOIN cart ON cart_parts.cart_id = cart.idc 
INNER JOIN parts ON cart_parts.parts_id = parts.idp
INNER JOIN servecies ON parts.service_id = servecies.id
INNER JOIN users ON users.id = cart.user_id
WHERE cart.idc = $1`
  pool.query(query,[cart_id])
  .then((result)=>{
      res.status(200).json({
          success: true,
          message: `The cart with id`,
          cart: result.rows,
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

const updateServicesById = (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const query = `UPDATE servecies
SET 
    name = COALESCE($1, name), 
    description = COALESCE($2, description)
WHERE id = $3 
RETURNING *;`;
  pool
    .query(query, [name||null, description||null, id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Servecies with id: ${id} updated successfully `,
        Servecies:result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
}

const createNewServices = (req, res) => {
  const { name, description, image } = req.body;
  const query = `insert  into servecies (name,description,image) VALUES ($1,$2,$3) RETURNING * `;
  const data = [name, description, image];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Services created successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

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


module.exports = {
  getAllServices,
  getServicesById,
  createNewCart,
  addToCart,
  getCartById,
  getCartById2,
  createNewServices,
  deleteServicesById,
  updateServicesById,
  removeFromCart
};
