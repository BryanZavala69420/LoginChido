import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import '../css/LogNoticias.css';
import URLCHILA from "./CocoDelTF2we";

function LogNoticias() {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const URLCHILA = `:8081`;



    useEffect(() => {
        axios
            .get(`${URLCHILA}/Log`)
            .then((response) => {
                setNoticias(response.data);
                setCargando(false);
                
            })
            .catch((error) => {
                console.error("error al obtener las noticias", error);
                setCargando(false);
            });
    }, []);

    const noticiasPorFecha = noticias.reduce((grupo, noticia) => {
        const fecha = noticia.fecha_de_publicacion; 
        if (!grupo[fecha]) grupo[fecha] = [];
        grupo[fecha].push(noticia);
        return grupo;
    }, {});

const BorrarNoticia = (id_noticia) => {
    const confirmar = window.confirm(
        "¿Estás seguro de que deseas eliminar esta noticia?\nEsta acción no se puede deshacer."
    );

    if (!confirmar) return;

    axios
        .delete(`${URLCHILA}/Borrar/Noticia/${id_noticia}`)
        .then(() => {
            alert("Noticia borrada correctamente.");
            window.location.href = "/log";
        })
        .catch((error) => {
            console.error("Error al borrar la noticia:", error);
            alert("Ocurrió un error al borrar la noticia.");
        });
};


return (
    <div className="logNoticias-afuera">
        <div className="logNoticias-contenedor">

            <header className="logNoticias-header">
                <h1>Noticias por fecha</h1>
                <Link to="/admin" className="logNoticias-regresar">
                    Regresar
                </Link>
            </header>

            {cargando ? (
                <p className="logNoticias-estado">Cargando noticias...</p>
            ) : Object.keys(noticiasPorFecha).length === 0 ? (
                <p className="logNoticias-estado">No hay noticias</p>
            ) : (
                <div className="logNoticias-fechas">
                    {Object.keys(noticiasPorFecha).map((fecha) => (
                        <div key={fecha} className="logNoticias-grupo">

                            <h2 className="logNoticias-fecha">{fecha}</h2>

                            <table className="logNoticias-tabla">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Acción</th>
                                        <th>¿Borrar?</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {noticiasPorFecha[fecha].map((not) => (
                                        <tr key={not.id_noticia}>
                                            <td>{not.id_noticia}</td>
                                            <td>{not.titulo}</td>
                                            <td>
                                                <Link
                                                    to={`/noticia/${not.id_noticia}`}
                                                    className="logNoticias-ver"
                                                >
                                                    Ver
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className="logNoticias-borrar"
                                                    onClick={() => BorrarNoticia(not.id_noticia)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);


}

export default LogNoticias;
