const {executeQuery, executeQueryOne} = require('../helpers/utils');


const getAll = () => {
    return executeQuery('select * from tables');
}
const getById = (tableId) => {
    return executeQueryOne('select * from tables where id_table = ?', [tableId]);
}

module.exports = {
    getById, getAll
}