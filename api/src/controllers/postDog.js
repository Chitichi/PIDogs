const { Dog, Temper } = require ('../db');


const postDog = async (newDog) => {
  
    const {
        name,
        minWeight,
        maxWeight,
        minHeight,
        maxHeight,
        minLifeSpan,
        maxLifeSpan,
        image,
        temperaments
    } = newDog;
    //console.log("hola", newDog);  
    let dogs = await Dog.create({
        name,
        minWeight,
        maxWeight,
        minHeight,
        maxHeight,
        minLifeSpan,
        maxLifeSpan,
        image 
    }); 
   // console.log("hola somos tus perros", dogs);
    let associatedTemp = await Temper.findAll({ 
        where: { name: temperaments },
    });
dogs.addTemper(associatedTemp); //sequelize creo automaticamente el metodo addtemper.
  return dogs;

} ;

module.exports = postDog;

