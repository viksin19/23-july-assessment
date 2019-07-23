const productdb = require('../dbs/userdb').productdb
const Email = require('./email.service').Email;
const emailService = new Email();
class ProductService{
 
      constructor(){
          this.productdb= productdb;
      }
    getallproduct(){

       return this.productdb;
    }

    sendemail(user){
        let userObj ={
            subject : "Item Reciept",
            body : `<div>Dear <b>${user.name}</b></div>
                    <div>${user.table}</div>
                    <div>You Successfully Item reciept generated.</div>`,
            from : null,
            to : user.email
        }
        emailService.email(userObj);
    }

    addproduct(product){
        this.productdb.push(product);
    }


    updateproduct(product){
        this.productdb.forEach(p=>{
            if(p.id == product.id){
                p.push(product);
            }
        })
    }
    searchproduct(productname){
        let searchitem = []
        this.productdb.forEach(p=>{
            if(p.name == productname.name){
                searchitem.push(p);
            }
        })
        return searchitem;
    }
}

module.exports.productclass = ProductService;