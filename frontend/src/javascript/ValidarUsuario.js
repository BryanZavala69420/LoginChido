function ValidarUsuario(valores){
    let errores = {};
  if (!valores.usuario) errores.nombre = "Nombre requerido";
if (!valores.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.correo)) {
  errores.correo = "Correo inválido";
}



  if (!valores.fecha_nac) errores.fecha_nac = "Fecha requerida";
if (valores.constrasena.length < 8) errores.constrasena = "Mínimo 8 caracteres";

  return errores;


}
export default ValidarUsuario;