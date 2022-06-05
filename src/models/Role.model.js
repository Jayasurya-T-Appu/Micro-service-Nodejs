const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        lowercase:true,
        required:[true, 'Role is required']
    }
})

const Role =  mongoose.model('col_role', RoleSchema)
export default Role