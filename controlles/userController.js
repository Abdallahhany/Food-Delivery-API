const userModel = require('../models/userModel');
const config = require('./config');
const JWT = require('jsonwebtoken');


module.exports.users = (req,res)=> {
    userModel.find().then((result)=>{
        res.json(result);
    })
};

module.exports.signUp = (req,res)=>{
    const user = new userModel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        fullName:req.body.fullName,
        phoneNumber:req.body.phoneNumber
    });
    user
        .save()
        .then((result)=>{
            res.json({data:result})

        })
        .catch((err)=>{
            res.status(403).json({msg:err})
        });
};

module.exports.login = (req,res)=>{
    userModel.findOne({username:req.body.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
        if(result===null){
            return res.status(403).json("incorrect username or password");
        }
        if(result.password === req.body.password){
            let token = JWT.sign({username:req.body.username},config.key,{
                expiresIn: '24h', //expire in 24 hour
            });
            res.json({token:token,data:result})
        }
        else {
            return res.status(403).json("incorrect username or password");
        }
    });
};

module.exports.getUser = (req,res)=>{
    userModel.findOne({username:req.params.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
        return res.json({
            data:result,
            username:req.params.username
        });
    });
};

module.exports.checkUserName = (req,res)=>{
    userModel.findOne({username:req.params.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
        if(result !== null){
            return res.json({
                status:true
            });
        }
        else {
            return res.json({
                status:false
            });
        }
    });
};

module.exports.UpdatePassword = (req,res)=>{
    userModel.findOneAndUpdate(
        {username:req.params.username},
        {$set:{password:req.body.password}},
        (error,result)=>{
            if(error){
                return res.status(500).json({msg:error})
            }
            const msg = ({
                msg: "Password updated successfully",
                username:req.params.username
            });
            return res.json(msg);
        }
    );
};

module.exports.deleteAccount = (req,res)=> {
    userModel.findOneAndRemove({username:req.params.username},
        (error,result)=>{
            if(error){
                return res.status(500).json({msg:error})
            }
            const msg = ({
                msg: "account deleted successfully",
                username:req.params.username
            });
            return res.json(msg);
        })
};


module.exports.addImg = async (req,res)=>{
    await userModel.findOneAndUpdate(
        {username:req.params.username},
        {
            $set :{
                image:req.file.path,
            }
        },
        {
            new :true
        },
        (err,result)=>{
            if(err)
                return res.send(err);
            return res.json(result);
        }
    );
};