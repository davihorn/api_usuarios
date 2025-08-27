const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const usersRepo = require('../repositories/users.repository');

const ufList = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

// esquema de validação
const userSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  sobrenome: Joi.string().min(2).required(),
  idade: Joi.number().integer().min(0).max(120).required(),
  profissao: Joi.string().min(2).required(),
  cidade: Joi.string().min(2).required(),
  estado: Joi.string().valid(...ufList).required()
});

// parcialmente para PUT (substituir) usamos o mesmo required, para PATCH podemos aceitar parcial
const userSchemaPartial = userSchema.fork(Object.keys(userSchema.describe().keys), (s) => s.optional());

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: Rotas de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', (req, res) => {
  const all = usersRepo.getAll();
  res.json(all);
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               sobrenome: { type: string }
 *               idade: { type: integer }
 *               profissao: { type: string }
 *               cidade: { type: string }
 *               estado: { type: string }
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Validação inválida
 */
router.post('/', (req, res) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: 'Validação inválida', details: error.details.map(d => d.message) });
  }

  const newUser = { id: uuidv4(), ...value };
  usersRepo.create(newUser);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Substitui (update completo) um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       400:
 *         description: Validação inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', (req, res) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: 'Validação inválida', details: error.details.map(d => d.message) });
  }
  const updated = usersRepo.update(req.params.id, value);
  if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(updated);
});



/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Remove um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', (req, res) => {
  const ok = usersRepo.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.status(204).send();
});

module.exports = router;
