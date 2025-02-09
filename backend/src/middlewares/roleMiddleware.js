const jwt = require("jsonwebtoken");

const verifyRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        // Check role from decoded token
        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ message: "Access denied" });
        }

        req.user = decoded; // Attach user data to request
        next();
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = verifyRole;
