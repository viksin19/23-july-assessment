const express = require('express')
const server = new express()
const userApi = require('./api/userapi').userApi

const parser = require('body-parser')
const cors = require('cors')

server.use(parser.json())
server.use(cors())

server.use('/user',userApi)


server.listen(5000,()=>{
    console.log('Server is Running')
})

