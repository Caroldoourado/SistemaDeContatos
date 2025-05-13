const pool = require('../config/db');

module.exports = {

    getAll(){
        return result = pool.query('select * from clientes').then(result =>{
            return result.rows;
        }).catch(erro => {
            console.error("Erro ao buscar contatos", erro);
            throw erro;
        });
    },

    getContato(contato) {
        return result = pool.query(
                'SELECT CLI_ID, CLI_NOME, CLI_TELEFONE FROM CLIENTES WHERE CLI_NOME ILIKE $1 OR CLI_TELEFONE LIKE $2', 
                [`%${contato}%`, `%${contato}%`]
            ).then(result => {
                return result.rows;
            }).catch (erro => {
                console.error('Erro na consulta:', erro);
                throw erro;
        });
    },

    addContato(nome, email, telefone){
        return pool.query(
            'INSERT INTO CLIENTES (CLI_NOME, CLI_EMAIL, CLI_TELEFONE, CLI_STATUS) VALUES ($1, $2, $3, $4)', 
            [nome, email, telefone, '1']
        ).then(result =>{
            return {message: "Contato inserido com sucesso!"}
        }).catch(error => {
            console.error("Erro ao inserir contato:", error)
            throw error;
        })
    },

    deleteContato(id){
        return pool.query(
            'DELETE FROM CLIENTES WHERE CLI_ID = $1', [id] 
        ).then(result =>{
            return {message: "Contato deletado com sucesso!"}
        }).catch(error => {
            console.error("Erro ao deletar contato:", error)
            throw error;
        })
    }
};
