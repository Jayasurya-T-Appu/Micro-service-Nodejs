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


module.exports = {
    companyCreate
}