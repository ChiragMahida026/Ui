const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "mysecrettoken"

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authorization not valid." });

      req.user = user; // user is payload.
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

module.exports = auth;