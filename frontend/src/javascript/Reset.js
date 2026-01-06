import React, { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import ValidarLogin from "./ValidarLogin";
import '../css/Reset.css';
import { Link } from "react-router";
import URLCHILA from "./CocoDelTF2we";
function Reset() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});

  // obtener el token del URL
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  // enviar la petición al servidor
  const Enviar = async (e) => {
    e.preventDefault();

    // Validar la contraseña con tu función de ValidarLogin
    const validacion = ValidarLogin({ contrasena: password });
    setErrores(validacion);

    // Verifica que no haya errores antes de continuar
    if (validacion.contrasena === "") {
      try {
        const res = await axios.post(`${URLCHILA}/NuevaContrasenia`, {
          token,
          nuevaContrasena: password,
        });

        setMensaje(res.data.mensaje);
      } catch (err) {
        setMensaje("Error al cambiar la contraseña");
      }
    } else {
      setMensaje(validacion.contrasena); // muestra el error del patrón
    }
  };

  return (
    <div className="todosito">


      <div className="formulariochilo">
        <form onSubmit={Enviar}>
          <h2> Reestablecer contraseña</h2>
          
          <p>Escribe tu nueva contraseña</p>
          <br />
          <input
           class="controlito"
           type="password"
            value={password}
            placeholder="Nueva contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button class="botonbonito" type="submit">Cambiar contraseña</button>
        </form>

        {<p style={{ color: "red" }}>{errores.contrasena}</p>}
        <Link to="/"> Regresar </Link>

      </div>
    </div>
  );
}

export default Reset;
