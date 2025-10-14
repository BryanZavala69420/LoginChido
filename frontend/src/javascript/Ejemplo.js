import React from "react";
import { Link } from "react-router";
import faggot from '../imagenes/faggot.gif'


function Ejemplo() {
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioNombre = localStorage.getItem("usuarioNombre");





    return (
        <div>
            <div className="hola">
                <h1> Hola mundo </h1>

            </div>
            {sesionActiva ? (
                <div>
                    <p> Lorem Ipsum a: {usuarioNombre}  </p>
                <img src={faggot} alt="Fag" width="600" />


                </div>

            ) : (
                <div>
                    <p> Inicia sesion we un paro </p>
                    <Link to="/sesion">Iniciar sesión</Link>

                </div>

            )}

            <Link to="/"> Regresar </Link>
        </div>
    );
}

export default Ejemplo;
