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

module.exports = {
    getContato,
    getAll
}