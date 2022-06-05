const mongoose = require('mongoose')
const AppConfig = require('../../config/config')

const AppConfigLoader = new AppConfig()
const mongoProperties = AppConfigLoader.getMongoProperties()

class MongoBaseDao {
    mongooseClient
     init() {
        const mongoUrl = `mongodb://${mongoProperties.username}:${mongoProperties.password}@${mongoProperties.host}:${mongoProperties.port}/${mongoProperties.database}`
        this.mongooseClient = mongoose.connect(mongoUrl, { useNewUrlParser: true })


        //CONNECTION EVENTS
        //When succesfull connection

        mongoose.connection.on('connected', ()=> {
            console.log(`MongoDB connected successfully ${mongoProperties.host, mongoProperties.port}`)
        })

        //When connection failes 

        mongoose.connection.on('error', ()=> {
            console.log(`MongoDB failed to connect on ${mongoUrl}`)
        })

        //When disconnected 

        mongoose.connection.on('disconnected', () => {
            console.log(`MongoDb connection has been disconnected `)
        })

        //If the node process ends , close the mongodb connection

        process.on('SIGINT', ()=> {
            mongoose.connection.close(()=> {
                console.log(
                    'MongoDB database default connection through app termination '
                )
                process.exit(0)
            })
        })
    }
}

module.exports = MongoBaseDao
