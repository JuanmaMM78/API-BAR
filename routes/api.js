const router = require('express').Router();

const apiUsersRouter = require('./api/users'); 
const apiProductsRouter = require("./api/products");  
const apiCategoriesRouter = require("./api/categories"); 
const { checkToken } = require('../helpers/middlewares');


router.use('/users', apiUsersRouter);
router.use('/products', checkToken, apiProductsRouter);
router.use('/categories', checkToken, apiCategoriesRouter);

module.exports = router