const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const executeQueryOne = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) resolve(null);
            resolve(result[0]);
        });
    });
}

const createToken = (user) => {
    const obj = {
        userId: user.id_user,
        userRole: user.role,
        expiresAt: dayjs().add(1000, 'hours').unix()
    }
    return jwt.sign(obj, process.env.JWT_TOKEN);
}


module.exports = {
    executeQuery, executeQueryOne, createToken
}