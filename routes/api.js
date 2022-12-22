const router = require('express').Router();

const apiUsersRouter = require('./api/users'); 
const apiProductsRouter = require("./api/products");  
const apiCategoriesRouter = require("./api/categories"); 
const apiTablesRouter = require('./api/tables');
const apiClientsRouter = require('./api/clients');
const apiOrdersRouter = require('./api/orders');

const { checkToken } = require('../helpers/middlewares');


router.use('/users', apiUsersRouter);
router.use('/products', checkToken, apiProductsRouter);
router.use('/categories', checkToken, apiCategoriesRouter);
router.use('/tables', checkToken, apiTablesRouter);
router.use('/clients', checkToken, apiClientsRouter);
router.use('/orders', checkToken, apiOrdersRouter);

module.exports = router