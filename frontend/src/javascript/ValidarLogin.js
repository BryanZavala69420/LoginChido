function ValidarLogin(valores){
let errores = {};
  
    const PatronDelCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PatronDeLaContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (valores.correo === "") {
      errores.correo = "El correo no debe de estar vacío";
    } else if (!PatronDelCorreo.test(valores.correo)) {
      errores.correo = "El correo no tiene un formato válido";
    } else {
      errores.correo = "";
    }
  
    if (valores.contrasena === "") {
      errores.contrasena = "La contraseña no debe estar vacía";
    } else if (!PatronDeLaContrasena.test(valores.contrasena)) {
      errores.contrasena =
        "Contraseña incorrecta";
    } else {
      errores.contrasena = "";
    }
  
    return errores;

}

export default ValidarLogin;