const {Router}=require('express');
const teamRoutes=Router();
const {getTeamsHandler}=require('../handlers/teamHandlers')

//Route:

teamRoutes.get('/',getTeamsHandler);
module.exports=teamRoutes;