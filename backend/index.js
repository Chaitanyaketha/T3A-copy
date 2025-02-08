// const express = require('express');
// const cors = require('cors');
// const app = express();

// require('dotenv').config();
// const register = require('./src/v1/register/register.routes');
// const loginUser = require('./src/v1/login/login.routes');
// const User = require('./src/v1/user/user.routes');
// const product = require('./src/v1/Dashboardpagination/pagination.routes');
// const AWS = require('aws-sdk');
// const helmet=require('helmet');
// const { decryptRequestBody, encryptResponseBody } = require('./src/middlewares/decrypt');
// const fileroutes=require('./src/v1/file-uploads/file-uploads.routes');
// const rateLimit = require('express-rate-limit');
// const { notFoundHandler, errorHandler} = require('./src/middlewares/globalErrorHandler');
// const slowDown = require('express-slow-down');
// const { generateAccessToken } = require('./src/utils/jwtConfig');
// const imports = require('./src/v1/imports/imports-file.routes');  


// app.use(helmet());
// app.use(express.json());
// app.use(cors());



// // app.use(limiter);
// app.use(decryptRequestBody);

// app.use('/api/v1/user',  register);
// app.use('/api/v1/user',  loginUser);
// app.use('/api/v1/user',  User);
// app.use('/api/v1/user',product)
// app.use('/api/v1/user/files',fileroutes);

// app.use('/api/v1/user/imports',imports)




// app.post("/token", (req, res) => {
//   const { token: refreshToken } = req.body;

//   if (!refreshToken) return res.status(401).send("Refresh token required.");
 

//   jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).send("Invalid or expired refresh token.");

 
//     const {username,email,user_id } = user;
//     const accessToken = generateAccessToken({ username,email,user_id });
//     res.json({ accessToken });
//   });
// });

// app.use(notFoundHandler);
// app.use(encryptResponseBody);
// app.use(errorHandler);

// app.listen(4000, () => console.log('Server running on port: 4000'));



// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const helmet = require("helmet");
// const dotenv = require("dotenv");
// const { initializeSocket } = require("./src/v1/chat/chat");
// const chatRoutes = require("./src/v1/chat/chat.routes");

// // Load environment variables
// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(helmet());
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:4200", // Change to your frontend URL if needed (e.g., "http://localhost:4200")
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // Custom middleware for decryption and encryption
// const { decryptRequestBody, encryptResponseBody } = require("./src/middlewares/decrypt");
// app.use(decryptRequestBody);

// // Routes
// const register = require("./src/v1/register/register.routes");
// const loginUser = require("./src/v1/login/login.routes");
// const User = require("./src/v1/user/user.routes");
// const product = require("./src/v1/Dashboardpagination/pagination.routes");
// const fileroutes = require("./src/v1/file-uploads/file-uploads.routes");
// const imports = require("./src/v1/imports/imports-file.routes");
// const { notFoundHandler, errorHandler } = require("./src/middlewares/globalErrorHandler");
// const { generateAccessToken } = require("./src/utils/jwtConfig");

// app.use("/api/v1/user", register);
// app.use("/api/v1/user", loginUser);
// app.use("/api/v1/user", User);
// app.use("/api/v1/user", product);
// app.use("/api/v1/user/files", fileroutes);
// app.use("/api/v1/user/imports", imports);
// app.use("/api/v1/chat", chatRoutes);

// // Token refresh endpoint
// app.post("/token", (req, res) => {
//     const { token: refreshToken } = req.body;
//     if (!refreshToken) return res.status(401).send("Refresh token required.");

//     jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).send("Invalid or expired refresh token.");
//         const { username, email, user_id } = user;
//         const accessToken = generateAccessToken({ username, email, user_id });
//         res.json({ accessToken });
//     });
// });

// // Error handling
// app.use(notFoundHandler);
// app.use(encryptResponseBody);
// app.use(errorHandler);

// // Initialize Socket.io with CORS
// const io = initializeSocket(server);

// // Start server
// server.listen(4000, () => console.log("Server running on port: 4000"));




// server.js
// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const helmet = require("helmet");
// const dotenv = require("dotenv");
// const { initializeSocket } = require("./src/v1/chat/chat");
// const chatRoutes = require("./src/v1/chat/chat.routes");
// const setupSwagger = require("./swagger");
// const morgan = require('morgan');

// const responseTimeMiddleware = require("./src/middlewares/responseTime"); //api perf



// // Load environment variables
// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(helmet());
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:4200", // Adjust for your frontend URL
//     methods: ["GET", "POST", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
// // Middleware
// app.use(express.json());

// // Setup Swagger
// setupSwagger(app);

