const { executeQueryOne, executeQuery } = require('../helpers/utils');

const getByEmail = (mail_user) => {
    return executeQueryOne('select * from users where mail_user = ?', [mail_user]);
}

const newPasssword = (userId, { password_user }) => {
    return executeQuery('update users set password_user = ? where id_user = ?', [password_user, userId]);
}

module.exports = {
    getByEmail, newPasssword
}
