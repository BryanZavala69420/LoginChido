import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import '../css/LogUsuarios.css'
function LogUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8081/sus")
            .then((response) => {
                setUsuarios(response.data);
                setCargando(false);
            })
            .catch((error) => {
                console.error("error al obtener los usuarios", error);
                setCargando(false);
            });
    }, []);

    const borrarUsuario = (id) => {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");

        if (!confirmar) {
            return; // Si el usuario cancela, no borra
        }

        axios
            .delete(`http://localhost:8081/borrarUsuario/${id}`)
            .then(() => {
                alert("Usuario eliminado correctamente.");

                // Opcional: actualizar lista sin recargar
                setUsuarios((prev) => prev.filter((u) => u.id !== id));

                // Si quieres recargar la vista como antes:
                // window.location.href = "/Log/Usuarios";
            })
            .catch((error) => {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un problema al eliminar el usuario.");
            });
    };


    const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);

    return fecha.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
};


    if (cargando) return <p>Cargando usuarios...</p>;
return (
    <div className="logUsuarios-afuera">
        <div className="logUsuarios-contenedor">

            <header className="logUsuarios-header">
                <h2>Usuarios registrados</h2>
                <Link to="/admin" className="logUsuarios-regresar">
                    Regresar
                </Link>
            </header>

            <table className="logUsuarios-tabla">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha de nacimiento</th>
                        <th>Correo</th>
                        <th>¿Borrar?</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="logUsuarios-vacio">
                                No hay usuarios registrados
                            </td>
                        </tr>
                    ) : (
                        usuarios.map((mapear, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        to={`/perfil/${mapear.id}`}
                                        className="logUsuarios-usuario"
                                    >
                                        {mapear.usuario}
                                    </Link>
                                </td>
                                <td>{formatearFecha(mapear.fecha_nac)}</td>

                                <td>{mapear.correo}</td>
                                <td>
                                    <button
                                        className="logUsuarios-borrar"
                                        onClick={() => borrarUsuario(mapear.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    </div>
);

}

export default LogUsuarios;
