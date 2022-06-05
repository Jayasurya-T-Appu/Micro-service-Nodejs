const companyModel = require('../models/Company.model')

class CompanyTask {
    getAll(){
        return new Promise((resolve ,reject) => {
            companyModel.find()
            .then((result)=> resolve(result))
            .catch((err) => reject(err))
        })
    }

    create(data){
        return new Promise((resolve, reject)=> {
            companyModel.create(data).then((res)=> {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })

    }
}

module.exports = CompanyTask