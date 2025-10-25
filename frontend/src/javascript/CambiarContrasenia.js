import React, { useState } from "react";
import { Link } from "react-router";
import ValidarLogin from "./ValidarLogin";
import axios from "axios";

function CambiarContra(){
    const [valores, setValores] = useState({
        correo:'',
    });

    const [errores, setErrores] = useState({});

    const Poner = (event) =>{
        setValores(prev =>({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const Enviar = (event) =>{
        event.preventDefault();

        const Validacion = ValidarLogin(valores);
        setErrores(Validacion);

        const sinErrorescitos = Object.values(Validacion).every(v => v ==="");

        if(sinErrorescitos){
            axios.post('http://localhost:8081/cambiarcontrasenia', valores)
            .then(res=>{
                console.log("respuesta del servidor...")
            })
        }





    }


    return(
        <div>

        </div>
    )
}

export default CambiarContra;
