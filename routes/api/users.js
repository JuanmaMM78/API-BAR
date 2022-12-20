const bcrypt = require('bcryptjs');
const router = require('express').Router(); 
const { body } = require('express-validator');
const { checkToken } = require('../../helpers/middlewares');
const { createToken } = require('../../helpers/utils');
const { checkError} = require('../../helpers/validator');
const {getByEmail, newPasssword} = require('../../models/user.model')


/// modificacion de password
router.put('/new-password/:userId',
        checkToken,
        body('password_user')
        .custom((value) => {
            const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
            return regExpPassword.test(value);
        })
        .withMessage('La password debe contener: mayúscula, minúscula, un número y entre 4 y 8 caracteres'),
        checkError,
    async (req, res) => {
        const { userId } = req.params;
        req.body.password_user = bcrypt.hashSync(req.body.password_user, 11);
        const result = await newPasssword(userId, req.body);
        res.json(result);
});

// LOGIN Comprobación coincidencia del email en la DDBB y de la password
router.post('/login', async (req, res) => {
    const { mail_user, password_user } = req.body;

    const user = await getByEmail(mail_user);
    if (!user) {
        return res.status(403).json({ error: 'Error en usuario y/o contraseña' });
    }

    const equal = bcrypt.compareSync(password_user, user.password_user);
    if (!equal) {
        return res.status(403).json({ error: 'Error en usuario y/o contraseña' });
    }

    res.json({
        success: 'Login correcto',
        token: createToken(user)
    });
});
    
    module.exports = router;