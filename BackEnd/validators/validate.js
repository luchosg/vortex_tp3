const {validationResult} = require('express-validator');
const HttpError = require('../customErrors/HttpError');

const validate = (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(400).json(errors);
    } catch({message}){
        next(new HttpError(message, 500));
    }
}

module.exports = validate;