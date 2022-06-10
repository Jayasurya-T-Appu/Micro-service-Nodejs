const mongoose = require("mongoose");

const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(email);
};
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "username Number is required"],
    },
    phone: {
      type: String,
      unique: true,
      validate: [/^\d{10}$/, "Please provide a valid Phone Number"],
      required: [true, "Phone Number is required"],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate: [validateEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      trim: true,
    },

    userToken: {
      type: String,
      default: null,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "col_role",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "col_company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("col_employee", EmployeeSchema);
module.exports = Employee;
