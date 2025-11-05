import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidarLogin from "./ValidarLogin";
import '../css/Login.css'

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
    console.log("🧾 Respuesta completa del backend:", res.data);

    if (res.data.status === "ok") {
        localStorage.setItem("sesionIniciada", "true");
        localStorage.setItem("usuarioNombre", res.data.usuario);
        localStorage.setItem("usuarioRol", res.data.rol);
        localStorage.setItem("usuarioId", res.data.id_usuario);

        const idUsuario = res.data.id_usuario;

        axios.post('http://localhost:8081/sesiones', { id_usuario: idUsuario })

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
        <div className="login">

            <div>





                <div className="formulario">
                    <div className="titlo_formulario"> 
                    <h2> Iniciar sesion </h2>

                    </div>
                 
                    


                    <form onSubmit={Enviar}>
                        <p class="subtitulo ">Correo</p>
                        <input
                            class="controls"
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                            onChange={Poner}

                        />
                        {errores.correo && <span style={{ color: 'red' }}>{errores.correo}</span>}
                        <br />

                        <p class="subtitulo">Contraseña</p>
                        <input
                            class="controls"
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            onChange={Poner}

                        />
                        
                        {errores.contrasena && <span style={{ color: 'red' }}>{errores.contrasena}</span>}
                        <br />


                        <br />
                        <button class="botonsote" type="submit">Ingresar</button>

                        <p> ¿Olvidaste tu contraseña? <Link to="/cambiar" class="linksito"> Reestablecer contraseña</Link> </p>

                        <br/>

                        <p>  No tienes cuenta?  <Link to="/registrar" class="linksito"> Registrate </Link> </p><br/>

                    <Link to="/"> Regresar </Link>

                        
                    </form>

                </div>

            </div>
        </div>
    )


}

export default Login;