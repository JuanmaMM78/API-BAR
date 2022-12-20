const { executeQuery, executeQueryOne } = require('../helpers/utils');


const getAll = () => {
    return executeQuery('select * from categories')
}

module.exports = {
    getAll
}