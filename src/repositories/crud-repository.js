const { where } = require('sequelize');
const {Logger} = require('../config');
const AppError = require('../utils/errors/app-errors');

class CrudRepository{
    constructor(model){
        this.model = model;
    }
    async create(data){
        try {
            
            const response = await this.model.create(data);
            
            return response;
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }

    async destroy(data){
        const res = await this.model.findByPk(data);
        if(!res) throw new AppError("Airplane is invalid",404);
            const response = await this.model.destroy({
                where:{
                    id:data
                }
            })

    }
    async getAll(){
        const response = await this.model.findAll();
        return response;
    }

    async get(data){
        const response = await this.model.findByPk(data);
        if(!response) throw new AppError("plane not found",404);
        return response;
    }
}

module.exports = CrudRepository;