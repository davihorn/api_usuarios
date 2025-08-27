const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'CRUD de usuários, persistindo em data/users.json'
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string' },
            sobrenome: { type: 'string' },
            idade: { type: 'integer' },
            profissao: { type: 'string' },
            cidade: { type: 'string' },
            estado: { type: 'string' }
          }
        }
      }
    }
  },
   
servers: [{ url: 'http://localhost:3333' }],

  apis: ['./routes/*.js']
};

module.exports = swaggerJsDoc(options);
