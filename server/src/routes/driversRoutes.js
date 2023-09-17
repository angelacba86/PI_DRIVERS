const {Router} = require('express');
const driversRoutes= Router();
const {getAllDriversHandler,getDetailHandler,postDriverHandler}=require('../handlers/driverHandlers')

//Routes:

driversRoutes.get('/', getAllDriversHandler);
driversRoutes.get('/:id', getDetailHandler);
driversRoutes.post('/', postDriverHandler)

module.exports= driversRoutes;
