import React from "react";
import { Link } from "react-router-dom";
import kon from "../imagenes/1_.mp4";
import "../css/Pagina-error.css";

function Error404() {
  return (
    <div className="error-page">
      <div className="error-card">

        <div className="error-header">
          <h1 className="error-title">Error, oh Dios, sálvanos…</h1>
          <span className="error-glitch">404</span>
        </div>

        <div className="error-message">
          <h2>
            Hubo un error al cargar la página.
            <br />
            ¿Por qué no ves un episodio de <span>K-ON!</span> mientras tanto?
          </h2>
        </div>

        <div className="video-container">
          <div className="video-frame">
            <video src={kon} controls />
          </div>
        </div>

        <div className="error-footer">
          <p>
            O si eres amargado…
            <Link to="/" className="error-link"> volver al inicio</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
     
export default Error404;
