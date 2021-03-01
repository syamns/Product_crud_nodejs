const User = require('../Models/User.model')
const bcrypt = require('bcryptjs');
const jwt     =require('jsonwebtoken')

module.exports ={
registerUser : async(req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            next(err);
        }
        let user =new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        user.save()
        .then(user=>{
            res.send({
                status:200,
                message:"user saved successfully"
            })
        })
        .catch(error=>{
            next(error); 
        })
    })
    
    },

loginUser:async(req,res,next)=>{
    var username= req.body.username
    var password = req.body.password

    User.findOne({$or:[{email:username}]}).
    then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.send({
                        error:err
                    })
                }
                if(result){
                    let token =jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'})
                    res.send({
                        status:200,
                        message:'Login Successfull',
                        token
                    })
                }
                else{
                    res.send({
                        message:'Password does not match'
                    })
                }
            })
        }
        else{
            res.send({
                status:500,
                message:"No user Found"
            })
        }
    })
        
    }

}