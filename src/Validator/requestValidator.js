const Joi = require('joi')

 companyCreate = Joi.object().keys({
    name: Joi.string().required(),
    email:Joi.string().required(),
    place:Joi.string().required(),
    street:Joi.string().required(),
    state:Joi.string().required(),
    city:Joi.string().required(),
    pincode:Joi.number().required(),
    landmark:Joi.string().required()
})

employeeCreate = Joi.object().keys({
    name: Joi.string().required(),
    email:Joi.string().required(),
    username:Joi.string().required(),
    password:Joi.string().required(),
    role:Joi.string().required(),
    phone:Joi.string().required(),
})


module.exports = {
    companyCreate,
    employeeCreate
}