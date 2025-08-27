const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'CRUD de usuários'
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
  
  apis: ['./routes/*.js']
};

module.exports = swaggerJsDoc(options);
