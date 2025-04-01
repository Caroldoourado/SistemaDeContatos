const contatoService = require('../services/contatoService');

async function getAll(req, res){
   
   try{
        let result = await contatoService.getAll();
        res.json(result);
   } catch (error){
    res.status(500).send(error);
   }
};

async function getContato(req, res){
    const contato = req.params.contato;

    try{
        const result = await contatoService.getContato(contato);
        res.json(result);
    }catch (error){
        res.status(500).send(error);
    }
}


async function addContato(req, res){
    try{
        const {nome, email, telefone} = req.body;
        const contatoCriado = await contatoService.addContato(nome, email, telefone);
        res.status(201).json(contatoCriado);
    }catch (error){
        res.status(400).json({erro: error.message});
    }
}

module.exports = {
    getContato,
    getAll,
    addContato
}