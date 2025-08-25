const express = require ("express");
const fs = require ("fs")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const usersRouter = require("./users.routes");

const app = express ();
const usuarios = JSON.parse(fs.readFileSync("users.json", "utf-8"))
app.use(express.json());


app.use("/users", usersRouter);

// documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📖 Swagger em http://localhost:${PORT}/api-docs`);
});

