import React from "react";
import { Link } from "react-router";


function PanelAdmin() {
    const usuarioRol = localStorage.getItem("usuarioRol");


    return (


        <div>

            {usuarioRol === "2" ? (
                <div>
                    <header>
                        <h1> Panel admincito</h1>
                        <Link to={'/'}>Regresar</Link>
                    </header>

                    <div>
                        <Link to={'/crearnoticia'}> Crear Noticia </Link>

                    </div>

                    <div>
                        <Link to={'/log'}> Log Noticias </Link>

                    </div>

                    <div>
                        <Link to={'/Log/Usuarios'}>Log Usuarios</Link>
                    </div>


                </div>
            ) : (
                <div>
                    <p>Acceso restringido </p>
                </div>
            )}



        </div>
    )
}

export default PanelAdmin;


