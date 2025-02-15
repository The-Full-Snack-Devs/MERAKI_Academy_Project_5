const {pool} = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [string, role_id];    
    const query = `SELECT * FROM users WHERE role = $1 AND role = $2`;
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
