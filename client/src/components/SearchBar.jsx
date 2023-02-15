import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getAllDogs } from '../Redux/actions';
import './SearchBar.css'

export default function SearchBar({setPagActual}){
    const dispatch = useDispatch()
    const [name, setName] = useState("");//vamos a hacer un estado local,
    //console.log("hola soy el nombre de search", name);
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)//este es el value del imput, aqui esta funcion el value del imput va a tomar el value del usestate
        //esta funcion se la paso al input
    }

    function handleSubmit(e){//ls funcion para manejar el boton del submit,
        e.preventDefault();
        dispatch(getAllDogs(name))
        //este name va a ser mi estado local,yo voy a ir guardando lo que escriba el usuario en mi estado local name
        setPagActual(1);
        setName('')
    }
  
        return (
        <div className='search'>
        <input  className='input' 
                type="text" 
                autoComplete="off"
                onChange={(e) => handleInputChange(e) }
                value={name}/>
       
        <button className='botonSearch' 
                type="submit"
                onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
        )
    } 

