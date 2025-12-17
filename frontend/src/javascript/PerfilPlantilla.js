import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../css/PerfilPlantilla.css';

function PerfilPlantilla() {
    let { id_usuario } = useParams();

    const [cargarUsuario, setCargarUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const usuarioId = Number(localStorage.getItem("usuarioId"));

    useEffect(() => {
        axios
            .get(`http://localhost:8081/usuario/${id_usuario}`)
            .then((response) => {
                setCargarUsuario(response.data);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setCargando(false);
            });
    }, [id_usuario]);

    const CambiarPerfil = async (values) => {
        const confirmar = window.confirm("¿Seguro que quieres actualizar tu perfil?");
        if (!confirmar) return;

        try {
            const formData = new FormData();

            if (values.usuario && values.usuario.trim() !== "") {
                formData.append("usuario", values.usuario);
            }
            if (values.sobre_mi && values.sobre_mi.trim() !== "") {
                formData.append("sobre_mi", values.sobre_mi);
            }
            if (nuevaFoto) {
                formData.append("perfil", nuevaFoto);
            }

            await axios.post(
                `http://localhost:8081/usuario/${id_usuario}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Perfil actualizado correctamente.");
            window.location.reload();
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar el perfil.");
        }
    };

    const ValoresIniciales = {
        usuario: cargarUsuario?.usuario || "",
        sobre_mi: cargarUsuario?.sobre_mi || ""
    };

    if (cargando) return <div>Cargando...</div>;
    if (!cargarUsuario) return <div>Error al cargar usuario</div>;

    return (
        <div className="contenedor-todo">
            <div className="contenedor-usuario">
                <div className="contenedor-2-usuario">
                    <div className="nombre-usuario">
                        <h1>{cargarUsuario.usuario}</h1>
                    </div>

                    <div className="contenedor-3-usuario">
                        <div className="perfil-usuario">
                            <img
                                src={`http://localhost:8081/${cargarUsuario.perfil}`}
                                alt="perfil"
                            />
                        </div>
                        <div className="descripcion-usuario">
                            <div className="sobremi-usuario">
                                <h2>Sobre mí</h2>
                            </div>
                            <div className="sobre-mi-2">
                                <p>{cargarUsuario.sobre_mi}</p>
                            </div>
                        </div>
                    </div>

                    {usuarioId === Number(cargarUsuario.id) && (
                        <div className="editar-perfil-container">
                            <button
                                className="boton-editar"
                                onClick={() => setMostrarOpciones(!mostrarOpciones)}
                            >
                                Editar perfil
                            </button>

                            {mostrarOpciones && (
                                <div className="borrarMostrar">
                                    <Formik
                                        enableReinitialize
                                        initialValues={ValoresIniciales}
                                        onSubmit={CambiarPerfil}
                                    >
                                        {() => (
                                            <Form>
                                                <label>Nombre nuevo:</label>
                                                <Field name="usuario" className="input-campo" />

                                                <label>Cambiar foto de perfil:</label>
                                                <input
                                                    className="input-campo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setNuevaFoto(e.target.files[0])}
                                                />

                                                <label>Sobre mí:</label>
                                                <Field name="sobre_mi" className="input-campo" />

                                                <button type="submit" className="boton-enviar">
                                                    Guardar cambios
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>

                                    <p>
                                        ¿Olvidaste tu contraseña?{" "}
                                        <Link to="/cambiar">Reestablecer contraseña</Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {usuarioId !== Number(cargarUsuario.id) && <p></p>}

                    <Link to="/" className="link-regresar">Regresar</Link>
                </div>
            </div>
        </div>
    );
}

export default PerfilPlantilla;
