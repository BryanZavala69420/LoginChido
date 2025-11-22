import React from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
function CrearNotsicia() {
    let Navegar = useNavigate();

    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioID = localStorage.getItem("usuarioId");
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioRol = localStorage.getItem("usuarioRol");


    const ValoresIniciales = {
        titulo: "",
        noticia: "",
        id_periodista: usuarioID,
        nombre_periodista: usuarioNombre

    }

    const EnviarNoticia = async (data) => {
        try {
            const respuesta = await axios.post("http://localhost:8081/NuevaNoticia", data)
            console.log("respuesta del servidor", respuesta);
            alert("yay, se guardo")
            Navegar('/')


        }
        catch (error) {
            console.error("error al enviar", error);

        }


    }


    return (
        <div>


            {sesionActiva ? (
                usuarioRol === "2" ? (
                    <div>
                        <p>Periodista: {usuarioNombre}, {usuarioID}</p>
                        <Formik initialValues={ValoresIniciales} onSubmit={EnviarNoticia}>
                            <Form>
                                <label>Titulo de la noticia:</label>

                                <Field
                                    id="inputCreatePost"
                                    name="titulo"
                                    placeholder="titulo"
                                    required
                                />
                                <br />


                                <label>Noticia:</label>

                                <Field
                                    id="inputCreatePost"
                                    name="noticia"
                                    placeholder="escribe la noticia"
                                    required

                                />
                                <br />


                                <label>tags:</label>

                                <br></br>
                                <button type="submit"> enviar noticia</button>
                            </Form>
                        </Formik>


                    </div>


                ) : (
                    <div>
                        <p> No deberias estar aqui, acceso restringido</p>

                    </div>
                )





            ) : (
                <div>
                    <p> Inicia sesion, por favor</p>


                </div>
            )}


        </div>
    )

}

export default CrearNotsicia;