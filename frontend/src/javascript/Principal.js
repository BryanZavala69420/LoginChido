import React from "react";
import { Link } from "react-router-dom";
import '../css/Principal.css';


function Index() {
  const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
  const usuarioNombre = localStorage.getItem("usuarioNombre");

  const cerrarSesion = () => {
    localStorage.removeItem("sesionIniciada");
    localStorage.removeItem("usuarioNombre");
    window.location.reload();
  };

  return (

    <div className="todo">

      <div className="cabezal">


        <header>


          <div className="hola">
            <h1>Página principal</h1>

          </div>

          <nav id="nav-list">


            {sesionActiva ? (
              <div className="nose">
                <p>Bienvenido, {usuarioNombre}</p>
                <div className="boton">
                  <button onClick={cerrarSesion}>Cerrar sesión</button>


                </div>

              </div>
            ) : (
              
              <div className="Link">

                <ul className="Link">
                  <li><Link to="/sesion">Iniciar sesión</Link></li>
                  <li><Link to="/registrar">Registrar</Link></li>
                </ul>

              </div>
            )}
          </nav>
        </header>
      </div>





      <main>

        <p> Este es el body </p>


        <Link to="/ejemplo"> Ejemplo </Link>
      </main>


    </div>
  );
}

export default Index;
