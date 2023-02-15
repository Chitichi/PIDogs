import React from "react";

import "./Paginado.css"

export default function Paginado ({dogsPorPag, allDogs, pagActual, paginado}){
    const pagNumero = [];
 
    for(let i=1; i<=Math.ceil(allDogs/dogsPorPag); i++){// el math ceil redondea hacia arriba, en este caso redondea todos los perros por la cantidad de peerros que quiero por pagina
        pagNumero.push(i)
        //console.log(pagNumero);
      }
      return(
        <nav className='paginado'>
         
     <div className='flechas-container-izquierda'>
         {
              pagActual > 1 ? <button className='flechas' onClick={()=>paginado(pagActual - 1)}> ❮ </button>:
              <button className='flechas' disabled> ❮ </button>
            }
            </div>
            <div  className='paginado'>
           { 
            pagNumero?.map((num) => (
            <span key={num} >
              <button className='number' onClick={()=>paginado(num)} ><strong>{num}</strong></button>
            </span>
  ))}
  </div>
              
              
            <div className='flechas-container-derecha'>
             {
              pagActual <  pagNumero.length ? <button className='flechas' onClick={()=>paginado(pagActual + 1)}> ❯ </button>:
              <button className='flechas' disabled> ❯ </button>
            }
          </div> 


            
        
        </nav>
    )
    }