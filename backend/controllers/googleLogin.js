const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const { login } = require("./users");
const googleLogin = (req, res) => {
  let x;
  const { email, family_name, given_name, picture } = req.body;
  const query = `SELECT * FROM users 
FULL OUTER JOIN cart ON users.id = cart.user_id AND cart.status = 'user'
WHERE email = $1`;
  pool
    .query(query, [email])
    .then((result) => {
      console.log(result.rows);
      if (result.rows.length > 0) {
        if (!result.rows[0].idc) {
          pool
            .query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`, [
              result.rows[0].id,
            ])
            .then((result) => {
              console.log("cart mart", result);
              x = result.rows[0].idc;
            })
            .catch((error) => {
              console.error(error);
            });
        }
        const payload = {
          userId: result.rows[0].id,
          role: result.rows[0].role,
          cart_id: result.rows[0].idc || x,
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
            userId: result.rows[0].id,
            role: result.rows[0].role,
          });
        } else {
          throw Error;
        }
      } else {
        const query = `INSERT INTO users 
        (firstName, lastName, email, role, image)
         VALUES ($1,$2,$3,$4,$5)  RETURNING * `;
        pool
          .query(query, [given_name, family_name, email, "user", picture])
          .then((result) => {
            console.log(result.rows);
            if (!result.rows[0].idc) {
              pool
                .query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`, [
                  result.rows[0].id,
                ])
                .then((result) => {
                  console.log("cart mart", result);
                  x = result.rows[0].idc;
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            const payload = {
              userId: result.rows[0].id,
              role: result.rows[0].role,
              cart_id: result.rows[0].idc || x,
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
                userId: result.rows[0].id,
                role: result.rows[0].role,
              });
            } else {
              throw Error;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  googleLogin,
};
