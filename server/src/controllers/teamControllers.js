const {Team}= require('../db');
const axios= require('axios');

const URL= 'http://localhost:5000/drivers' ;
let cacheTeams= null;

const getAllTeamsCtrl = async() => {

    if(cacheTeams!==null) return cacheTeams;

    const {data} = await axios.get(URL);

    const allTeams =  await data
    ?.flatMap(driver => driver.teams && driver.teams.includes(',') ? driver.teams.split(',').map(team => team.trim()) : driver.teams ? driver.teams.trim() : [])
    ?.filter((team,index,self) => index === self.findIndex( t => t === team ))

    const dbTeams = await Team.bulkCreate(
        allTeams?.map( (team) => ({name:team})),{ ignoreDuplicates:true }
    );
    cacheTeams=dbTeams;
     return dbTeams;
}
module.exports={getAllTeamsCtrl}