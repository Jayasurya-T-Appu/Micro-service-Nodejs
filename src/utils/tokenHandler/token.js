const { decode } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const AppConfig = require('../../../config/config')

class TokenTask {
    appConfigObj
    constructor() {
        this.appConfigObj = AppConfig.getInstance()
    }

    sign(user){
        const self = this
        const appConfig = self.appConfigObj.getApplicationProperties()
        const secretKey = appConfig.jwtSecret
        const expireIn = {expireIn:appConfig.jwtExp}
        const userData = {
            id: user._id, username: user.username, role: user.role.name, roleId: user.role._id,
   
        }
        return jwt.sign({
            data: userData,
          }, secretKey, expireIn);
    }
    
    verify(securityToken){
        const self = this;
        let decoded;
        try{
            const appConfig = self.appConfigObj.getApplicationProperties()
            const secretKey = self.appConfig.jwtSecret
            decoded = jwt.verify(securityToken, secretKey)
        }
        catch(err){
            console.log("error at Verifying");
            return null
        }
        return decoded
    }
}
module.exports = TokenTask