const axios = require ("axios");
const { Dog, Temper } = require ("../db");
const { APIKEY }  = process.env;



const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temper,// en esta funcion nos traemos la informacion de nuestra base de datos.
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

module.exports = getDbInfo;