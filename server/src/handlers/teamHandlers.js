const {getAllTeamsCtrl}=require('../controllers/teamControllers')

//Handlers:

const getTeamsHandler=  async (req,res)=>{
 
 try {
   const response = await getAllTeamsCtrl()
    res.status(200).json(response)
 } catch (error) {
    res.status(404).json({error:error.message})
 }
}

module.exports={getTeamsHandler}