const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getById } = require('../models/table.model');

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({ error: 'No has incluido la cabecera de autorización' });
    }
    const { authorization: token } = req.headers

    let obj;
    try {
        obj = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (error) {
        return res.json({ error: 'El token no tiene un formato válido' });
    }

    if (dayjs().unix() > obj.expiresAt) {
        return res.json({ error: 'El token ha caducado' });
    }

    const user = await getById(obj.userId)
    req.user = user;

    next();
}


module.exports = {
    checkToken
}