const { Model } = require('sequelize');
const {UserRepository}= require('../repositories');
const AppError = require('../utils/errors/app-errors');
const userRep = new UserRepository();


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

module.exports = {create}