const express = require('express');
const cors = require('cors');
const path = require('path');
const contatoController = require('../src/controllers/contatoController');
const router = express.Router();

const options = {
    origin: "http://localhost:3000"
}

router.use(cors(options));

router.get('/all', contatoController.getAll);

router.get('/contato/:contato', contatoController.getContato);

router.get('/add', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/novoContato.html'));
})

router.post("/novocontato",express.urlencoded({extended:  true}), contatoController.addContato)

module.exports = router;