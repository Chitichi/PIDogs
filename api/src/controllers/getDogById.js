
const getAllDogs = require("./getAllDogs");


const getDogById = async (dogId) => {// variable que llega del cosmos
try {

    const res = await getAllDogs() // esperamos a la funcion
   // console.log("hola ....", typeof (res[0].id));
    //let numberId = parseInt(dogId) // parseInt nos convierte letras a numeros(?)
    const dogForId = res.find((ele) => ele.id.toString() === dogId)// buscamos que el id que recibimos por params coincida con algun id de los perros,tanto de la base de datos como de la api
    //console.log("QUIERE MAS TEXTO:", dogForId);
    //console.log(typeof(dogId));
    return dogForId
}
catch (error) {
    throw new Error (error.message)// manejamos cualquier tipo de error que pueda llegar a surgir.

}
};

module.exports = getDogById

