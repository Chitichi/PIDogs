import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog , getTemperaments } from '../Redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './Form.css';
import Swal from "sweetalert2";


const validacion=(input)=>{
    let errores={};
    if(!input.name) errores.name = 'Nombre requerido'//si no hay un input(el estado local)entonces en mi obj errors.name voy a poner un str de que se requiere un nombre
    if(input.name.length < 3 || input.name.length > 50) errores.name = 'El nombre debe contener de 3 a 50 caracteres';
    if(!/^[a-zA-Z\s]+$/.test(input.name)) errores.name = 'Nombre invalido, solo se permiten letras';

    if(!input.temperaments) errores.temperaments = 'Chosse a temperament'
    if(input.temperaments > 3) errores.temperaments = 'Solo puedes elegir 3 temperamentos';

    if(input.minWeight < 1   )errores.minWeight = 'Debe ser numero positivo';

    if(input.minWeight > 80 )errores.minWeight = 'El peso minimo debe ser menor a 80kg';

    if(input.minWeight > input.maxWeight)errores.minWeight = 'El valor minimo debe ser menor al maximo';

    if(input.maxWeight < 1 )errores.maxWeight = 'Debe ser igual o mayor a 1kg';

    if(input.maxWeight > 150)errores.maxWeight = 'El valor maximo debe ser inferior a 150kg';

    if(input.maxWeight < input.minWeight)errores.maxWeight = 'El valor maximo debe ser mayor al minimo';

    if(input.minHeight < 1 )errores.minHeight = 'Debe ser numero positivo';

    if(input.minHeight > 100)errores.minHeight='El valor minimo debe ser menor a 100cm';

    if(input.minHeight > input.maxHeight)errores.minHeight = 'El valor minimo debe ser menor al maximo';

    if(input.maxHeight < 1 )errores.maxHeight = 'Debe ser numero positivo';

    if(input.maxHeight > 150)errores.maxHeight='El valor maximo debe ser inferior a 150cm';

    if(input.maxHeight < input.minHeight)errores.maxHeight = 'El valor maximo debe ser mayor al minimo';

    if(input.minLifeSpan < 1) errores.minLifeSpan = 'Debe ser numero positivo ';

    if(input.maxLifeSpan < 1)errores.maxLifeSpan = 'Debe ser numero positivo';

    if(input.maxLifeSpan < input.minLifeSpan)errores.maxLifeSpan = 'El valor maximo debe ser mayor al minimo';
    


    return errores;
}


export default function Form(){
        const dispatch= useDispatch();
        const temp = useSelector((state)=> state.temperaments)
        const history = useHistory();
        const [errores, setErrores] = useState({name:""});
        const [botonOff, setBotonOff] = useState(true)
        const [input, setInput] = useState({
            name: "",
            minWeight: 0,
            maxWeight: 0,
            minHeight: 0,
            maxHeight: 0,
            minLifeSpan: 0,
            maxLifeSpan: 0,
            image:"",
            temperaments: [],
 
        })
        useEffect(()=>{
            dispatch(getTemperaments());

        }, [dispatch]);

        useEffect(()=>{
            if(Object.keys(errores).length === 0){
                setBotonOff(false)
            }
            else {
                setBotonOff(true)
            };
                console.log(errores);
        }, [errores]);



        function handleTempe(e){
            setInput({
                ...input,
                temperaments:input.temperaments.includes(e.target.value) ? input.temperaments : [...input.temperaments, e.target.value] 
            })
        }
        function handleChange(e){
            e.preventDefault();
            setInput({ 
                ...input, 
                [e.target.name]:e.target.value
            })
            setErrores(validacion({//primero hago de setear el input, y despues le digo seteame el estado errores pasandole la función validate y lo renderizo abajo en cada input,abajo de onchange(handlechange)en el caso de que suceda
                ...input,
                [e.target.name]: e.target.value
            }));
        }
        
       function handleSubmit(e){
            e.preventDefault()
            dispatch(postDog(input))//como payload le paso el input
            Swal.fire({
                title:"Perro Creado!",
                text:'Your user was created successfully!',
                icon:'success',
                timer: 3000
            })
            history.push('/home')//cuando termines de hacer todo esto, hace un history.push y llevame al home xq ya se creó el dog
            
            }
    
    function handleDelete(e){//busco el elemento(t) en el array que coincida y lo borro,
        e.preventDefault()
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t=>t !== e.target.id)
        })
    }




