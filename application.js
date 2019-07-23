const express =  require('express')
const server = new express()
const productRoute = require('./api/productapi').productRoute
const parser = require('body-parser')
const cors = require('cors')

server.use(parser.json())
server.use(cors())


server.use('/product',productRoute)

server.listen(1230, ()=> console.log(" Server is running "))