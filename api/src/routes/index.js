const { Router } = require('express');
const axios = require('axios');
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog,Temperament} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        res.status(404).send(error)
        
    }
   
}

const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get('/dogs', async (req,res) =>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? 
        res.status(200).send(dogName) :
        res.status(404).send("Doesnt exist this dog");

    }else{
        res.status(200).send(dogsTotal)
    }
})

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id
    const AllDogs = await getAllDogs();
    if (id) {
        let dogId = await AllDogs.filter(e => e.id == id);
        dogId.length ?
            res.status(200).send(dogId) :
            res.status(404).send('No se encontro el id')
      
    } else {
        res.status(200).send(AllDogs)
    }
});


router.get('/temperaments', async (req, res) => {
    try{
        const everyDog = await getAllDogs();
        const temperament = [
            ...new Set(
                everyDog.map((e) => e.temperament).join().split(',').sort()
            )
        ]
        for(i = 1; i < temperament.length; i++){
            const temp = temperament[i].replace(" ", "");
            Temperament.findOrCreate({
                where:{
                    name: temp
                }
            })
        }
        const allTemperament = await Temperament.findAll();
        res.send(allTemperament);
    }catch(err){
        console.log(err);
    }
})

router.post('/dogs', async (req,res) =>{
    let {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        createdInDB,
        temperament,
        
    } = req.body;

    let dogCreated = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        createdInDB,
    })

    let temperamentDb = await Temperament.findAll({
        where: {name: temperament}
    })

    dogCreated.addTemperament(temperamentDb)
    res.send('dog created succesfully')

})




module.exports = router;

