const contatoModel = require('../model/contatos');

async function getAll(){
    try{
        const result = await contatoModel.getAll();
        return result;
    }catch (error){
        console.error('Erro ao buscar contatos no service', error);
        throw error;
    }
}

async function getContato(contato){
    try {
        const result = await contatoModel.getContato(contato);
        return result;
    }catch(error){
        console.error('Erro ao buscar contato no service', error);
        throw error;
    }
}

module.exports = {
    getContato,
    getAll
};