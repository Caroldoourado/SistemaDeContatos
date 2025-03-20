const express = require('express');
const cors = require('cors');
const contatoController = require('../src/controllers/contatoController');
const router = express.Router();

const options = {
    origin: "http://localhost:3000"
}

router.use(cors(options));

router.get('/all', contatoController.getAll);

router.get('/contato/:contato', contatoController.getContato);

router.post("/novocontato", (req, res) =>{
    let nome = req.body.nome;
    let numero = req.body.numero;

    if(!nome || !numero){
        return res.status(400).send("Nome e número são obrigatórios!");
    }
    contatos.newContato(nome, numero);
    res.send("Contato adicionado");
})

module.exports = router;