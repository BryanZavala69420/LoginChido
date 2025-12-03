import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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

    if (cargando) return <p>Cargando usuarios...</p>;

    return (
        <div>
            <h2>Usuarios registrados</h2>

            <Link to="/admin">Regresar</Link>

            <table border="1">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha de nacimiento</th>
                        <th>Correo</th>
                        <th>Borrar?</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.length === 0 ? (
                        <tr>
                            <td colSpan="4">No hay usuarios registrados</td>
                        </tr>
                    ) : (
                        usuarios.map((mapear, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/perfil/${mapear.id}`}>
                                        {mapear.usuario}
                                    </Link>
                                </td>
                                <td>{mapear.fecha_nac}</td>
                                <td>{mapear.correo}</td>
                                <td>
                                    <button onClick={() => borrarUsuario(mapear.id)}>
                                        Eliminar usuario
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default LogUsuarios;
