const EmployeeTask = require('../task/Employee.task')

class EmployeeService {
    employeeTaskObj = new EmployeeTask()

    getAll(req, res){
        this.employeeTaskObj.getAll()
        .then((result) => {
            res.status(200).json({
                status:'OK',
                message:"All Employees Fetched",
                resultData: result
            })
            
        })
        .catch((err) =>console.log(err))
    }

    
    create(req, res){
        this.employeeTaskObj.create(req.body)
        .then((result)=> {
            res.status(201).json({
                status:'OK',
                message:'Employee registered succesfully',
                resultData:result
            })
        })
    }
}

module.exports = EmployeeService