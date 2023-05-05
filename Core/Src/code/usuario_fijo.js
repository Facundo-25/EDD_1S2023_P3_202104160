 class UsuarioF {
  constructor(nombre, carnet, password, index, encriptado) {
    this.nombre = nombre;
    this.carnet = carnet;
    this.password = password;
    this.index = index;
    this.encriptado = encriptado;
    this.carpetas = new Tree_Enario();
  }
}