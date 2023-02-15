import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';
export const ORDER_DOG_BY = 'ORDER_DOG_BY';
export const FILTER_BY_TEMPERAMENTS= ' FILTER_BY_TEMPERAMENTS';
export const GET_TEMPERAMENTS ='GET_TEMPERAMENTS';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const FILTER_CREATED = 'FILTER_CREATED'
export const POST_DOG = 'POST_DOG';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID'
export const CLEAR_CARD_DETALLE = 'CLEAR_CARD_DETALLE';


export function getAllDogs(name) {
    return async function(dispatch){
        if(name){
            const dogByName= await axios.get('http://localhost:3001/dogs?name=' + name );
        return dispatch({
            type: GET_DOG_BY_NAME,
            payload: dogByName.data
        })
        }
        const dogs= await axios.get('http://localhost:3001/dogs');
       
        return dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        })
    }
}

export function getDogById(dogId){
    return async function(dispatch){
            const dogById= await axios.get('http://localhost:3001/dogs/' + dogId);
            //console.log("ididid", typeof (dogId), dogId);
            //console.log("HOLA SOY TU DATA DE ID!", dogById.data);
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: dogById.data
        })
    }
}


export function getTemperaments(){
    return async function (dispatch){
            const temperaments = await axios.get('http://localhost:3001/temper');
                //  console.log("tus temperamentos",temperaments);
   
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments.data
            })
        }
    }

export function filterByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }
}
export function orderDogBy(payload){
    return {  
        type: ORDER_DOG_BY,
        payload
    }

}
export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}
export function postDog(payload){
    return async function(dispatch) {
        const post = await axios.post("http://localhost:3001/dogs", payload)
      //  console.log(post);
        return dispatch ({
            type: POST_DOG,
            payload: post
        })
        
    }

}
export function clearCardDetalle(){
    return {
        type:CLEAR_CARD_DETALLE
    }
}