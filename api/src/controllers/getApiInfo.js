const axios = require ("axios");
const { Dog, Temper } = require ("../db");
const { APIKEY }  = process.env;



const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=live_ sznkwFaxybGphd3XaWUPXQ9DYJh3Oa cgOMf81AYiq8uig9xBNZcae7ZXWdVv aZSF`);
    const apiInfo = await apiUrl.data.map((ele) => {

        let temperArray = [];

       
        if (ele.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
            temperArray = ele.temperament.split(", ");
       }
        let objArray=[];
        for( let i = 0; i < temperArray.length; i++ ){
            //console.log(temperArray[i]);
            objArray.push({
                name: temperArray[i]
            })
        }
        
        const weightDog = ele.weight.metric.split("-"); // con .split separamos el array
        let maxweightDog = ""; let minweightDog = ""; 
       
        if(weightDog && weightDog.length > 0 ){ // hay peso? hay peso mayor a 0?
            minweightDog = weightDog[0].trim();    //si? guardalo en mi variable y quitale los espacios.
        };
        if(weightDog && weightDog.length > 1 ){
            maxweightDog = weightDog[1].trim();
        };
        //console.log(weightDog);

        const heightDog = ele.height.metric.split("-");// altura
        let maxHeightDog = ""; let minHeightDog = "";

        if(heightDog && heightDog.length > 0){
            minHeightDog = heightDog[0].trim();
        }
        if(heightDog && heightDog.length > 1){
            maxHeightDog = heightDog[1].trim();
        }
        //console.log(heightDog);
        const lifeSpanDog = ele.life_span.split("-"); // promedio de vida
        let maxLifeSpanDog = ""; let minLifeSpanDog = "";

        if(lifeSpanDog && lifeSpanDog.length > 0){
            minLifeSpanDog = lifeSpanDog[0].trim();
        }
        if(lifeSpanDog && lifeSpanDog.length > 1){
          let auxMaxLifeSpanDog = lifeSpanDog[1].split(" ");
            maxLifeSpanDog = auxMaxLifeSpanDog[1];
        }
        return {
            id: ele.id,
            name: ele.name,
            minWeight: minweightDog,
            maxWeight: maxweightDog,
            minHeight: minHeightDog,
            maxHeight: maxHeightDog,
            minLifeSpan: minLifeSpanDog ,
            maxLifeSpan: maxLifeSpanDog ,
            tempers: objArray, 
            image: ele.image.url,
        };
    });
    return apiInfo
};

module.exports = getApiInfo; 