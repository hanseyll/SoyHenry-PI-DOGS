const {Router} = require('express');
const {getAllDogs} = require('./helpers/index');
const {Dog,Temperament} = require('../db')
const router = Router();

router.get('/', async (req,res) =>{
    try {
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
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message)
    }
    
})

router.get('/:id', async (req, res) => {
    try {
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
        
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message)
        
    }
    
});


router.post('/', async (req,res) =>{
    try {
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
        
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message)
    }
    

})
router.delete("/:name", async (req, res) => {
   
    try {
        const { name } = req.params;
      await Dog.destroy({
        where: { name: name },
      });
      res.json(`Breed ${name} has been deleted sucessfully`);
    } catch (err) {
      console.error(err + 'errorcito');
      res.status(404).send(err.message);
    }
  });


  module.exports = router;