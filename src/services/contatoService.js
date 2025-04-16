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

async function addContato(nome, email, telefone){
    try {
        const result = await contatoModel.addContato(nome, email, telefone);
        return result;
    }catch(error){
        console.error('Erro ao adicionar contato no service', error);
        throw error;
    }
}

async function deleteContato(id){
    try {
        const result = await contatoModel.deleteContato(id);
        return result;
    }catch(error){
        console.error('Erro ao deletar contato no service', error);
        throw error
    }
}

module.exports = {
    getContato,
    getAll,
    addContato,
    deleteContato
};
