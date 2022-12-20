const router = require('express').Router();
const {getAll} = require('../../models/table.model');

router.get('/', async (req,res) => {
    try {
        const tables = await getAll();
        res.json(tables);
    } catch (err) {
        res.json(err.message);
    }
}) 


module.exports = router