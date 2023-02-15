import Swal from "sweetalert2";


import { GET_DOG_BY_NAME,
         ORDER_DOG_BY,
         ORDER_BY_WEIGHT, 
         GET_ALL_DOGS, 
         GET_TEMPERAMENTS, 
         FILTER_BY_TEMPERAMENTS, 
         FILTER_CREATED,
         POST_DOG,
         GET_DOG_BY_ID,
         CLEAR_CARD_DETALLE } from "../actions";

const initialState= {
  dogs: [],
  temperaments: [],
  allDogs: [], 
  unDog: {}
}



function rootReducer (state = initialState, action){
  switch(action.type) {
         
    
    case GET_ALL_DOGS:
          return {
              ...state,
              dogs: action.payload,
              allDogs: action.payload// uno lo manipulo y el otro queda original
          }
            
    case GET_DOG_BY_NAME:
            if(typeof action.payload !== 'object'){
            // alert(action.payload)
            Swal.fire({
              title:"Dog not found!",
              text:'The dog you were looking for does not exist',
              icon:'warning',
              timer: 3000
          })
          }
            let dogEncontrado = typeof action.payload === 'object'? action.payload : state.allDogs
            return  {
                ...state,
                dogs: dogEncontrado, //va en array dogs porque es el que va a renderizar,siempre voy a trabajar con el array que va a renderizar para hecer este tipo de filtrados
            }

    case GET_DOG_BY_ID:
          return {
            ...state,
            unDog: action.payload
          }



    case GET_TEMPERAMENTS: //hago un array nuevo para el estado temperam
        return {
              ...state,
              temperaments: action.payload
          }

    case FILTER_BY_TEMPERAMENTS:
            const allDogs = [...state.allDogs];
          //  console.log("somos los perros!", allDogs)
     // const temper= allDogs.map(d=>d.temperament)
            const temperFilter = action.payload === 'all' ? allDogs : 
            allDogs.filter(d => d.tempers?.find(t => t.name === action.payload || t === action.payload))//a 
           // console.log("hola!somos los temperamentos", temperFilter);
        return {
            ...state, 
            dogs: temperFilter
      }

    case FILTER_CREATED:
        const dogsFilter = action.payload === 'db' ? state.allDogs.filter(el => el.createInDb) :
        state.allDogs.filter(el=> !el.createInDb)
      //  console.log("somos todos los perrors api y db",dogsFilter );
        return{
            ...state,
            dogs: action.payload === "all" ? state.allDogs : dogsFilter
        }
        
          
    case ORDER_DOG_BY:
           if ( action.payload ==="A to Z"){
               // console.log("ENTRE");
                const desordenados = state.dogs;

                desordenados.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
              });   
               return {
                ...state,
                dogs: desordenados  
              }
             // console.log("hola soy desordenado" ,desordenados); 
            }
              
              if (action.payload ==="Z to A"){
               // console.log("ENTRE");
                const desordenados = state.dogs;
                desordenados.sort((b, a) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
              });
              //console.log("hola soy desordenado" ,desordenados); 
              return {
                ...state,
                dogs: desordenados  
              }
            } break;
             
    case ORDER_BY_WEIGHT: 
             const pesoPerro = state.dogs;
             const sortDePeso = action.payload === "menos" ?
   
             pesoPerro.sort(function(a,b){
               return a.minWeight - b.minWeight;
             }) :
             pesoPerro.sort(function(a,b){
               return b.minWeight - a.minWeight;
             })
             return {
               ...state,
               dogs: sortDePeso,
             }



         /* if(action.payload === "menos"){
              const pesoPerros = state.dogs;
              pesoPerros.sort((a,b)=>{
                const fa = a.minWeight;
                const fb = b.minWeight;
                
                return fa - fb;

              })
            } else {
                const pesoPerros = state.dogs;
                pesoPerros.sort((a,b)=>{
                  const fa = a.minWeight;
                  const fb = b.minWeight;
                  
                  return fb - fa;
            } ) 
           
         } return {
                ...state,
                dogs: pesoPerros   ,
          }*/
       
    case POST_DOG: //hago un array nuevo para el estado temperam
          return {
                ...state
            }
     
            case CLEAR_CARD_DETALLE:
                      return {
                          ...state,
                              unDog: {}
                      }
      default:
          return (
              {...state}
              )
            }
      }

      
      export default rootReducer;