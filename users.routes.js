const express = require('express')
const router = express.Router()
const port = 3333;


router.get('/', (req, res) => {
  res.send('huihu')
})

router.post('/', (req, res) => {
  res.send('users.json')
})





module.exports = router;

