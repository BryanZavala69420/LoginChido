import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../imagenes/Banner2.png";
import axios from "axios";
import "../css/Principal2.css"; // Usa el mismo CSS que tu Index

function SobreNosotros() {
    const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioRol = localStorage.getItem("usuarioRol");
    const usuarioId = localStorage.getItem("usuarioId");

    const [usuario, setUsuario] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const cerrarSesion = () => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioNombre");
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("usuarioPerfil");
        localStorage.removeItem("usuarioRol");

        window.location.reload();
    };

    useEffect(() => {
        if (!usuarioId) return;

        axios
            .get(`http://localhost:8081/usuario/${usuarioId}`)
            .then((r) => setUsuario(r.data))
            .catch(() => { });
    }, [usuarioId]);

    return (
        <div className="todo">
            <div className="cabezal">
                <header>
                    <div className="hola">
                        <div className="banner">

                            <Link to={'/'}>

                                <img
                                    src={banner}
                                    alt="banner"

                                />
                            </Link>


                        </div>

                        <button
                            className="hamburger"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                    </div>

                    <nav className="nav-list">
                        {sesionActiva ? (
                            <div className="nav-contenido">
                                <div className="nose">
                                    {usuario?.perfil && (
                                        <img
                                            src={`http://localhost:8081/${usuario.perfil}`}
                                            alt="Perfil"
                                        />
                                    )}
                                    <p>{usuarioNombre}</p>
                                </div>

                                {usuarioRol === "2" && (
                                    <ul className="Link">
                                        <li><Link to="/admin">Panel del admin</Link></li>
                                    </ul>
                                )}

                                <div className="perfil">
                                    <ul className="Link">
                                        <li><Link to={`/perfil/${usuarioId}`}>Perfil</Link></li>
                                    </ul>
                                </div>

                                <div className="boton">
                                    <button onClick={cerrarSesion}>Cerrar sesión</button>
                                </div>

                                <div className="buscador-nav" >
            
                                </div>
                            </div>
                        ) : (
                            <div className="nav-contenido">
                                <ul className="Link">
                                    <li><Link to="/sesion">Iniciar sesión</Link></li>
                                    <li><Link to="/registrar">Registrar</Link></li>
                                </ul>


                            </div>
                        )}
                    </nav>
                </header>
            </div>

            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                    ✕
                </button>

                {sesionActiva ? (
                    <div className="sidebar-content">
                        {usuario?.perfil && (
                            <img
                                src={`http://localhost:8081/${usuario.perfil}`}
                                alt="perfil"
                                className="sidebar-img"
                            />
                        )}

                        <p>{usuarioNombre}</p>

                        {usuarioRol === "2" && (
                            <Link to="/admin" onClick={() => setSidebarOpen(false)}>
                                Panel del admin
                            </Link>
                        )}

                        <Link to={`/perfil/${usuarioId}`} onClick={() => setSidebarOpen(false)}>
                            Perfil
                        </Link>



                        <button
                            className="cerrar-movil"
                            onClick={() => {
                                setSidebarOpen(false);
                                cerrarSesion();
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <div className="sidebar-content">
                        <Link to="/sesion" onClick={() => setSidebarOpen(false)}>Iniciar sesión</Link>
                        <Link to="/registrar" onClick={() => setSidebarOpen(false)}>Registrar</Link>
                    </div>
                )}
            </div>

            <main>
                <div className="Cuerpo-principal">
                    <h1>Sobre Nosotros</h1>
                    <p>


                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sem nisi. Curabitur tristique vel diam id suscipit. Fusce risus ante, scelerisque at erat eu, congue lobortis ipsum. Nulla odio tellus, iaculis eu tellus vel, condimentum tristique lectus. Sed sollicitudin sit amet odio mattis luctus. Donec placerat rhoncus lorem id dignissim. Phasellus ultrices, ipsum eleifend finibus ornare, quam felis mattis sem, a aliquam tortor sem et turpis. Duis vitae felis suscipit, sagittis tortor quis, sodales felis.

                        Nulla dictum enim gravida turpis ultrices vehicula. Etiam ultricies sapien eget ipsum blandit, eget placerat felis semper. Donec sit amet tempor lectus. Quisque ultrices pretium tortor, a tincidunt tortor volutpat a. Fusce semper mi a odio suscipit, ut accumsan metus ultrices. Curabitur convallis ullamcorper lacus, sit amet rutrum ligula mattis et. Vivamus vitae sem consectetur, lacinia dui vitae, convallis enim. Maecenas sit amet tristique eros. Duis ac nibh at libero suscipit mollis id sed tellus. Curabitur egestas sapien ac aliquet finibus. Vestibulum sed justo mauris. Suspendisse ut pretium libero. Suspendisse cursus justo id tortor ultricies venenatis.
                    </p>

                </div>
            </main>
        </div>
    );
}

export default SobreNosotros;
