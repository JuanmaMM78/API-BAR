const { executeQuery, executeQueryOne} = require('../helpers/utils');

const create = ({ name_client, id_table }) => {
    return executeQuery(' insert into clients (name_client, id_table) values (?,?)',[name_client, id_table]);
}

const deleteClientById = (clientId) => {
    return executeQuery('delete from clients where id_client = ?', [clientId]);
}

module.exports = {
    create, deleteClientById
}