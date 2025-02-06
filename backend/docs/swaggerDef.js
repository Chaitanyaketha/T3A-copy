const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management System API",
      version: "1.0.0",
      description: "API documentation for Inventory Management System",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./docs/*.docs.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
