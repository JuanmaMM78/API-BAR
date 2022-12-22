const { executeQuery} = require('../helpers/utils');

const create = ({ name_client, id_table }) => {
    return executeQuery(' insert into clients (name_client, id_table) values (?,?)',[name_client, id_table]);
}

const deleteClient = ({})

module.exports = {
    create
}