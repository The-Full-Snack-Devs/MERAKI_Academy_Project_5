const {pool} = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  console.log(req.body);
  
  const { firstName, lastName, email, password,image,phone, lat, lng} = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (firstName, lastName, email, password, role, image,phone,lat,lng) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  const data = [
    firstName,
    lastName,
    email.toLowerCase(),
    encryptedPassword,
    "user",
    image,
    phone,
    lat,
    lng
  ];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

const login = (req, res) => {
  let x;
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users 
FULL OUTER JOIN cart ON users.id = cart.user_id AND cart.status = 'user'
WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result.rows[0]);
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            // ==============Create Cart==============
            console.log(result.rows[0].idc,!result.rows[0].idc);
            
          if (!result.rows[0].idc) {
            
          }
            pool
    .query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`, [result.rows[0].id])
    .then((result) => {
      x = result.rows[0].idc
    })
    .catch((error) => {
      console.error(error);
    }); 
    // ===========================
            const payload = {
              userId: result.rows[0].id,
              role: result.rows[0].role_id,
              cart_id: result.rows[0].idc || x
            };
            console.log(payload);
            
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId:result.rows[0].id
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

const getProfile = (req, res) => {
  let id = req.token.userId;
  const query = `SELECT * FROM users 
  WHERE id = $1`;
  const data = [id];
  pool
  .query(query, data)
    .then((User) => {
      if (!User) {
        return res.status(404).json({
          success: false,
          message: `The User with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The User ${id} `,
        User: User.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
  getProfile
};
