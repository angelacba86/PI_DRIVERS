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
    image: driver.image?.url ==="https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png" || !driver.image?.url ? "https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg":driver.image?.url,
    dob:driver.dob,
    origin:"Api",
    teams:driver.teams
  }))

  const drivers = await Driver.findAll({ include: Team });
  const driversWithTeams = drivers.map(driver => {
    return {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      image: driver.image,
      dob: driver.dob,
      origin: driver.origin,
      teams: driver.Teams.map((team) => team.name).join(', ')
}});

  const getAllDrivers=[...getDriversApi, ...driversWithTeams]
  return getAllDrivers
}
///---search drivers by name ---///
const getByNameCtrl= async(name)=>{
  const nameToSearch= await name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const {data}=await axios.get(`${URL_NAME}${nameToSearch}`)
  const getbyNameApi=data.map(driver=>({
    id:driver.id,
    name:driver.name?.forename,
    surname: driver.name?.surname,
    image: driver.image?.url ==="https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png" || !driver.image?.url ? "https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg":driver.image?.url,
    teams:driver.teams,
    dob:driver.dob,
    origin:"Api"
  }))
  const getInfoDb= await Driver.findAll({
    include:{
        model:Team,
        attributes:['name']},
        where:{
            name:{[Op.iLike]: `${name}`}
        }
    })

    const getByNameDb= getInfoDb.map(driver=>{
       return{
        id: driver.id,
        name: driver.name,
        surname: driver.surname,
        image: driver.image,
        dob: driver.dob,
        origin: driver.origin,
        teams: driver.Teams.map((team) => team.name).join(', ')
       }
    })

  
const allByNames= [...getbyNameApi,...getByNameDb]

if( allByNames.length > 15 ) return allByNames.slice(0,14)
else return allByNames
};

///---get Details by id ---///
const getDetailCtrl=async(id)=>{
    if(isNaN(id)){
        const idDb= await Driver.findOne({
          where:{id:id},
          include:{model:Team,
            attributes:['name']}
          });
      const idDbInfo = {
        id: idDb.id,
        name: idDb.name,
        surname: idDb.surname,
        image: idDb.image,
        nationality: idDb.nationality,
        description: idDb.description,
        dob: idDb.dob,
        teams: idDb.Teams.map((team) => team.name).join(', '),
        origin: idDb.origin
      }
    
        return idDbInfo; 
    }else{
      const {data}= await axios.get(URL);
      const idApiInfo= data?.find(driver=>driver.id===parseInt(id))
      const idApi= {    
        id:idApiInfo.id,
        name:idApiInfo.name?.forename,
        surname: idApiInfo.name?.surname,
        image:idApiInfo.image?.url === "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"|| !idApiInfo.image?.url ? "https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg": idApiInfo.image?.url,
        nationality: idApiInfo.nationality,
        description: idApiInfo.description,
        dob:idApiInfo.dob,
        teams:idApiInfo.teams,
        origin:"Api"}
      return idApi;
    }
}
///---post a new Driver ---///

const postNewDriverCtrl= async (name,surname,description,image,nationality,dob,teams)=>{
   const allDrivers = await getAllDriversCtrl();
   if(!name||!surname||!description||!nationality||!dob||!Array.isArray(teams)||teams.length===0){
    throw new Error('You must fill out all the mandatory fields')
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