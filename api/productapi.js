const server = require('express').Router()
const productclass = require("../services/productservices").productclass
const productobj = new productclass()

server.get('/',(req,res)=>{
    res.status(200).json({
        allproduct: productobj.getallproduct()
    })
})

server.post('/register',(req,res)=>{  
    console.log(req.body)

    res.status(200).json({
        product: productobj.addproduct(req.body)
    })
})

server.post('/update',(req,res)=>{  
    console.log(req.body)

    res.status(200).json({
        updateproduct: productobj.updateproduct(req.body)
    })
})

server.post('/search',(req,res)=>{  
    console.log(req.body)

    res.status(200).json({
        searchproduct: productobj.searchproduct(req.body)
    })
})
server.post('/email',(req,res)=>{  
    console.log(req.body)

    res.status(200).json({
        email: productobj.sendemail(req.body)
    })
})

module.exports.productRoute = server;