import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ValidarUsuario from './ValidarUsuario';
import axios from 'axios';

function Registrar() {


    const Navegar = useNavigate();

    const [valores, setValores] = useState({
        usuario: '',
        correo: '',
        fecha_nac: '',
        constrasena:''
         
    });

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
            axios.post('http://localhost:8081/registrar', valores)
                .then(res => {
                    alert("Usuario registrado, yay!");
                    console.log(res);

                    setValores({
                        usuario: '',
                        correo: '',
                        fecha_nac: '',
                        constrasena: ''
                    });
                    Navegar('/sesion');
                })
                .catch(err => {
                    console.error("error al registrar xd", err);

                    if (err.response && err.response.status === 400) {
                        setErrorServer("");
                    } else {
                        setErrorServer("El correo ya se ha utilzado");
                    }

                });

        }
    };

    return (
        <div>
            <form onSubmit={Enviar}>
                <p>Usuario</p>
                <input
                    type="text"
                    name="usuario" // ✅ agregado
                    required
                    value={valores.usuario}
                    onChange={Poner}
                    placeholder="usuario"
                /> <br />

                <p>Correo</p>
                <input
                    type="email"
                    name="correo" // ✅ agregado
                    required
                    value={valores.correo}
                    onChange={Poner}
                    placeholder="correo electronico"
                />
                {errorServer && <p style={{ color: "red" }}>{errorServer}</p>}

                <br />

                <p>Fecha de nacimiento</p>
                <input
                    type="date"
                    name="fecha_nac" // ✅ agregado
                    value={valores.fecha_nac}
                    onChange={Poner}
                    required
                /><br />

                <p>Contraseña</p>
                <input
                    type="password"
                    name="constrasena" // ✅ agregado
                    value={valores.constrasena}
                    onChange={Poner}
                    required
                /> <br />

                <button className='botoncito' type="submit">Registrar</button>
            </form>
            <Link to="/"> Regresar </Link>

        </div>
    );
}

export default Registrar;
