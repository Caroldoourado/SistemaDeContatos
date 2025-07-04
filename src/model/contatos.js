const pool = require('../config/db');

module.exports = {

    getAll(){
        return result = pool.query('SELECT cli_id, cli_nome || ' - ' || cli_telefone AS cli_nome_telefone FROM cliente;').then(result =>{
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

    async addContato(nome, email, telefone){
         try {
            const query = 'INSERT INTO clientes (cli_nome, cli_email, cli_telefone, cli_status) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [nome, email, telefone, '1'];
            const result = await pool.query(query, values);
            return result.rows[0];
    } catch (error) {
        if (error.code === '23505') {
            throw new Error('Contato já adicionado');
        }
        throw new Error('Erro ao adicionar contato. Verifique se o contato já existe.');
    }
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
