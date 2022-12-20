const router = require('express').Router();

const apiProductsRouter = require("./api/products");  
const apiCategoriesRouter = require("./api/categories"); 

router.use('/products', apiProductsRouter);
router.use('/categories', apiCategoriesRouter);

module.exports = router