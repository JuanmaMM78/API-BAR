const { executeQuery, executeQueryOne } = require('../helpers/utils');


const getAll = () => {
    return executeQuery('select * from products')
}

module.exports = {
    getAll
}