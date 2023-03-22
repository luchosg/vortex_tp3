const {body, oneOf, param} = require('express-validator');
const validate = require('./validate');

const createEmployeeValidationRules = [
    body('first_name')
        .exists().withMessage("El campo es obligatorio")
        .isLength({min:2, max:30}).withMessage("El nombre debe tener un largo minimo de 2 y maximo de 30"),
    body('last_name')
        .exists().withMessage("El campo es obligatorio")
        .isLength({min:2, max:30}).withMessage("El apellido debe tener un largo minimo de 2 y maximo de 30"),
    body('cuit')
        .exists().withMessage("El campo es obligatorio")
        .isLength({min:11, max:11}).withMessage("El cuit debe tener 11 de longitud"),
    body('team_id')
        .exists().withMessage("El campo es obligatorio")
        .isLength({max:5}).withMessage("El team_id debe tener un largo maximo de 5"),
    body('join_date')
        .exists().withMessage("El campo es obligatorio")
        .isDate().withMessage("La fecha debe tener un formato valido"),
    body('rol')
        .exists().withMessage("El campo es obligatorio")
        .isLength({max:50}).withMessage("El rol debe tener un largo maximo de 50"),
    (req, res, next) => {
        return validate(req, res, next);
    }
]


const updateEmployeeValidationRules = [
    oneOf([
        body('first_name')
            .exists().withMessage("El campo es obligatorio")
            .isLength({min:2, max:30}).withMessage("El nombre debe tener un largo minimo de 2 y maximo de 30"),
        body('first_name').not().exists()
    ]),
    oneOf([
        body('last_name')
            .exists().withMessage("El campo es obligatorio")
            .isLength({min:2, max:30}).withMessage("El apellido debe tener un largo minimo de 2 y maximo de 30"),
        body('last_name').not().exists()
    ]),        
    oneOf([
        body('cuit')
            .exists().withMessage("El campo es obligatorio")
            .isLength({min:11, max:11}).withMessage("El cuit debe tener 11 de longitud"),
        body('cuit').not().exists()
    ]),
    oneOf([
        body('team_id')
            .exists().withMessage("El campo es obligatorio")
            .isLength({max:5}).withMessage("El team_id debe tener un largo maximo de 5"),
        body('team_id').not().exists()
    ]),
    oneOf([
        body('join_date')
            .exists().withMessage("El campo es obligatorio")
            .isDate().withMessage("La fecha debe tener un formato valido"),
        body('join_date').not().exists()
    ]),
    oneOf([
        body('rol')
            .exists().withMessage("El campo es obligatorio")
            .isLength({max:50}).withMessage("El rol debe tener un largo maximo de 50"),
        body('rol').not().exists()
    ]),
    (req, res, next) => {
        return validate(req, res, next);
    }
]

const e_paramValidationRules = [
    param('eid').exists().isInt().withMessage("El param debe ser un numero"),
    (req, res, next) => {
        return validate(req, res, next);
    }
]

module.exports = {
    createEmployeeValidationRules,
    updateEmployeeValidationRules,
    e_paramValidationRules
}