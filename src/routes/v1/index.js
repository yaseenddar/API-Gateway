const express = require('express');
const {AuthMiddleware} = require('../../middlewares')

const { InfoController } = require('../../controllers');
const userRoutes = require('./user-route')
const router = express.Router();

router.get('/info',AuthMiddleware.checkAuth, InfoController.info);
router.use('/user',userRoutes)
module.exports = router;