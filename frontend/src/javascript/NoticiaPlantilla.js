import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import '../css/NoticiaPlantilla.css'
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
            .catch(() => setCargando(false));
    }, [id_noticia]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/comentario/${id_noticia}`)
            .then((res) => setListaComentarios(res.data))
            .catch(() => {});
    }, [id_noticia]);

    const enviarComentario = () => {
        if (comentarioTexto.trim() === "") return;

        axios
            .post("http://localhost:8081/NuevoComentario", {
                comentario: comentarioTexto,
                usuario: usuarioNombre,
                id_usuario: usuarioID,
                id_noticia: id_noticia,
            })
            .then(() => {
                setComentarioTexto("");
                axios
                    .get(`http://localhost:8081/comentario/${id_noticia}`)
                    .then((res) => setListaComentarios(res.data));
            })
            .catch(() => {});
    };

    const Borrar = (idComentario) => {
        axios
            .delete(`http://localhost:8081/BorrarComentario/${idComentario}/${usuarioID}`)
            .then(() => window.location.reload())
            .catch(() => {});
    };

    const BorrarNoticia = () => {
        axios
            .delete(`http://localhost:8081/Borrar/Noticia/${id_noticia}`)
            .then(() => {
                alert("Noticia borrada correctamente.");
                window.location.href = "/log";
            });
    };

    if (cargando || !CargarNoticia) return;

    return (
        <div className="noticia-container">

            {/* ENCABEZADO */}
            <div className="noticia-header">
                <h1>{CargarNoticia.titulo}</h1>

                <Link className="volver-link" to="/">Regresar</Link>

                {usuarioID === "2" && (
                    <button 
                        className="boton-eliminar-noticia"
                        onClick={BorrarNoticia}
                    >
                        Eliminar noticia
                    </button>
                )}
            </div>

            {/* INFO DE AUTOR + TEXTO */}
            <div className="noticia-info">
                <p className="autor">Autor: {CargarNoticia.nombre_periodista}</p>
                <p className="noticia-texto">{CargarNoticia.noticia}</p>
            </div>

            {/* IMAGEN */}
            <div className="noticia-imagen-box">
                <img
                    className="noticia-imagen"
                    src={`http://localhost:8081/${CargarNoticia.imagen}`}
                    alt="imagen"
                />
            </div>


         <div className="comentarios-box">
                <h3>Comentarios</h3>

                {sesionActiva ? (
                    <div className="crear-comentario-box">
                        <input
                            type="text"
                            placeholder="Ingresa tu comentario"
                            value={comentarioTexto}
                            onChange={(e) => setComentarioTexto(e.target.value)}
                        />
                        <button onClick={enviarComentario}>
                            Añadir comentario
                        </button>
                    </div>
                ) : (
                    <p>Ingresa para comentar</p>
                )}

                {listaComentarios.length === 0 && (
                    <p>No hay comentarios aún</p>
                )}

                <div className="lista-comentarios">
                    {listaComentarios.map((Comentario) => (
                        <div key={Comentario.id_comentario} className="comentario-card">
                            
                            <div className="comentario-header">
                                <img
                                    src={`http://localhost:8081/${Comentario.perfil}`}
                                    alt="perfil"
                                    className="comentario-perfil"
                                />

                                <Link 
                                    to={`/perfil/${Comentario.id_usuario}`} 
                                    className="comentario-usuario"
                                >
                                    {Comentario.usuario}
                                </Link>
                            </div>

                            <p className="comentario-texto">{Comentario.comentario}</p>

                            <small className="comentario-fecha">
                                {Comentario.fecha_de_comentario} {Comentario.hora_de_comentario}
                            </small>

                            {sesionActiva && Comentario.id_usuario == usuarioID && (
                                <button
                                    className="boton-borrar-comentario"
                                    onClick={() => Borrar(Comentario.id_comentario)}
                                >
                                    Borrar Comentario
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Plantilla;
