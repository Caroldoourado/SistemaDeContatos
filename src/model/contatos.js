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
                'SELECT CLI_NOME, CLI_TELEFONE FROM CLIENTES WHERE CLI_NOME ILIKE $1 OR CLI_TELEFONE LIKE $2', 
                [`%${contato}%`, `%${contato}%`]
            ).then(result => {
                return result.rows;
            }).catch (erro => {
                console.error('Erro na consulta:', erro);
                throw erro;
        });
    },

    newContato(nome, numero) {
        this.contatos.push({ id: generateID(), nome, numero });
    },
};

function generateID() {
    return Math.random();
}
