const CompanyTask  = require('../task/Company.task')
class ConpanyService {

    addressTaskObj = new CompanyTask()

    getAll(req, res){
        this.addressTaskObj.getAll()
        .then((result) => {
            res.status(200).json({
                status:'OK',
                message:"All Companies Fetched",
                resultData: result
            })
            
        })
        .catch((err) =>console.log(err))
    }

    create(req, res){
        this.addressTaskObj.create(req.body)
        .then((result)=> {
            res.status(201).json({
                status:'OK',
                message:'Company registered succesfully',
                resultData:result
            })
        })
    }
}

module.exports = ConpanyService