import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uas from "../imagenes/UAS-3.jpg";
import axios from "axios";
//import '../css/Principal.css'; 
function Index() {
  const sesionActiva = localStorage.getItem("sesionIniciada") === "true";
  const usuarioNombre = localStorage.getItem("usuarioNombre");
  const usuarioRol = localStorage.getItem("usuarioRol");
  const usuarioId = localStorage.getItem("usuarioId");

  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null); 

  const cerrarSesion = () => {
    localStorage.removeItem("sesionIniciada");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioPerfil");
    window.location.reload();
  };

  useEffect(() => {
    if (!usuarioId) return;

    axios
      .get(`http://localhost:8081/usuario/${usuarioId}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((err) => {
        console.error("Error al cargar usuario:", err);
      });
  }, [usuarioId]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/TodasLasNoticias")
      .then((response) => {
        setNoticias(response.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener noticias:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="todo">
      <div className="cabezal">
        <header>
          <div className="hola">
            <h1>Página principal</h1>
          </div>

          <nav id="nav-list">
            {sesionActiva ? (
              <div className="nose">
                <p>Bienvenido, {usuarioNombre}</p>

                {usuario?.perfil && (
                  <img
                    src={`http://localhost:8081/${usuario.perfil}`}
                    alt="Perfil"
                    height="80"
                  />
                )}

                {usuarioRol === "2" && (
                  <div>
                    <Link to={"/admin"}>Panel del admin</Link>
                  </div>
                )}

                <div className="boton">
                  <button onClick={cerrarSesion}>Cerrar sesión</button>
                </div>
                <div className="perfil">
                  <Link to={`/perfil/${usuarioId}`}>perfil</Link>
                </div>
              </div>
            ) : (
              <div className="Link">
                <ul className="Link">
                  <li>
                    <Link to="/sesion">Iniciar sesión</Link>
                  </li>
                  <li>
                    <Link to="/registrar">Registrar</Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </header>
      </div>

      <main>
        <div className="Cuerpo-principal">
          <div className="titulo-principal">
            <h2>La UAS</h2>
            <br />
          </div>

          <div className="contenido">
            <div className="texto">
              <p>texto logo</p>
            </div>

            <div className="imagen-uas">
              <img src={uas} alt="uas logo" width="250" />
            </div>
          </div>

          <br />

          <div className="ejemplito">
            <Link to="/ejemplo">Ejemplo</Link>
          </div>

          <hr />

          <h2>Noticias recientes</h2>

          {cargando ? (
            <p>Cargando noticias...</p>
          ) : noticias.length === 0 ? (
            <p>No hay noticias disponibles.</p>
          ) : (
            <div className="lista-noticias">
              {noticias.map((Mapear) => (
                <div key={Mapear.id_noticia} className="noticia-card">
                  <h3>{Mapear.titulo}</h3>
                  <Link to={`/noticia/${Mapear.id_noticia}`}>
                    Haz click para saber más!!
                  </Link>
                  <br />

                  {Mapear.imagen && (
                    <img
                      src={`http://localhost:8081/${Mapear.imagen}`}
                      alt="imagen noticia"
                      width="200"
                    />
                  )}
                  <br />
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
