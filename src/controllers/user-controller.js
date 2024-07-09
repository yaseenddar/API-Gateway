const { UserService } = require("../services")

const {ErrorResponse, SuccessResponse} = require('../utils/common')
 async function  createUser(req,res){
    try {
        // console.log("in controller",req.body.name)
        const user = await UserService.create({email:req.body.email,password:req.body.password})
       SuccessResponse.data = user;
        
        return res.status(200).json({SuccessResponse})
    } catch (error) {
            ErrorResponse.error = {
            errorCode:error.statusCode,
            explanation:error.message
        };
      
        return res.status(error.statusCode).json({ErrorResponse})
    }
}

module.exports ={
    createUser
}