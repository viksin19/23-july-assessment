const client = require('mongodb').MongoClient
const otpgenerator = require('otp-generator')
const email = require('./emailservice').Email
const emailobj = new email()
const d = new Date();
const url = 'mongodb://localhost:27017'
class UserService {
     
     register(user,callback){   
         const otp = this.otpGenrator();  
          let validity = d.getTime()+ 300000;
          var  userobj = {
             to : user.email,
             body: `<h3>your OTP is generated . </h3>
                     <h3>Enter this OTP </h3>
                     OTP: <h2>${otp}</h2>
                     <h3>OTP is Valid For 5 mins</h3> `,
            subject: 'OTP generate'        
           }        
          this._user = {
             name : user.name,
             email: user.email,
             date : validity,
             otp : otp
         }  
            emailobj.email(userobj);
            client.connect(url,(err,conn)=>{
            conn.db('userotp').collection('user').insert(this._user,(err,response)=>{
            callback(err,response);
        })
    }) 
    
}
update(data,callback){
    client.connect(url,(err,conn)=>{
        conn.db('userotp').collection('user').update({otp : data.otp},{$set : data},(err,response)=>{
            callback(err,response);
        })
    })
}
validateotp(_otp,callback){

    client.connect(url,(err,conn)=>{
        conn.db('userotp').collection('user').find({ otp : _otp}).toArray((err,data)=>{
            console.log(data);
                callback(err,data);
         })
       }) 
}


otpGenrator(){
    return otpgenerator.generate(6, { upperCase: false, specialChars: false })

}
}

module.exports.userclass = UserService