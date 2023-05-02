const {insertUser} = require("../Code/files1");

function F_CerrarSesion(){
    window.location.href = '../../index.html';
}


function F_ReporteChats(){
    alert("Reporte de Chats Esperando Instrucciones");
}


function F_CargaMasiva() {
  // Crea un elemento de tipo 'input' de tipo 'file'
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json'; // Solo se permiten archivos de tipo JSON

  // Escucha el evento 'change' del elemento 'input'
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Crea un objeto FileReader
    const reader = new FileReader();

    // Escucha el evento 'load' del objeto FileReader
    reader.addEventListener('load', (event) => {
      const contenido = event.target.result;
      // Analiza el contenido del archivo como JSON
      const datos = JSON.parse(contenido);
      
      // Recorre el arreglo de objetos y los agrega a la matriz de usuarios
      for (let i = 0; i < datos.length; i++) {
        const usuario = datos[i];
        insertUser(usuario.nombre, usuario.carnet, usuario.password, usuario.carpetaRaiz);
      }
      
      // Muestra un mensaje indicando que se han cargado los usuarios
      alert(`Se han cargado ${datos.length} usuarios.`);
    });

    // Lee el contenido del archivo como texto
    reader.readAsText(file);
  });

  // Hace clic en el elemento 'input' para abrir el selector de archivos
  input.click();
}
