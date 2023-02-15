const axios = require ("axios");
const { Temper } = require ("../db")
const { Router } = require('express');

const router = Router();

router.get("/", async (req,res) => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=live_ sznkwFaxybGphd3XaWUPXQ9DYJh3Oa cgOMf81AYiq8uig9xBNZcae7ZXWdVv aZSF`);// llamo toda la info de la api
    const allTemper = await apiUrl.data.map(ele => ele.temperament);// me guardo solo los temperamentos vienen como string
    const temp = allTemper.toString().split(",");
    let noSpaces= [];
    //console.log(temp.length); 
    for (let i=0; i < temp.length; i++){
        if(!noSpaces.some(ele => ele === temp[i].trim()) && temp[i].length > 0){// filtramos los temperamentos para que no se repitan  y le quitamos los espacios! <3
          //  console.log("hola");
            noSpaces.push(temp[i].trim())
        }
    };
   // console.log(noSpaces.length);
    noSpaces.forEach(ele => {
        let i = ele.trim()
        Temper.findOrCreate({
             where: { name: i }
        })
    })
    const allTemp = await Temper.findAll();    
   // console.log(allTemp);
    res.send(allTemp);
});


module.exports = router;