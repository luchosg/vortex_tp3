const {body, oneOf, param} = require('express-validator');
const validate = require('../validators/validate');

const createAssetValidationRules = [
    body('name')
        .exists().withMessage("Campo obligatorio")
        .isLength({min:2, max:30}).withMessage("El nombre debe tener un largo minimo de 2 y maximo de 30"),
    body('type')
        .exists().withMessage("Campo obligatorio")
        .isLength({min:2, max:30}).withMessage("El tipo debe tener un largo minimo de 2 y maximo de 30"),
    oneOf([
        body('code')
            .exists()
            .isLength({min:1, max:30}).withMessage("El codigo debe tener un largo min de 1 y max de 30")
            .optional({nullable: true}),
        body('code')
            .not().exists()
        ]),
    oneOf([
        body('brand')
            .exists()
            .isLength({min:1, max:30}).withMessage("La marca debe tener un largo min de 1 y max de 30")
            .optional({nullable: true}),
        body('brand')
            .not().exists()
    ]),
    oneOf([
        body('description')
            .exists()
            .isLength({min:1, max:255}).withMessage("La descripcion debe tener un largo min de 1 y max de 255")
            .optional({nullable: true}),
        body('description')
            .not().exists()
    ]),
    body('purchase_date')
        .exists().withMessage("Campo obligatorio")
        .isDate().withMessage("La fecha debe tener un formato valido"),
    body('employee_id')
        .exists().withMessage("Campo obligatorio")
        .isLength({max:5}).withMessage("El employee_id debe tener un largo maximo de 5"),
    (req, res, next) => {
        return validate(req, res, next);
    }
]


const updateAssetValidationRules = [
    oneOf([
        body('name')
            .exists().withMessage("El campo es obligatorio")
            .isLength({min:2, max:30}).withMessage("El nombre debe tener un largo minimo de 2 y maximo de 30"),
        body('name').not().exists()
    ]),
    oneOf([
        body('type')
            .exists().withMessage("El campo es obligatorio")
            .isLength({min:2, max:30}).withMessage("El tipo debe tener un largo minimo de 2 y maximo de 30"),
        body('type').not().exists()
    ]),
    oneOf([
        body('code')
            .exists()
            .isLength({min:1, max:30}).withMessage("El codigo debe tener un largo min de 1 y max de 30")
            .optional({nullable: true}),
        body('code').not().exists()
    ]),
    oneOf([
        body('brand')
            .exists()
            .isLength({min:1, max:30}).withMessage("La marca debe tener un largo min de 1 y max de 30")
            .optional({nullable: true}),
        body('brand').not().exists()
    ]),
    oneOf([
        body('description')
            .exists()
            .isLength({min:1, max:255}).withMessage("La descripcion debe tener un largo min de 1 y max de 255")
            .optional({nullable: true}),
        body('description').not().exists()
    ]),
    oneOf([
        body('purchase_date')
            .exists().withMessage("El campo es obligatorio")
            .isDate().withMessage("La fecha debe tener un formato valido"),
        body('purchase_date').not().exists()
    ]),
    oneOf([
        body('employee_id')
            .exists().withMessage("El campo es obligatorio")
            .isLength({max:5}).withMessage("El employee_id debe tener un largo maximo de 5"),
        body('employee_id').not().exists()
    ]),
    (req, res, next) => {
        return validate(req, res, next);
    }
]

const a_paramValidationRules = [
    param('aid').exists().isInt().withMessage("El param debe ser un numero"),
    (req, res, next) => {
        return validate(req, res, next);
    }
]

module.exports = {
    createAssetValidationRules,
    updateAssetValidationRules,
    a_paramValidationRules
}