return (

        <div className="cajaGrande">
        <h1 className="titulo">Crea tu perro!</h1>
        <Link to="/home"><button>HOME</button></Link>
        <div className="carta"> 
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label className="texto">Nombre:</label>
                <input
                onChange={(e) => handleChange(e)}
                className="input-name"
                type= "text"
                placeholder='nombre...'
                value = {input.name}
                name = "name"
                />
                  {errores.name && (//pregunto si está errors.name y si está hago un parrafo con ese error(errors.name) 
                        <p className="error">{errores.name}</p>
                    )}
            </div>
            <div>
                    <label className="texto">Image</label>
                    <input
                    onChange={(e) => handleChange(e)}
                     className="input-name"
                    type= 'text'
                    placeholder="url..."
                    value= {input.image}
                    name= 'image'
                    />
                     {errores.image && (
                        <p className="error">{errores.image}</p>
                    )}
                </div>
                <div>
                    <label className="texto"> Min Height:</label>
                    <input
                    onChange={(e) => handleChange(e)}  
                    className="input-form"
                    type= 'number'
                    placeholder="min height ..."
                    value= {input.minHeight}
                    name= 'minHeight'
                    />
                     {errores.minHeight &&( 
                        <p className="error">{errores.minHeight}</p>
                    )}
                </div>
                <div >
                    <label className="texto">Max Height:</label>
                    <input  
                    onChange={(e) => handleChange(e)}
                    className="input-form"
                    type= 'number'
                    placeholder="max height..."
                    value= {input.maxHeight}
                    name= 'maxHeight'
                    />
                    {errores.maxHeight &&( 
                        <p className="error">{errores.maxHeight}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Min Weight:</label>
                    <input 
                    onChange={(e) => handleChange(e)}
                    className="input-form"
                    type= 'number'
                    placeholder="min weight..."
                    value= {input.minWeight}
                    name= 'minWeight'
                    />
                     {errores.minWeight &&( 
                        <p className="error">{errores.minWeight}</p>
                    )}
                    
                </div>
                <div>
                    <label className="texto">Max Weight:</label>
                    <input  
                    onChange={(e) => handleChange(e)}
                    className="input-form"
                    type= 'number'
                    placeholder="max weight..."
                    value= {input.maxWeight}
                    name= 'maxWeight'
                    />
                      {errores.maxWeight &&( 
                        <p className="error">{errores.maxWeight}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Min Life Span:</label>
                    <input 
                    onChange={(e) => handleChange(e)}
                    className="input-form"
                    type= 'number'
                    placeholder="min life span..."
                    value= {input.minLifeSpan}
                    name= 'minLifeSpan'
                    />
                     {errores.minLifeSpan &&( 
                        <p className="error">{errores.minLifeSpan}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Max Life Span:</label>
                    <input
                    onChange={(e) => handleChange(e)} 
                    className="input-form"
                    type= 'number'
                    placeholder="max life span..."
                    value= {input.maxLifeSpan}
                    name= 'maxLifeSpan'
                    />  
                    {errores.maxLifeSpan &&( 
                        <p className="error">{errores.maxLifeSpan}</p>
                    )}
                </div>
                <div>
                    <label className="temps-div">Temperaments </label>
                    <select onChange={(e)=>handleTempe(e)} className="select-form">
                        {temp?.map((t)=>(<option value={t.name}>{t.name}</option>)//tengo que acceder al nombre, con el value, y en lo que renderizo le paso lo mismo t.name, entonces voy a la pagina y ya tengo todos los temperam
                        )}
                    </select>
                      
                    <ul>
                        {input.temperaments.map(t=>(//mi estado local que va a tener todos los temperam que vaya guardando,lo mapeo(siempre que haga un map tengo que hacer un div abajo)
                            //renderizame una lista con el elemento(t) y además un botón que cuando yo le haga click me ejecute la funcion handledelete
                            <li className="x-button" key={t}> {t + " "} 
                            <button 
                            onClick={(e)=>handleDelete(e)}
                            className= "button"
                             id={t} 
                             type='button'
                            >X </button>
                            </li>
                        ))}
                        {errores.temperaments &&( 
                          <p className="error">{errores.temperaments}</p>
                      )}
                    </ul>
                    <div className="submit-form">
                        <button
                         className="submit-button"
                         type='submit'
                         disabled={botonOff}
                         >Crear Perro</button>
                    </div>
                    </div>
        </form>
        </div>
       </div>
    )
}