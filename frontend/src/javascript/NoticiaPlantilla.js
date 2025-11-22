import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useState } from "react";

function Plantilla() {
    let { id_noticia } = useParams();

    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioID = localStorage.getItem("usuarioId");
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    
    const [CargarNoticia, setCargarNoticia] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [comentarioTexto, setComentarioTexto] = useState("");
    const [listaComentarios, setListaComentarios] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/IdNoticia/${id_noticia}`)
            .then((response) => {
                setCargarNoticia(response.data);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al obtener noticia:", error);
                setCargando(false);
            });
    }, [id_noticia]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/comentario/${id_noticia}`)
            .then(res => setListaComentarios(res.data))
            .catch(err => console.log("Error cargando comentarios:", err));
    }, [id_noticia]);

    const enviarComentario = () => {
        if (comentarioTexto.trim() === "") return;

        axios.post("http://localhost:8081/NuevoComentario", {
            comentario: comentarioTexto,
            usuario: usuarioNombre,
            id_usuario: usuarioID,
            id_noticia: id_noticia
        })
            .then(() => {
                setComentarioTexto("");

                // Recargar comentarios después de enviar
                axios
                    .get(`http://localhost:8081/comentario/${id_noticia}`)
                    .then(res => setListaComentarios(res.data));
            })
            .catch((error) => {
                console.error("Error al enviar comentario:", error);
            });
    };

    if (cargando) return;

    return (
        <div>

            <h1> {CargarNoticia.titulo}</h1>

            <br />
            <Link to="/">Regresar</Link>

            <p> Autor: {CargarNoticia.nombre_periodista}</p>
            <p> {CargarNoticia.noticia}</p>

            <hr />

            <h3>Comentarios</h3>

            <div className="comentarios">

                <div className="crearcomentario">
                    <input
                        type="text"
                        placeholder="ingresa tu comentario we"
                        autoComplete="off"
                        value={comentarioTexto}
                        onChange={(e) => setComentarioTexto(e.target.value)}
                    />

                    <button onClick={enviarComentario}>
                        Añadir comentario
                    </button>
                </div>

                <br />

                <div>
                    {listaComentarios.length === 0 && (
                        <p>No hay comentarios aún</p>
                    )}

                    {listaComentarios.map((com) => (
                        <div key={com.id_comentario}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px"
                            }}
                        >
                            <b>{com.usuario}</b>
                            <p>{com.comentario}</p>
                            <small>{com.fecha_de_comentario} {com.hora_de_comentario}</small>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default Plantilla;
