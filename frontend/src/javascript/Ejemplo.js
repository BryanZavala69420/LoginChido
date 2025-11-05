import React from "react";
import { Link, useNavigate } from "react-router-dom";
import faggot from '../imagenes/faggot.gif';
import '../css/Ejemplo.css';

function Ejemplo() {
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioRol = localStorage.getItem("usuarioRol");
    const Navegar = useNavigate(); // luego lo arreglo XD

    return (
        <div className="ejemplo-container">
            <div className="hola">
                <h1>Hola mundo</h1>
            </div>

            {sesionActiva ? (
                usuarioRol === "2" ? (
                    <div className="mensaje admin">
                        <p>Bienvenido, {usuarioNombre}! Eres un Administrador.</p>
                        <img src={faggot} alt="Fag" width="600" />
                    </div>
                ) : (
                    <div className="mensaje user">
                        <p>Bienvenido, {usuarioNombre}! Eres un usuario normal.</p>
                    </div>
                )
            ) : (
                <div className="mensaje">
                    <p>Inicia sesión para acceder a esta página.</p>
                    <Link to="/sesion">Iniciar sesión</Link>
                </div>
            )}

            <Link to="/">Regresar</Link>
        </div>
    );
}

export default Ejemplo;
