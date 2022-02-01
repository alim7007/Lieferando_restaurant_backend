const Joi = require('joi');



//Register Vallidation
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        username: Joi.string().min(6).max(225).required()
    }
    return Joi.validate(data, schema);
}

//Login Vallidation
const loginValidation = data => {
    const schema = {
        username: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        email: Joi.string().min(6).max(225).required().email(),
    }
    return Joi.validate(data, schema);
}

//New Note Validation 
const newNote = data => {
    const schema = {
        title: Joi.string().min(6).max(255),
        description: Joi.string().min(6).max(1000),
        time: Joi.date()
    }
    return Joi.validate(data, schema);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.newNote = newNote;