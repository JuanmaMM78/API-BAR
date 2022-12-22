const router = require('express').Router();
const { checkError } = require('../../helpers/validator');
const { body } = require('express-validator');
const {create} = require('../../models/order.model');

router.post('/neworder', 

    async (req,res) => {
       
        for(let i=0; i<req.body.length; i++){
            
            body('id_client')
                .custom((value) => {
                    const regExpRole =  /^[0-9]{1,3}$/;
                    return regExpRole.test(value);
            })
                .withMessage('El campo es obligatorio.'),
    
            body('id_product')
                .custom((value) => {
                    const regExpRole =  /^[0-9]{1,4}$/;
                    return regExpRole.test(value);
            })
                .withMessage('El campo es obligatorio.'),
    
            body('lot')
                .custom((value) => {
                    const regExpRole =  /^[0-9]{1,2}$/;
                    return regExpRole.test(value);
            })
                .withMessage('El campo es obligatorio.'),
    
            body('id_table')
                .custom((value) => {
                    const regExpRole =  /^[0-9]{1,3}$/;
                    return regExpRole.test(value);
            })
                .withMessage('El campo es obligatorio.'),

            body('num_tiket')
                .custom((value) => {
                    const regExpRole =  /^[0-9]{1,3}$/;
                    return regExpRole.test(value);
            })
                .withMessage('El campo es obligatorio.'),
    
            checkError,
            result = await create(req.body[i]);
            
        } res.json(result)
    }
)

module.exports = router;  