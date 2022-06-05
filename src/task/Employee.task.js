const EmployeeModel = require('../models/Employee.model')

class EmployeeTask {
    getAll(){
        return new Promise((resolve ,reject) => {
            EmployeeModel.find()
            .then((result)=> resolve(result))
            .catch((err) => reject(err))
        })
    }
    create(data){
        return new Promise((resolve, reject)=> {
            EmployeeModel.create(data).then((res)=> {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })

    }
}

module.exports = EmployeeTask