import React, { useEffect } from "react";
import { getDogById } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CardsDetalleId.css";
import "./Home.css";
import loading from '../images/loading.gif';




 export default function CardsDetalleId(props) { 
  const dispatch = useDispatch();

  const unPerro = useSelector((state)=>state.unDog);
 
  //console.log("hola soy props", props);
  useEffect(()=>{
    dispatch(getDogById(props.dogId))
  },[dispatch, props.dogId]);// cuando tenga algo y no este vacio
  //console.log("props detalledogs", unPerro);
  if (Object.keys(unPerro).length) {
  return (
  
    <div className='cards'>
  
    <div className='tarjTodo'>
        <div className='tarjDogs'>
            
        <div className='fonTitulo'>
        
        <Link to='/home'>
          <div className="botonCierre">
                        <button  className= "buttonX" > 
                            <strong>X</strong>
                        </button>
                        </div>
                    </Link>
        <h1 className='titulos'>{unPerro.name}</h1>

        </div>
        <div>
        <img className='imgDogs' src={unPerro.image} alt={unPerro.name}/>
        <article className="cuerpo">
        <h3 className='peso'>Weight:</h3> 
        <h3 className='peso'> Min: {unPerro.minWeight}kg - Max: {unPerro.maxWeight}kg</h3>
        <h3 className='peso'>Heigth:</h3> 
        <h3 className='peso'> Min: {unPerro.minHeight}kg - Max: {unPerro.maxHeight}kg</h3>
        <h3 className='peso'>Life Span:</h3> 
        <h3 className='peso'> Min: {unPerro.minLifeSpan} years - Max: {unPerro.maxLifeSpan} years</h3>
        <h3 className='tituloTemper'>Temperaments:</h3>
        <h3 className='temper'>{unPerro.tempers && typeof unPerro.tempers[0] === 'object'? unPerro.tempers?.map(t=>(t.name + ', ')):unPerro.tempers?.join(', ')}</h3>
        </article>
        </div>
 </div>
 </div>
        
 </div>
  
 )
} else {
  return (
    <img className="cargando" src={loading} alt="Cargando"/>
  )
}
 }
