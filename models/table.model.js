const {executeQuery, executeQueryOne} = require('../helpers/utils');


const getAll = () => {
    return executeQuery('select * from tables');
}
const getById = (tableId) => {
    return executeQueryOne('select * from tables where id_table = ?', [tableId]);
}

const create = ({ id_table, comment }) => {
    return executeQuery(' insert into tables (id_table, comment) values (?,?)',[id_table, comment]);
}

const deleteTableById = (tableId) => {
    return executeQuery('delete from tables where id_table = ?', [tableId]);
}

module.exports = {
    getById, getAll, deleteTableById, create
}