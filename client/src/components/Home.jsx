import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Dogs from "./Dogs";
import {    orderDogBy, 
            clearCardDetalle,
            getAllDogs,  
            filterByTemperament, 
            orderByWeight, 
            filterCreated, 
            getTemperaments } from "../Redux/actions";
import './Home.css';
import './Dogs.css';
import loading from '../images/loading.gif';

export default function Home() {
    const allDogs = useSelector((state) => state.dogs) // guardamos los perritos en el estado global y en nuestra constante local
    const allTemperaments = useSelector((state) => state.temperaments);
   // console.log("hola soy tu console log:", allDogs );
   const dispatch = useDispatch();// le asignamos a una constante local el hooks / despachamos la accion / es lo mismo que hacer mapstatetoprops
   const [pagActual, setPagActual] = useState(1); // nos creamos un estado local <3, empieza en uno por que empieza por la primera pagina.
   const [dogsPorPag, /*setdogsPorPag*/] = useState(8);// 8 perritos por pagina, nuevo estado local.
   const indiceUltimoPerro = pagActual * dogsPorPag; // esto va a ser 8! porque? porque nos acordamos que empezamos a contar desde el indice 0!
   const indicePrimerPerro = indiceUltimoPerro - dogsPorPag;// 0
   const perrosActual = allDogs.slice(indicePrimerPerro, indiceUltimoPerro) // agarramos nuestro arreglo de todo, y lo dividimos con slice
   const [/*_orden*/, setOrden] = useState(''); 
    //console.log("hola", perrosActual);

   const paginado = (pagNumero) => {
    
    setPagActual(pagNumero)
   
    
   }
      
   useEffect(() => { // me sirve para renderizar cuando monto el componente o cuando hay algun cambio en alguna de las variables de dependencia. 
    dispatch(getAllDogs())
    dispatch(getTemperaments())
    dispatch(clearCardDetalle())

    //dispatch(getDogByName()) // ejecutar solo cuando monte el componente/ o cuando otra variable cambie.eje:dispatch
  },[dispatch]) //arreglo
 

  function handleClick(event) { //al boton refresh le paso una funcion,para manejar el boton
    event.preventDefault();//lo que hace es ,le paso un evento, . Es para que no se me recargue la pág
    dispatch(getAllDogs())//me lo resetea, y me vuelve a cargar los dogs
    setPagActual(1);
}


  function handleFilterTemperaments(event) {//un handle del filter del temperam, siempre poner nombre acorde
    event.preventDefault(event);
    dispatch(filterByTemperament(event.target.value))
    setOrden(event.target.value);
    setPagActual(1)
}


function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPagActual(1);
    setOrden(`Ordenado ${e.target.value}`);
}

function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value)) // recordemos que esto es lo que viene del select, que en la action es el payload. 
    setPagActual(1)
}

    const orderHandler = (event) => {
        event.preventDefault();
        dispatch(orderDogBy(event.target.value))
        setPagActual(1)
        setOrden(event.target.value)
      //  console.log("valor event:" , event.target.value);
       

        if(event.target.value === "A to Z"){
            dispatch(orderDogBy("A to Z"))
           // console.log("ORDENO AZ");
        }
        if(event.target.value === "Z to A"){
            dispatch(orderDogBy("Z to A"))
           // console.log("ORDENO ZA");
        }
    }
    
    if (allDogs.length) {
        
    return (
     
       
        <div className="home">
         

        <div>
                <ul>
                  <li className="lista" >
                        <select   className='select' onChange={e => handleFilterCreated(e)} >
                            <option value="all">ALL DOGS</option> 
                            <option  value="api">API</option>
                            <option  value="db">DB</option>
                        </select>
                    </li>
 

                     <li   className="lista" >
                        <select className='select'  onChange={(e)=>orderHandler(e)} >
                            <option value='selected' disabled selected>ALPHABETICAL ORDER</option>
                            <option value='A to Z'>A - Z</option>
                            <option value='Z to A'>Z - A</option>
                        </select>
                    </li>


                    <li   className="lista">
                        <select className='select' onChange={e => handleOrderByWeight(e)}>
                            <option value='selected' disabled selected>ORDER BY WEIGTH</option>
                            <option value='menos'>From minor to major</option>
                            <option value='mas'>From major to minor</option>
                        </select>
                    </li>
                    <li   className="lista">
                        <select  className='select' defaultValue='selected' name='temperaments' onChange={e => handleFilterTemperaments(e)} >
                            <option  value='selected'  disabled selected>FILTER BY TEMPERAMENTS</option>
                            <option  value='all'>All</option>
                           {allTemperaments.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </li> 
                </ul>
                
                 <div>
            <SearchBar  setPagActual={setPagActual}
           />
                    <Link to='/form'>
                        <button className='boton' > 
                            <strong>CREATE DOG</strong>
                        </button>
                    </Link>
                    <button className='boton'  onClick={(e) => handleClick(e)}>
                        <strong>RESET</strong>
                    </button>
                </div>
                
              {<Paginado 
                
                dogsPorPag= {dogsPorPag}
                allDogs={allDogs.length}
                paginado={paginado}
                pagActual={pagActual}
                /> }

                                                                                                                                          

              {/*}  <Cards myDogs = {perrosActual}/>*/}
            <div className='dogsCards'>
              {perrosActual?.map(d => {
              //  console.log("hola", d.id);
                    return (
                        <div>
                        <Dogs
                        key={d.id}
                        id={d.id}
                        image={d.image}
                        name={d.name}
                        temperaments={d.tempers}
                        minWeight={d.minWeight}
                        maxWeight={d.maxWeight}
                         />
                </div>
                    )
                })}
    
      
            </div>
                  
             </div>     
  

    </div>
                  ) 
                
                }else {
                        return (
                       
                          <img className="cargando" src={loading} alt="Cargando" />
                     
                        )
                        }
                }