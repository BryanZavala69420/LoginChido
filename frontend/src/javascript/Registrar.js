import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ValidarUsuario from './ValidarUsuario';
import axios from 'axios';
import '../css/Registrar.css';
import URLCHILA from './CocoDelTF2we';
function Registrar() {



    const Navegar = useNavigate();

    const [valores, setValores] = useState({
        usuario: '',
        correo: '',
        fecha_nac: '',
        constrasena: ''
    });

    const [imagen, setImagen] = useState(null);  
    const [errores, setErrores] = useState({});
    const [errorServer, setErrorServer] = useState("");

    const Poner = (event) => {
        const { name, value } = event.target;

        setValores(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "correo") {
            setErrorServer("");
        }
    };

    const Enviar = (event) => {
        event.preventDefault();

        const Validar = ValidarUsuario(valores);
        setErrores(Validar);

        const sinErrores = Object.values(Validar).every(v => v === "");

        if (sinErrores) {

            const formData = new FormData();
            formData.append("usuario", valores.usuario);
            formData.append("correo", valores.correo);
            formData.append("fecha_nac", valores.fecha_nac);
            formData.append("constrasena", valores.constrasena);

            if (imagen) {
                formData.append("perfil", imagen);
            }

            axios.post(`${URLCHILA}/registrar`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    alert("Usuario registrado, yay!");
                    console.log(res);

                    setValores({
                        usuario: '',
                        correo: '',
                        fecha_nac: '',
                        constrasena: ''
                    });
                    setImagen(null);

                    Navegar('/sesion');
                })
                .catch(err => {
                    console.error("error al registrar", err);

                    if (err.response && err.response.status === 400) {
                        setErrorServer("");
                    } else {
                        setErrorServer("El correo ya se ha utilizado");
                    }
                });
        }
    };

    return (
        <div className="registrar">
            <div className="form-register">

                <form onSubmit={Enviar}>
                    <h2> Registrate es gratis hdp </h2>

                    <p>Usuario</p>
                    <input
                        className="controles"
                        type="text"
                        name="usuario"
                        required
                        value={valores.usuario}
                        onChange={Poner}
                        placeholder="usuario"
                    />

                    <p>Correo</p>
                    <input
                        className="controles"
                        type="email"
                        name="correo"
                        required
                        value={valores.correo}
                        onChange={Poner}
                        placeholder="correo electrónico"
                    />
                    {errorServer && <p style={{ color: "red" }}>{errorServer}</p>}

                    <p>Fecha de nacimiento</p>
                    <input
                        className="controles"
                        type="date"
                        name="fecha_nac"
                        value={valores.fecha_nac}
                        onChange={Poner}
                        required
                    />

                    <p>Contraseña</p>
                    <input
                        className="controles"
                        type="password"
                        name="constrasena"
                        value={valores.constrasena}
                        onChange={Poner}
                        required
                    />

                    <p>Imagen de perfil</p>
                    <input
                        className="controles"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />

                    <button className='botoncito' type="submit">Registrar</button>
                </form>

                <Link to="/"> Regresar </Link>
            </div>
        </div>
    );
}

export default Registrar;
