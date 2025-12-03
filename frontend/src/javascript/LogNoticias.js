import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";



function LogNoticias() {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8081/Log")
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
        axios.delete(`http://localhost:8081/Borrar/Noticia/${id_noticia}`)
            .then(() => {
                alert("Noticia borrada correctamente.");
                window.location.href = "/log";
            })

        console.log('se ha borrado mimim');

    }


    return (
        <div>
            <header>
                <h1>Noticias por fecha</h1>
            </header>


            <Link to={'/admin'}> Regresar </Link>

            {cargando ? (
                <p>Cargando noticias...</p>
            ) : Object.keys(noticiasPorFecha).length === 0 ? (
                <p>No hay noticias</p>
            ) : (
                <div>
                    {Object.keys(noticiasPorFecha).map((fecha) => (
                        <div key={fecha} style={{ marginBottom: "25px" }}>

                            <h2>{fecha}</h2>

                            <table

                            >
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Título</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Acciones</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px"}}> ¿Borrar?</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {noticiasPorFecha[fecha].map((not) => (
                                        <tr key={not.id_noticia}>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                {not.id_noticia}
                                            </td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                {not.titulo}
                                            </td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                <Link to={`/noticia/${not.id_noticia}`}>
                                                    Ver completo
                                                </Link>
                                            </td>

                                            <td style={{ border: "1px solid #ccc", padding: "8px"}}>
                                                <button onClick={()=> BorrarNoticia(not.id_noticia)}> Eliminar la noticia</button>

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
    );
}

export default LogNoticias;
