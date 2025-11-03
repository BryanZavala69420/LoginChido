import React from "react";
import { Link } from "react-router-dom";
import '../css/Principal.css';
import uas from '../imagenes/UAS-3.jpg'

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
        <div className="Cuerpo-principal">

          <p> Este es el body </p>


          <div className="imagen-uas">
            <img src={uas} alt="Logo UAS" />

          </div>
          <br />

          <Link to="/ejemplo"> Ejemplo </Link>
        </div>
      </main>


      <footer>
        <div className="footers">
          <p> Todos los derechos reservados a la clase de Fidel, viva Fidel </p>
        </div>


      </footer>

    </div>
  );
}

export default Index;
