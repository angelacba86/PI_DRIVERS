const {getAllDriversCtrl, getByNameCtrl,getDetailCtrl,postNewDriverCtrl}= require('../controllers/driverControllers')

//Handlers:
const getAllDriversHandler=  async (req,res)=>{
   const { name } = req.query;
 try {
    const response= name ? await getByNameCtrl(name) : await getAllDriversCtrl(); 

    res.status(200).json(response)
 } catch (error) {
    res.status(404).json({ error: error.message });
 }
}
const getDetailHandler= async(req,res)=>{
    const { id } = req.params;
    try {
        const response= await getDetailCtrl(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
const postDriverHandler= async(req,res)=>{
    const {name,surname,description,image,nationality,dob,teams} = req.body;
    try {
        const formInfo= await postNewDriverCtrl(name,surname,description,image,nationality,dob,teams);
        res.status(201).json(formInfo)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
module.exports={getAllDriversHandler, getDetailHandler,postDriverHandler}
