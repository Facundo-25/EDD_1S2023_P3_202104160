 class Usuario {
  constructor(nombre, carnet, password, carpetaRaiz,id) {
    this.id = id;
    this.nombre = nombre;
    this.carnet = carnet;
    this.password = password;
    this.carpetaRaiz = carpetaRaiz;
    this.arbolito = new Tree_Enario();
  }
}