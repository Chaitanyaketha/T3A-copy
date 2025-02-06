const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerDef");

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger available at http://localhost:4000/api-docs");
};

module.exports = setupSwagger;
