const express = require('express');
const cors = require('cors');
const path = require('path');
const contatoController = require('../src/controllers/contatoController');
const router = express.Router();

const options = { origin: "http://localhost:3000"}
router.use(cors(options));

router.get('/contatos', contatoController.getAll);
router.get('/contato/:contato', contatoController.getContato);

router.post("/contatos",express.urlencoded({extended:  true}), contatoController.addContato)
router.delete('/contatos/:id', contatoController.deleteContato)

router.get('/paginas/novo', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/pages/novoContato.html'));
})

router.get('/paginas/contatos', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/pages/contatos.html'));
})

module.exports = router;
