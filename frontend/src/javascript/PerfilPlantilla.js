import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PerfilPlantilla() {
    let { id_usuario } = useParams();

    const [cargarUsuario, setCargarUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

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

    if (cargando) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{cargarUsuario?.usuario}</h1>
        </div>
    );
}

export default PerfilPlantilla;
