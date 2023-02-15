const  getApiInfo  = require ("./getApiInfo");
const  getDbInfo  = require ("./getDbInfo");



const getAllDogs = async () => {
    const infoDeApi = await getApiInfo();
    const infoDeDb = await getDbInfo();// concateno la info que me trae la api, con la de mi base de datos.
    const infoTotal = infoDeApi.concat(infoDeDb);
    
    return infoTotal;
    
};


module.exports = getAllDogs;