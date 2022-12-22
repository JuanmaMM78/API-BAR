const router = require('express').Router();
const {getAll} = require('../../models/table.model');
const {newQR} = require('../../helpers/utils')

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


module.exports = router