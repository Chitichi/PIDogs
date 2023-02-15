import React from 'react';
import { Link } from 'react-router-dom';
import './Dogs.css';

export default function Dogs(props){
  // console.log("mis props:", props);
   
    return (
              <Link to={`/dogs/${props.id}`}> 
      <div className='dogsCards'>
        <div className='tarjDogTodo'>
            <div className='tarjDog'>
                
            <div className='fondoTitulo'>
            <h1 className='titulo'>{props.name}</h1>
            </div>
            <img className='imgDog' src={props.image} alt={props.name}/>
            <article className="article">
            <h3 className='weight'>Weight:</h3> 
            <h3 className='weight'> Min: {props.minWeight}kg - Max: {props.maxWeight}kg</h3>
            <h3 className='tituloTemps'>Temperaments:</h3>
            <h3 className='temps'>{props.temperaments && typeof props.temperaments[0] === 'object'? props.temperaments?.map(t=>(t.name + ', ')):props.temperaments?.join(', ')}</h3>
              <button className='buttonDetail' >Detail</button>
            </article>
    </div>
    </div>
    </div>
            </Link>
    )
}