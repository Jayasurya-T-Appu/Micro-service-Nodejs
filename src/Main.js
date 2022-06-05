const express = require('express');
const mongoose = require('mongoose')
const MongoBaseDao = require('../src/dao/mongo-base.dao')
const expressApp = require('./Server')
const http = require('http')
const appConfig = require('../config/config')


const appConfigLoader = new appConfig()
const ApplicationProperties = appConfigLoader.getApplicationProperties()
const port = ApplicationProperties.port

let server = http.createServer(expressApp)

new MongoBaseDao().init()


server.listen(port,()=> {
    const addressInfo = server.address();
    console.log(`Server is listning on port: ${addressInfo.port}`);
})