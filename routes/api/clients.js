const router = require('express').Router();
const { checkError } = require('../../helpers/validator');
const { body} = require('express-validator');
const {create} = require('../../models/client.model');

router.post('/register', 
    body('name_client')
        .isLength({min: 3, max: 10 })
        .withMessage('Minimo 3 y Maximo 15 caracteres'),

    body('id_table')
        .custom((value) => {
            const regExpRole =  /^[0-9]{1,3}$/;
            return regExpRole.test(value);
    })
        .withMessage('El campo es obligatorio.'),
    checkError,
    async (req,res) => {
        try {
            const result = await create(req.body);
            res.json(result);
        } catch (error) {
            res.json(error.message)
        }
})


router.delete('/delete/:tableId/:clientId',
    async(req, res) => {
        const {tableId} = req.params;
        const {clientId} = req.params;
        const clientDel = deleteClient(tableId,clientId)
    })
module .exports = router;  