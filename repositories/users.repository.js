const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function readFile() {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content || '[]');
}

function writeFile(data) {
  // escreve atomically (síncrono) para evitar perda
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

let users = [];
function load() {
  users = readFile();
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find(u => u.id === id);
}

function create(user) {
  users.push(user);
  writeFile(users);
  return user;
}

function update(id, newData) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...newData, id }; // id não é editável
  writeFile(users);
  return users[idx];
}

function remove(id) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  writeFile(users);
  return true;
}

module.exports = {
  load,
  getAll,
  getById,
  create,
  update,
  remove
};
