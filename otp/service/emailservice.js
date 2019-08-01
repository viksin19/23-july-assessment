const nodemailer = require('nodemailer');
class Email {
    constructor(){
        this.smtpSetup = {
            service : 'gmail',
            auth :{
                user : 'ibmtechtraining007@gmail.com',
                pass : 'India@786'
            }
        }
        // configure the smtp settings
        this.mailer = nodemailer.createTransport(this.smtpSetup);
    }
    email(userObj){
        // in case sender isnt mentioned
        if(userObj.from == null){
            userObj.from = 'ibmtechtraining007@gmail.com';
        }
        this.mailer.sendMail({
            from : userObj.from,
            to : userObj.to,
            subject : userObj.subject,
            /*text : emailBody, */
            html : userObj.body
        },(err,response)=>{
            if(err){
                console.log(err);
                return "Unable to send email";
            }else{
                console.log('Email Sent');
                return "Email Sent Successfully";
            }
        })
    }
    
}
module.exports.Email = Email;