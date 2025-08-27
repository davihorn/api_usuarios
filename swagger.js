
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const { get } = require("http");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuários",
      version: "1.0.0",
      description: "CRUD de usuários com validação e persistência em JSON",  
    },
    servers: [
        { url: "http://localhost:3333",},
    ],

 
  
  
  },
  apis: [path.join(__dirname, "users.routes.js")],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;

