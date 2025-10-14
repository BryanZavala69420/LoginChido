import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de usar 'react-router-dom', no 'react-router'
import faggot from '../imagenes/faggot.gif';

function Ejemplo() {
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioRol = localStorage.getItem("usuarioRol");

    return (
        <div>
            <div className="hola">
                <h1>Hola mundo</h1>
            </div>
                
           {sesionActiva ? ( //esto ha de cuentas que es un if, si la sesion esta activa va y checa el rol del usuario
                usuarioRol === "2" ? (  // Si el rol es del admin, en la base de datos deberia ser 1, o 2, la neta luego lo cambio
                    <div>
                        <p>Bienvenido, {usuarioNombre}! Eres un Administrador.</p>
                        <img src={faggot} alt="Fag" width="600" />
                    </div>
                ) : ( //ya checo si la sesion esta activa, pero como no encontro que el rol es 1, o 2, la neta no me acuerdo, entonces pasa al usuario normal , este es un if anidado ha de cuentas
                    <div>
                        <p>Bienvenido, {usuarioNombre}! Eres un usuario normal.</p>
                    </div>
                )

            ) : ( //else, si la sesion no esta activa, entonces nos manda para que la iniciemos, jajkasjdksdkj
                <div>
                    <p>Inicia sesión para acceder a esta página.</p>
                    <Link to="/sesion">Iniciar sesión</Link>
                </div>
            )}


            <Link to="/">Regresar</Link>
        </div>
    );
}

export default Ejemplo;
