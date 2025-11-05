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


          <div className="titulo-principal">
            
            <h2> La UAS </h2> <br />

          </div>

            <div className="contenido"> 

           
          <div className="texto">


            <p> Participa el Rector Jesús Madueña en la Primera Reunión Nacional de Universidades e Instituciones de Educación Superior para la Transformación de México, encabezada por la Presidenta Claudia Sheinbaum
              El Rector de la Universidad Autónoma de Sinaloa (UAS), el doctor Jesús Madueña Molina, participó como invitado especial a la Primera Reunión Nacional de Universidades e Instituciones de Educación Superior para la Transformación de México, la cual fue encabezada por la Presidenta de la República, la doctora Claudia Sheinbaum Pardo, así como por el titular de la SEP, el maestro Mario Delgado Carrillo, rectores y directores, así como el secretario general de la ANUIES, Luis Armando González Placencia. </p>

          </div>


          <div className="imagen-uas">
            <img src={uas} alt="Logo UAS" class="UAS" />

          </div>
           </div>
          <br />

          <div className="ejemplito">
          <Link to="/ejemplo"> Ejemplo </Link>

          </div>
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
