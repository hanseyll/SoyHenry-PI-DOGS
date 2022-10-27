const axios = require('axios');
const {API_KEY} = process.env
const {Dog,Temperament} = require('../../db')
const getApiInfo = async () =>{
    
    try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const apiInfo = await apiUrl.data.map(e => {
            return{
                name: e.name,
                id: e.id,
                weight_min: parseInt(e.weight.imperial.split("-")[0]),
                weight_max: parseInt(e.weight.imperial.split("-")[1]),
                height_max: parseInt(e.height.imperial.split("-")[0]),
                height_min: parseInt(e.height.imperial.split("-")[1]),
                life_span: e.life_span,
                image: e.image.url,
                temperament: e.temperament,
            }
    
        })
        return apiInfo;
    } catch (error) {
        res.Status(404).send(error.message)
    }

     
        
    
        
   
}

const getDbInfo = async () =>{

    try {
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    } catch (error) {
        res.Status(404).send(error.message)
    }



}

const getAllDogs = async () => {
try {
    
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;

} catch (error) {
    res.Status(404).send(error.message)
}

 
}
module.exports = { getAllDogs,getDbInfo, getApiInfo };