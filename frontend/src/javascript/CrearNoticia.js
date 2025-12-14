import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import '../css/CrearNoticia.css'
function CrearNoticia() {
    let Navegar = useNavigate();

    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioID = localStorage.getItem("usuarioId");
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioRol = localStorage.getItem("usuarioRol");

    const [archivo, setArchivo] = useState(null);

    const ValoresIniciales = {
        titulo: "",
        noticia: "",
        id_periodista: usuarioID,
        nombre_periodista: usuarioNombre
    };

    const EnviarNoticia = async (values) => {
        try {
            const formData = new FormData();
            formData.append("titulo", values.titulo);
            formData.append("noticia", values.noticia);
            formData.append("id_periodista", values.id_periodista);
            formData.append("nombre_periodista", values.nombre_periodista);

            if (archivo) {
                formData.append("imagen", archivo);
            }

            const respuesta = await axios.post(
                "http://localhost:8081/NuevaNoticia",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            console.log("respuesta del servidor", respuesta.data);
            alert("Noticia guardada correctamente");
            Navegar("/");
        } catch (error) {
            console.error("error al enviar", error);
        }
    };

 
return (
    <div className="crearNoticia-afuera">
        {sesionActiva ? (
            usuarioRol === "2" ? (
                <div className="crearNoticia-contenedor">

                    <header className="crearNoticia-header">
                        <h2>Crear nueva noticia</h2>
                        <p className="crearNoticia-periodista">
                            Periodista: <strong>{usuarioNombre}</strong> (ID {usuarioID})
                        </p>
                    </header>

                    <Formik initialValues={ValoresIniciales} onSubmit={EnviarNoticia}>
                        <Form className="crearNoticia-form" encType="multipart/form-data">

                            <label>Título:</label>
                            <Field
                                name="titulo"
                                placeholder="Título de la noticia"
                                className="crearNoticia-input"
                                required
                            />

                            <label>Noticia:</label>
                            <Field
                                as="textarea"
                                name="noticia"
                                placeholder="Contenido de la noticia"
                                className="crearNoticia-textarea"
                                required
                            />

                            <label>Imagen:</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="crearNoticia-file"
                                onChange={(e) => setArchivo(e.target.files[0])}
                            />

                            <button type="submit" className="crearNoticia-boton">
                                Publicar noticia
                            </button>
                        </Form>
                    </Formik>

                    <Link to="/admin" className="crearNoticia-regresar">
                        Regresar
                    </Link>

                </div>
            ) : (
                <p className="crearNoticia-error">
                    Acceso restringido.
                </p>
            )
        ) : (
            <p className="crearNoticia-error">
                Inicia sesión para publicar noticias.
            </p>
        )}
    </div>
);


}

export default CrearNoticia;
