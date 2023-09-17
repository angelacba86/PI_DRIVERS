const {Driver, Team}= require('../db');
const axios= require('axios');
const {Op} = require('sequelize');

const URL= 'http://localhost:5000/drivers' ;
const URL_NAME= 'http://localhost:5000/drivers?name.forename='

///---get all drivers---///
const getAllDriversCtrl=async()=>{
  const driverAxioData= (await axios.get(URL)).data;
  const getDriversApi= driverAxioData?.map(driver=>({
    id:driver.id,
    name:driver.name?.forename,
    surname: driver.name?.surname,
    image:driver.image?.url ? driver.image?.url:"https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg",
    teams:driver.teams,
    origin:"Api"
  }))

 
  const drivers = await Driver.findAll({ include: Team });
  const driversWithTeams = drivers.map(driver => {
    driver.dataValues.Teams = driver.Teams.map(team => team.name).join(', ');
    return driver;
  });


  const getAllDrivers=[...getDriversApi, ...driversWithTeams]
  return getAllDrivers
}
///---search drivers by name ---///
const getByNameCtrl= async(name)=>{
  const nameToSearch= await name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const getByNameApi=(await axios.get(`${URL_NAME}${nameToSearch}`)).data
  
  const getInfoDb= await Driver.findAll({
    include:{
        model:Team,
        attributes:['name']},
        where:{
            name:{[Op.iLike]: `${name}`}
        }
    })

    const getByNameDb= getInfoDb.map(driver=>{
      driver.dataValues.Teams = driver.Teams.map(team=> team.name).join(', ')
      return driver
    })

  
const allByNames= [...getByNameApi,...getByNameDb]

if( allByNames.length > 15 ) return allByNames.slice(0,14)
else if(allByNames.length===0) return 'There are no matches for your search request'
else return allByNames
};

///---get Details by id ---///
const getDetailCtrl=async(id)=>{
    if(isNaN(id)){
        const idDbInfo= await Driver.findOne({
          where:{id:id},
          include:{model:Team,
            attributes:['name']}
          });
      idDbInfo.dataValues.Teams = await idDbInfo.Teams?.map(team=>team.name).join(', ')
    
        return idDbInfo; 
    }else{
      const {data}= await axios.get(URL);
      const idApi= data?.find(driver=>driver.id===parseInt(id))
      console.log(idApi)
      return idApi;
    }
}
///---post a new Driver ---///

const postNewDriverCtrl= async (name,surname,description,image,nationality,dob,teams)=>{
   const allDrivers = await getAllDriversCtrl();
   if(!name||!surname||!description||!nationality||!dob||!teams){
    throw new Error('You must fill all the fields')
   }else if (allDrivers.find(driver=> driver.name===name && driver.surname===surname)){
    throw new Error('This driver already existed')}
    else {
      const newDriver= await Driver.create({
      name,surname,description,image,nationality,dob
  }) 
  // ------------------------------------------------------------------------------------------//
const teamsNames= teams.includes(',') ? teams.split(',').map(t=>t.trim()): [teams]
  teamsNames.forEach(async team=>{ 
  let relatedTeams= await Team.findAll({where:{name:team}})
  await newDriver.addTeams(relatedTeams)
}) 
;
return newDriver;
}
}
module.exports={getAllDriversCtrl,getByNameCtrl,getDetailCtrl,postNewDriverCtrl}