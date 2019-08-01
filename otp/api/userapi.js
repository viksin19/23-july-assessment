const server = require('express').Router()
const userclass = require('../service/userservice').userclass
const userobj = new userclass()

server.post('/register',(req,res)=>{

    userobj.register(req.body,(err,response)=>{
             
        if(err){
            res.status(400).json({
                message: 'Unable to register'
            })
        }else{
            res.status(200).json({
                message : 'OTP Generated',
                result : response 
            })
        }

    })
})


server.post('/verify',(req,res)=>{
   const d = new Date();
   let val = d.getTime();
userobj.validateotp(req.body.otp,(err,data)=>{
    if(err){
        res.status(400).json({
            message: 'Not Verified'
        })
    }else {
        if(data){
            console.log(data);
            if(data[0].otp == req.body.otp && data[0].date > val ){
                userobj.update(req.body,(err,result)=>{
                    if(result){
                        res.status(200).json({
                            message:'Verified !!!',
                            result: result
                    })
                    }else{
                        res.status(400).json({
                            message:'Not Verified'
                        })
                    }
                })
               
        }else{
            res.status(400).json({
                message: ' Time Out'
            })
        } 
        }else{
            res.status(400).json({
            message: ' Not Verified'
        })}
    }
})
})

module.exports.userApi = server 