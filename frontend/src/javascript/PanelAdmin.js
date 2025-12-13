import React from "react";
import { Link } from "react-router";
import '../css/PanelAdmin.css'

function PanelAdmin() {
    const usuarioRol = localStorage.getItem("usuarioRol");


    return (


        <div className="Contendor-afuera">
            <div className="contenedor-general">


            {usuarioRol === "2" ? (
                <div>
                    <header>
                        <h1> Panel admincito</h1>
                        <Link to={'/'}>Regresar</Link>
                    </header>
 
                    <div className="Crear-Noticia">
                        <Link to={'/crearnoticia'}> Crear Noticia </Link>

                    </div>

                    <div className="Log-Noticias">
                        <Link to={'/log'}> Log Noticias </Link>

                    </div>

                    <div className="Log-Usuarios">
                        <Link to={'/Log/Usuarios'}>Log Usuarios</Link>
                    </div>


                </div>
            ) : (
                <div>
                    <p>Acceso restringido </p>
                </div>
            )}



        </div>
                    </div>

    )
}

export default PanelAdmin;


