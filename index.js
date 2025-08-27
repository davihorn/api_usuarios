const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const usersRouter = require("./routes/users.routes");
const usersRepo = require('./repositories/users.repository');

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());


usersRepo.load();


app.use('/users', usersRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => res.send({ status: 'ok' }));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Docs: http://localhost:${PORT}/api-docs`);
});
