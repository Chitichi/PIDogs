const { Router } = require('express');
const  getAllDogs  = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogById');
const postDog = require ('../controllers/postDog');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', async(req,res) => { //  acordate pelotuda que la barra es y viene de DOGS!
    const name = req.query.name;
   const allDogs = await getAllDogs();
   
    if(name) {
        const dogsName = await allDogs.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))

        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(200).send("Dog not found") // porque no quiero que se muestre como error

    }else{
        res.status(200).send(allDogs)
    }
});

router.get("/:idDog", async (req, res) => {// idDog lo defino yo, defino la variable que voy a recibir por params.
    const { idDog } = req.params;
   // console.log("carajo, mierda:", idDog);
   const resp = await getDogById(idDog);//invoco a mi funcion, pasandole un id, si obtengo respuesta la devuelvo y si no devuelvo un mensaje.
   if(resp) {
       res.send(resp)
   } else {
    res.send("Id not found")
   };
});

router.post("/", async (req, res) => {
    const newDog  = req.body;
//  console.log("hola soy el body" , newDog);
  const resp = await postDog(newDog);
    if(resp) {
        res.status(200).send("Dog created succesfully!")
    } else {
        res.send("Dog not created")
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
