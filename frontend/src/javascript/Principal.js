import React from "react";
import { Link } from "react-router-dom";

function Index() {
  const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
  const usuarioNombre = localStorage.getItem("usuarioNombre");

  const cerrarSesion = () => {
    localStorage.removeItem("sesionIniciada");
    localStorage.removeItem("usuarioNombre");
    window.location.reload();
  };

  return (
    <div>
      <header>


      <div className="hola"> 
      <h1>Página principal</h1>

      </div>

      {sesionActiva ? (
        <div className="nose">
          <p>Bienvenido, {usuarioNombre}</p>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <Link to="/sesion">Iniciar sesión</Link>
          <Link to="/registrar" style={{ marginLeft: '10px' }}>Registrar</Link>
        </div>
        )}
      </header>
      
      
      <p> </p>
      
      
      <Link to="/ejemplo"> Ejemplo </Link>

    </div>
  );
}

export default Index;
