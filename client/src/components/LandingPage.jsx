import React from 'react';
import {Link} from 'react-router-dom';

import './LandingPage.css';



export default function LandingPage() {
    return (
        <div className='landing'>
          <h1>Henry Dogs</h1>
          <h6>By Giuliana Carrera</h6>
          
          <span >
          <Link to="/home">
              <button className='botonWelcome' >Welcome!</button></Link> 
              </span>
        </div>
      );
    };