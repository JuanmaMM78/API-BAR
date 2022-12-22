const router = require('express').Router();
const {getAll, deleteTableById, create} = require('../../models/table.model');
const {newQR} = require('../../helpers/utils');
const { body} = require('express-validator');
const { checkError } = require('../../helpers/validator');

router.get('/', async (req,res) => {
    try {
        const tables = await getAll();
        res.json(tables);
    } catch (err) {
        res.json(err.message);
    }
}) 

router.get('/newqr/:tableId', 
    async (req,res) => {
        const {tableId} = req.params;
        try {
            const QR = await newQR(tableId);
            res.json(QR);
        } catch (error) {
            res.json(error.message)
        }
})

router.post('/register', 
    body('id_table')
        .custom((value) => {
            const regExpRole =  /^[0-9]{1,3}$/;
            return regExpRole.test(value);
    })
        .withMessage('El campo es obligatorio.'),

    body('comment')
        .isLength({max: 30 })
        .withMessage('Maximo 30 caracteres'),    
    checkError,
    async (req,res) => {
        try {
            const result = await create(req.body);
            res.json(result);
        } catch (error) {
            res.json(error.message)
        }
})

router.delete('/delete/:tableId',
    async(req, res) => {
        const {tableId} = req.params;
        const result = await deleteTableById(tableId);
        res.json(result)
})


module.exports = router