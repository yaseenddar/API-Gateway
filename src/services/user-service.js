const { Model } = require('sequelize');
const {UserRepository}= require('../repositories');
const AppError = require('../utils/errors/app-errors');
const userRep = new UserRepository();
const {Auth} = require('../utils/common')

async function create(data){
    
    try { 
        const user = await userRep.create(data);
        return user;
    } catch (error) {
        
        if(error.name == 'SequelizeValidationError' || error.name ==  'SequelizeUniqueConstraintError'){
            const explanation = []
            error.errors.forEach(element => {
                explanation.push(element.message);
            });
            
            throw new AppError(explanation,400);
        }
        
        throw new AppError('Cannot create a new user object',500);
       
    }
}
async function signin(data){
    try {
        const user = await userRep.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No User found with Email',404);
        }
        const passwordMatch = Auth.checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError('Invalid Password',404);
        }
        const jwt = Auth.createToken({id:user.id,email:data.email });
        // console.log(jwt)
        return jwt;
    } catch (error) {
        throw error
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', 400);
        }
        const response = Auth.verifyToken(token);
        const user = await userRep.get(response.id);
        if(!user) {
            throw new AppError('No user found', 404);
        }
        return user.id;
    } catch(error) {
        // console.log(error)
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', 400);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', 400);
        }
        throw new AppError('Something went wrong', 500);
    }
}
module.exports = {
    isAuthenticated,
    create,
    signin
}