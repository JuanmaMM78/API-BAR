const router = require('express').Router();
const {getAll} = require('../../models/product.model');

router.get('/', async (req,res) => {
    try {
        const products = await getAll();
        res.json(products);
    } catch (err) {
        res.json(err.message);
    }
}) 


module.exports = router