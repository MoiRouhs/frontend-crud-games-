import React from 'react';
import { Link } from 'react-router-dom';
import "./GameManagement.css"

const GameManagement = () => {
  return (
    <div className='contenedor'>
        <div className='titulo'>
          <h1>Gestion de juegos</h1>
        </div>

        <div className='contenedor-cuerpo'>

          <div className='imagen1'>
            <p>imagen1</p>
          </div>


          <div className='botones'>
          
              <Link to="/allgames" className="boton">Listar juegos</Link>
              <br />
              <Link to="/addgame" className="boton">Crear un juego</Link>
              <br />

          </div>

          

          <div className='imagen2'>
            <p>imagen2</p>
          </div>


        </div>
    </div>
  );
}

export default GameManagement;
