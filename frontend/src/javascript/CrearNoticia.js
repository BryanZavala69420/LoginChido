import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";

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
            // ---- ARMAR FORM DATA ----
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
        <div>
            {sesionActiva ? (
                usuarioRol === "2" ? (
                    <div>
                        <p>Periodista: {usuarioNombre}, ID {usuarioID}</p>

                        <Formik initialValues={ValoresIniciales} onSubmit={EnviarNoticia}>
                            <Form encType="multipart/form-data">
                                <label>Título:</label>
                                <Field name="titulo" placeholder="Título" required />
                                <br />

                                <label>Noticia:</label>
                                <Field name="noticia" placeholder="Noticia" required />
                                <br />

                                <label>Imagen:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setArchivo(e.target.files[0])}
                                />
                                <br /><br />

                                <button type="submit">Enviar noticia</button>
                            </Form>
                        </Formik>
                        <Link to={'/admin'}> Regresar </Link>
                    </div>
                ) : (
                    <p>No deberías estar aquí, acceso restringido.</p>
                )
            ) : (
                <p>Inicia sesión para publicar noticias.</p>
            )}
        </div>
    );
}

export default CrearNoticia;
