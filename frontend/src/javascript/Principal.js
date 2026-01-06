import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "../imagenes/Banner2.png";
import axios from "axios";
import "../css/Principal2.css";
import URLCHILA from "./CocoDelTF2we";
function Index() {
  const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
  const usuarioNombre = localStorage.getItem("usuarioNombre");
  const usuarioRol = localStorage.getItem("usuarioRol");
  const usuarioId = localStorage.getItem("usuarioId");

  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [noticiaDestacada, setNoticiaDestacada] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [busqueda, setBusqueda] = useState(""); // Estado para la barra de búsqueda

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
      .get(`${URLCHILA}/usuario/${usuarioId}`)
      .then((r) => setUsuario(r.data))
      .catch(() => { });
  }, [usuarioId]);

  useEffect(() => {
    axios
      .get(`${URLCHILA}/TodasLasNoticias`)
      .then((response) => {
        setNoticias(response.data);
        setCargando(false);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    axios
      .get(`${URLCHILA}/IdNoticia/4`)
      .then((response) => setNoticiaDestacada(response.data))
      .catch(() => { });
  }, []);

  return (
    <div className="todo">
      <div className="cabezal">
        <header>
          <div className="hola">
            <div className="banner">
              <img
                src={banner}
                alt="banner"
                onClick={() => window.location.reload()}
              />
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
                      src={`${URLCHILA}/${usuario.perfil}`}
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
                    <li><Link to="/nosotros">Sobre nosotros</Link></li>
                  </ul>
                </div>

                <div className="boton">
                  <button onClick={cerrarSesion}>Cerrar sesión</button>
                </div>

                <div className="buscador-nav">
                  <input
                    type="text"
                    placeholder="Buscar noticia por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
            ) : (

              <div className="nav-contenido">
                <ul className="Link">
                  <li><Link to="/sesion">Iniciar sesión</Link></li>
                  <li><Link to="/registrar">Registrar</Link></li>
                  <li><Link to="/nosotros">Sobre nosotros</Link></li>


                </ul>

                <div className="buscador-nav">
                  <input
                    type="text"
                    placeholder="Buscar noticia por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
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
                src={`${URLCHILA}/${usuario.perfil}`}
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

            <Link to="/nosotros" onClick={() => setSidebarOpen(false)}>
              Sobre nosotros
            </Link>
            <div className="buscador-nav">
              <input
                type="text"
                placeholder="Buscar noticia por título..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>


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
            <Link to="/nosotros" onClick={() => setSidebarOpen(false)}>Sobre nosotros</Link>
            <div className="buscador-nav">
              <input
                type="text"
                placeholder="Buscar noticia por título..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <main>
        <div className="Cuerpo-principal">
          <div className="contenido">
            <h1>Noticia destacada</h1>

            {noticiaDestacada && (
              <div className="noticiaDestacada">
                <h3>{noticiaDestacada.titulo}</h3>

                <img
                  src={`${URLCHILA}/${noticiaDestacada.imagen}`}
                  alt="destacada"
                />

                <Link to={`/noticia/${noticiaDestacada.id_noticia}`}>
                  Haz click para saber más
                </Link>
              </div>
            )}
          </div>

          <hr />

          <h2>Noticias recientes</h2>

          {cargando ? (
            <p>Cargando noticias...</p>
          ) : (
            <div className="lista-noticias">
              {noticias
                .filter((n) =>
                  n.titulo.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((n) => (
                  <div key={n.id_noticia} className="noticia-card">
                    <h3>{n.titulo}</h3>

                    <Link to={`/noticia/${n.id_noticia}`} className="enlace">
                      Haz click para saber más
                    </Link>

                    {n.imagen && (
                      <img
                        src={`${URLCHILA}/${n.imagen}`}
                        alt="noticia"
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="footers">
          <p>Todos los derechos reservados a la clase de Fidel, viva Fidel</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
