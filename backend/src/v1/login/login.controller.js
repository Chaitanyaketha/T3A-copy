// const { loginUser } = require('./login.service');
// const { loginUserSchema } = require('./login.utils');

// const loginUserHandler = async (req, res,next) => {
//   const { error } = loginUserSchema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//    const { identifier, password } = req.body;

//   try {
//     const { token,rtoken, user } = await loginUser(identifier, password);
//     res.status(200).json({ message: 'User logged in successfully', token,rtoken, user });
//   } catch (err) {

//       err.statusCode=401;
//       console.log(err);
//       next(err);

//   }
// };

// module.exports = { loginUserHandler };
// const { loginUser } = require("./login.service");
// const { loginUserSchema } = require("./login.utils");

// const loginUserHandler = async (req, res, next) => {
//   const { error } = loginUserSchema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const { identifier, password } = req.body;

//   try {
//     const { token, rtoken, user } = await loginUser(identifier, password);

//     // Ensure role is included in the response
//     res.status(200).json({
//       message: "User logged in successfully",
//       token,
//       rtoken,
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         role: user.role, // Include role
//       },
//     });
//   } catch (err) {
//     err.statusCode = 401;
//     console.log(err);
//     next(err);
//   }
// };

// module.exports = { loginUserHandler };
const { loginUser } = require("./login.service");
const { loginUserSchema } = require("./login.utils");
const jwt = require("jsonwebtoken");

const loginUserHandler = async (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { identifier, password } = req.body;

  try {
    const { token, rtoken, user } = await loginUser(identifier, password);

    // Generate a new access token including role
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role, // Ensure role is included
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token: accessToken, // Use new token with role
      rtoken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role, // Ensure role is sent
      },
    });
  } catch (err) {
    err.statusCode = 401;
    console.error("Login Error:", err);
    next(err);
  }
};

module.exports = { loginUserHandler };
