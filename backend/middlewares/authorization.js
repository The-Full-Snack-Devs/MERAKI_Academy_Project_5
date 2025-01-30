const pool = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [string];
    console.log(data);
    
    const query = `SELECT * FROM users WHERE role = $1`;
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

module.exports = authorization;
