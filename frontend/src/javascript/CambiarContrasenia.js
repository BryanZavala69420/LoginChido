import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";


function CambiarContrasenia() {


  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const Enviar = async (event) => {
    event.preventDefault();

    if (!correo) {
      setError("Por favor escribe tu correo.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/cambiarcontrasenia", { correo });

      if (res.data.mensaje) {
        setMensaje(res.data.mensaje);
        setError("");
      } else {
        setError("No se pudo enviar el correo.");
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      setError("Error en el servidor o conexión.");
    }
  };

  return (
    <div>


     
        <div>
          <h2>Recuperar Contraseña</h2>
          <form onSubmit={Enviar}>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Escribe tu correo"

            />
            <br/>
            <button type="submit">Enviar enlace</button>
          </form>

          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <br/>

        <Link to='/'>Regresar</Link>

    </div>
  );
}

export default CambiarContrasenia;
