import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidarLogin from "./ValidarLogin";
import "../css/Login.css"

function Login() {
    const [valores, setValores] = useState({
        correo: '',
        contrasena: ''
    });

    const Navegar = useNavigate();
    const [errores, setErrores] = useState({});

    const Poner = (event) => {
        setValores(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const Enviar = (event) => {
        event.preventDefault();

        const Validacion = ValidarLogin(valores);
        setErrores(Validacion);

        const sinErrorescitos = Object.values(Validacion).every(v => v === "");

        if (sinErrorescitos) {
            axios.post('http://localhost:8081/acceder', valores)

                .then(res => {
                    console.log("Respuesta del servidor:", res.data);

                    if (res.data.status === "ok") {
                        localStorage.setItem("sesionIniciada", "true");
                        localStorage.setItem("usuarioNombre", res.data.usuario);
                        localStorage.setItem("usuarioRol", res.data.rol);
                        Navegar('/');
                    } else {
                        alert(res.data.mensaje);
                    }
                })
                .catch(err => {
                    console.error("Error al acceder", err);
                    if (err.response && err.response.status === 401) {

                        const mensaje = err.response.data.mensaje;


                        setErrores(prev => ({
                            ...prev,
                            correo: mensaje.toLowerCase().includes("correo") ? mensaje : prev.correo,
                            contrasena: mensaje.toLowerCase().includes("contraseña") ? mensaje : prev.contrasena
                        }));

                    } else {
                        alert("error de conexion en el servidor");
                    }
                });
        }
    };

    return (
        <div>

            <div>

                <div className="sex">
                    <header className="Hola">
                        <h1> Titulo perron</h1>
                    </header>
                </div>



            <div className="formulario"> 
                <form onSubmit={Enviar}>
                    <p>Correo</p>
                    <input
                        type="email"
                        name="correo"
                        placeholder="correo electrónico"
                        onChange={Poner}

                    />
                    {errores.correo && <span style={{ color: 'red' }}>{errores.correo}</span>}
                    <br />

                    <p>Contraseña</p>
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="contraseña"
                        onChange={Poner}

                    />
                    {errores.contrasena && <span style={{ color: 'red' }}>{errores.contrasena}</span>}
                    <br />


                    <br />
                    <button className="botonsote" type="submit">Ingresar</button>

                </form>

                </div>
                <br />
                <p> ¿Olvidaste tu contraseña?</p> <Link to="/cambiar"> Reestablecer contraseña</Link>


                <Link to="/"> Regresar </Link>
            </div>
        </div>
    )


}

export default Login;