// //Custom middleware for decryption and encryption
// const { decryptRequestBody, encryptResponseBody } = require("./src/middlewares/decrypt");
// app.use(decryptRequestBody);

// // Routes
// const register = require("./src/v1/register/register.routes");
// const loginUser = require("./src/v1/login/login.routes");
// const User = require("./src/v1/user/user.routes");
// const product = require("./src/v1/Dashboardpagination/pagination.routes");
// const fileroutes = require("./src/v1/file-uploads/file-uploads.routes");
// const imports = require("./src/v1/imports/imports-file.routes");
// const { notFoundHandler, errorHandler } = require("./src/middlewares/globalErrorHandler");
// const { generateAccessToken } = require("./src/utils/jwtConfig");
// // const passwordResetRoutes = require("./src/v1/password-reset/passwordReset.routes");  // New route for password reset
// const passwordResetRoutes = require('./src/v1/reset-password/passwordReset.routes');


// app.use("/api/v1/user", register);
// app.use("/api/v1/user", loginUser);
// app.use("/api/v1/user", User);
// app.use("/api/v1/user", product);
// app.use("/api/v1/user/files", fileroutes);
// app.use("/api/v1/user/imports", imports);
// app.use("/api/v1/chat", chatRoutes);
// app.use("/api/v1/password-reset", passwordResetRoutes);  // Add password reset routes

// // Token refresh endpoint
// app.post("/token", (req, res) => {
//     const { token: refreshToken } = req.body;
//     if (!refreshToken) return res.status(401).send("Refresh token required.");

//     jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).send("Invalid or expired refresh token.");
//         const { username, email, user_id } = user;
//         const accessToken = generateAccessToken({ username, email, user_id });
//         res.json({ accessToken });
//     });
// });

// // Error handling
// app.use(notFoundHandler);
// app.use(encryptResponseBody);
// app.use(errorHandler);

// // Initialize Socket.io
// const io = initializeSocket(server);


// app.use(morgan(':method :url :status :response-time ms'));


// // Start server
// server.listen(4000, () => console.log("Server running on port: 4000"));




const express = require("express");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");   //http req protection
const dotenv = require("dotenv");
const { initializeSocket } = require("./src/v1/chat/chat");
const chatRoutes = require("./src/v1/chat/chat.routes");
const setupSwagger = require("./swagger");
const morgan = require('morgan');
const responseTime=require('./src/middlewares/responseTime');

const responseTimeMiddleware = require("./src/middlewares/responseTime"); //api perf

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200", //  frontend URL
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(responseTime); // Place it here to measure all requests

// Setup Swagger
setupSwagger(app);

// Custom middleware for decryption and encryption
const { decryptRequestBody, encryptResponseBody } = require("./src/middlewares/decrypt");
app.use(decryptRequestBody);


// Configure rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Apply the rate limiter to all requests or specific routes
app.use(limiter); // Apply to all requests
// Or apply to specific routes
// app.use("/api/v1/user", limiter); // Example: limits only /api/v1/user routes

// Routes
const register = require("./src/v1/register/register.routes");
const loginUser = require("./src/v1/login/login.routes");
const User = require("./src/v1/user/user.routes");
const product = require("./src/v1/Dashboardpagination/pagination.routes");
const fileroutes = require("./src/v1/file-uploads/file-uploads.routes");
const imports = require("./src/v1/imports/imports-file.routes");
const { notFoundHandler, errorHandler } = require("./src/middlewares/globalErrorHandler");
const { generateAccessToken } = require("./src/utils/jwtConfig");
const passwordResetRoutes = require('./src/v1/reset-password/passwordReset.routes');

app.use("/api/v1/user", register);   //register route
app.use("/api/v1/user", loginUser);   //login
app.use("/api/v1/user", User);  
app.use("/api/v1/user", product);
app.use("/api/v1/user/files", fileroutes);
app.use("/api/v1/user/imports", imports);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/password-reset", passwordResetRoutes);  // Add password reset routes

// Token refresh endpoint
app.post("/token", (req, res) => {
    const { token: refreshToken } = req.body;
    if (!refreshToken) return res.status(401).send("Refresh token required.");

    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid or expired refresh token.");
        const { username, email, user_id } = user;
        const accessToken = generateAccessToken({ username, email, user_id });
        res.json({ accessToken });
    });
});

// Error handling
app.use(notFoundHandler);
app.use(encryptResponseBody);
app.use(errorHandler);

// Initialize Socket.io
const io = initializeSocket(server);

// app.use(morgan(':method :url :status :response-time ms'));
morgan.format('myformat', ':method :url :status :res[content-length] - :response-time ms');
app.use(morgan('myformat'));


// Start server
server.listen(4000, () => console.log("Server running on port: 4000"));