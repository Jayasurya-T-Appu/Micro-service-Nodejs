const mongoose = require('mongoose')

const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    return re.test(email);
  };
const CompanySchema = new mongoose.Schema( {
    name: {
        type:String,
        unique:true,
        trim:true,
        required:[true,'Company Name is required']
    },
    email:{
        type:String,
        unique: true,
        sparse: true,
        trim: true,
        validate: [validateEmail, 'Please provide a valid email address'],
      
    },
    place: {
        type: String,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      landmark: {
        type: String,
        required: false,
      },
      
   }, 
 {
  
        timestamps:true  
 }
)

const Company = mongoose.model('col_company', CompanySchema)
module.exports = Company