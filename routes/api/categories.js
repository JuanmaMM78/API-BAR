const router = require('express').Router();
const {getAll} = require('../../models/category.model');

router.get('/', async (req,res) => {
    try {
        const categories = await getAll();
        res.json(categories);
    } catch (err) {
        res.json(err.message);
    }
}) 


module.exports = router