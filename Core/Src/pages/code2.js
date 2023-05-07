function F_CerrarSesion(){
    window.location.href = '../../index.html';
}



function F_ReporteChats(){
    
  var   codigoGraphviz = generarDotCodeDesdeLocalStorage();

  // Generar la imagen con Graphviz utilizando la librería Viz.js
  var imagen = Viz(codigoGraphviz);
  
  // Agregar la imagen al contenedor en la página HTML
  document.getElementById('graph').innerHTML = imagen;
}




function generarDotCodeDesdeLocalStorage() {
  // Obtener la matriz "mensajeria" del localStorage
  let mensajeria = JSON.parse(localStorage.getItem('mensajeria'));

  let dotCode = "digraph G {\n";
  dotCode += 'node [shape=record];\n';

  // Iterar sobre cada objeto en la matriz "mensajeria"
  for (let i = 0; i < mensajeria.length; i++) {
    let obj = mensajeria[i];

    // Crear un nodo para el objeto
    let node = "node" + i;
    dotCode += node + ' [label="{Index: ' + i + '|';
    dotCode += 'TimeStamp: ' + obj.Timestamp + '|';
    dotCode += 'Emisor: ' + obj.Transmitter + '|';
    dotCode += 'Receptor: ' + obj.Receiver + '|';
    dotCode += 'Mensaje: ' + obj.Message_E + '|';
    dotCode += 'PreviousHash: ' + obj.PreviusHash + '|';
    dotCode += 'Hash: ' + obj.Hash + '}"];\n';

    // Crear una arista entre el nodo actual y el nodo anterior (si existe)
    if (i > 0) {
      let prevNode = "node" + (i - 1);
      dotCode += prevNode + ' -> ' + node + ';\n';
    }
  }

  dotCode += '}';

  return dotCode;
}







function F_LimpiezaLocal(){
    localStorage.clear();
}




function F_filltableHash(){
    
    
   //CREACION DEL OBJETO BLOCKCHAIN
   const blockchain = new BlockChain();
    
    localStorage.setItem('blockChain', JSON.stringify(blockchain));

    
    localStorage.setItem("mensajeria", JSON.stringify([]));

    
    localStorage.setItem("count", -1);
    
    
    
    const tablaHash = new HashTable();
    
    const matrizDatos = JSON.parse(localStorage.getItem('temp_table_inorden'));
    
    
    //LLENADO DE LA TABLA HASH
    matrizDatos.forEach((usuarioActual, index) => {        
        tablaHash.insert(usuarioActual.carnet, usuarioActual.nombre, usuarioActual.password);
    });
    
    console.log(tablaHash);
    
    
    let vectorhash = tablaHash.returnVector();
    

    llenarTablaUsuarios(vectorhash);
    
    
    //localStorage.setItem("tabla_permisos", []);
}



function F_filltableInOrden(){
    
    let tree = make_graphviz(JSON.parse(localStorage.getItem('usuarios')));
    
    inOrder_List(tree.root);
    
    fill_tableInorden();    
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
      const datos = JSON.parse(contenido).alumnos;
      
        
        
      // Recorre el arreglo de objetos y los agrega a la matriz de usuarios
      for (let i = 0; i < datos.length; i++) {
        const usuario = datos[i];
        insertUser(usuario.nombre, usuario.carnet, usuario.password, usuario.carpetaRaiz, i+1);
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




function anterior(){
    
    let tabla = document.querySelector('.tabla_reporte');
    let index = tabla.rows[0].cells[1].textContent;    
    let numeroInt = parseInt(index);
    numeroInt = numeroInt -1;
    
    if(numeroInt < 0 ){
        alert("Ya no se tienen registros");
    } else {
        
      let mensajes = JSON.parse(localStorage.getItem("mensajeria"));
      let primerMensaje = mensajes[numeroInt];
      document.querySelector(".tabla_reporte tr:nth-child(1) td:nth-child(2)").textContent = primerMensaje.index;
      document.querySelector(".tabla_reporte tr:nth-child(2) td:nth-child(2)").textContent = primerMensaje.Timestamp;
      document.querySelector(".tabla_reporte tr:nth-child(3) td:nth-child(2)").textContent = primerMensaje.Transmitter;
      document.querySelector(".tabla_reporte tr:nth-child(4) td:nth-child(2)").textContent = primerMensaje.Receiver;
      document.querySelector(".tabla_reporte tr:nth-child(5) td:nth-child(2)").textContent = primerMensaje.Message;
      document.querySelector(".tabla_reporte tr:nth-child(6) td:nth-child(2)").textContent = primerMensaje.PreviusHash;
      document.querySelector(".tabla_reporte tr:nth-child(7) td:nth-child(2)").textContent = primerMensaje.Hash;
    }
}

function siguiente(){
    let tabla = document.querySelector('.tabla_reporte');
    let index = tabla.rows[0].cells[1].textContent;    
    let numeroInt = parseInt(index);
    numeroInt = numeroInt + 1;
    
        if(localStorage.getItem("mensajeria")){
            let mensajes = JSON.parse(localStorage.getItem("mensajeria"));
            if(mensajes.length > numeroInt){
                let primerMensaje = mensajes[numeroInt];
                document.querySelector(".tabla_reporte tr:nth-child(1) td:nth-child(2)").textContent = primerMensaje.index;
                document.querySelector(".tabla_reporte tr:nth-child(2) td:nth-child(2)").textContent = primerMensaje.Timestamp;
                document.querySelector(".tabla_reporte tr:nth-child(3) td:nth-child(2)").textContent = primerMensaje.Transmitter;
                document.querySelector(".tabla_reporte tr:nth-child(4) td:nth-child(2)").textContent = primerMensaje.Receiver;
                document.querySelector(".tabla_reporte tr:nth-child(5) td:nth-child(2)").textContent = primerMensaje.Message_E;
                document.querySelector(".tabla_reporte tr:nth-child(6) td:nth-child(2)").textContent = primerMensaje.PreviusHash;
                document.querySelector(".tabla_reporte tr:nth-child(7) td:nth-child(2)").textContent = primerMensaje.Hash;
            } else {
                alert("Ya no se tiene registros");
            }
        } else {
            alert("No hay datos en el almacenamiento local");
        }
    
}



function nodoInicial(){
    // Obtener la matriz de mensajes del local storage
    let mensajes = JSON.parse(localStorage.getItem("mensajeria"));

    // Si la matriz existe y no está vacía
    if (mensajes && mensajes.length > 0) {
      // Obtener el primer objeto de la matriz
      let primerMensaje = mensajes[0];

      // Actualizar el contenido de las celdas de la tabla con los valores del objeto
      document.querySelector(".tabla_reporte tr:nth-child(1) td:nth-child(2)").textContent = primerMensaje.index;
      document.querySelector(".tabla_reporte tr:nth-child(2) td:nth-child(2)").textContent = primerMensaje.Timestamp;
      document.querySelector(".tabla_reporte tr:nth-child(3) td:nth-child(2)").textContent = primerMensaje.Transmitter;
      document.querySelector(".tabla_reporte tr:nth-child(4) td:nth-child(2)").textContent = primerMensaje.Receiver;
      document.querySelector(".tabla_reporte tr:nth-child(5) td:nth-child(2)").textContent = primerMensaje.Message_E;
      document.querySelector(".tabla_reporte tr:nth-child(6) td:nth-child(2)").textContent = primerMensaje.PreviusHash;
      document.querySelector(".tabla_reporte tr:nth-child(7) td:nth-child(2)").textContent = primerMensaje.Hash;
    }
}
