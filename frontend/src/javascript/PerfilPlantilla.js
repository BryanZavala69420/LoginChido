import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
            formData.append("usuario", values.usuario);
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
        usuario: ""
    };

    if (cargando) return <div>Cargando...</div>;
    if (!cargarUsuario) return <div>Error al cargar usuario</div>;

    return (
        <div>
            <h1>{cargarUsuario.usuario}</h1>

            <img
                src={`http://localhost:8081/${cargarUsuario.perfil}`}
                alt="perfil"
                height="200"
            />
            <br />

            {usuarioId === Number(cargarUsuario.id) ? (
                <div>

                    <button onClick={() => setMostrarOpciones(!mostrarOpciones)}>
                        Cambiar cosas del usuario
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
                                        <Field name="usuario" />
                                        <br /><br />

                                        <label>Cambiar foto de perfil:</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setNuevaFoto(e.target.files[0])}
                                        />

                                        <br /><br />
                                        <button type="submit">Guardar cambios</button>
                                    </Form>
                                )}
                            </Formik>
                                                <div>
                        <p> ¿Olvidaste tu contraseña? <Link to="/cambiar"> Reestablecer contraseña</Link> </p>

                    </div>

                        </div>
                    )}


                </div>
            ) : (
                <div>
                    <p> Otro Usuario</p>
                </div>
            )}

            <br />
            <Link to={'/'}>Regresar</Link>
        </div>
    );
}

export default PerfilPlantilla;
