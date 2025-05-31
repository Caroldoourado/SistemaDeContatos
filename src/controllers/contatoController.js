const contatoService = require('../services/contatoService');

async function getAll(req, res){
   
   try{
        let all = await contatoService.getAll();
        /* res.render('all', {all});*/
        res.json(all);
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
        console.error('Erro no controller:', error.message);
        res.status(400).json({erro: error.message});
    }
}

async function deleteContato(req, res){
    const id = req.params.id;
    try{
        await contatoService.deleteContato(id);
        res.status(200).json({mesagem: 'Contato deletado com sucesso.'});
    }catch(error){
        console.error('Erro ao deletar contato: ', error);
        res.status(500).json({erro:'Erro ao deletar contato.'})
    }}

module.exports = {
    getContato,
    getAll,
    addContato,
    deleteContato
}
