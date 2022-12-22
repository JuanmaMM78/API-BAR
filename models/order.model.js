const { executeQuery} = require('../helpers/utils');

const create = ({ id_client, id_product, lot, id_table, num_tiket }) => {
    return executeQuery(' insert into orders (id_client, id_product, lot, id_table, num_tiket) values (?,?,?,?,?)',[id_client, id_product, lot, id_table, num_tiket ]);
}
module.exports = {
    create
}