// ACTUALIZA LA TABLA HTML
function option1(){   
    var temp1_o1 = JSON.parse(sessionStorage.getItem("file_contents"));  //VARIABLE que almacena la información del json
    var var_valorseleccionado = valorseleccionado();                      //VARIABLE que almacena la forma en que se debe de ordenar
    let matrizAlumnos = temp1_o1.alumnos;                                 //Variable que almacena la información de los estudiantes

    sessionStorage.setItem("Matriz_Alumnos", JSON.stringify(matrizAlumnos));  //SE almacena en sessionStorage la matriz de los alumnos

    var tree = make_graphviz(matrizAlumnos);                              //VARIABLE que almacena el arbol AVL
    

    //proceso para actualizar la tabla en el html2 (SUPPORT1)    
    title_table(var_valorseleccionado);
    actualizarTabla(var_valorseleccionado,tree);   

}

//SE UTILIZA PARA MOSTRAR EL GRAFO DE
function option2(){

  // Definir el código de Graphviz para generar la imagen
  var codigoGraphviz = sessionStorage.getItem("Adminstrador_Graphviz");
  console.log(codigoGraphviz);
  

  // Generar la imagen con Graphviz utilizando la librería Viz.js
  var imagen = Viz(codigoGraphviz);
  
  // Agregar la imagen al contenedor en la página HTML
  document.getElementById('graph').innerHTML = imagen;
}


// CARGAR ARCHIVO (X)
function option3() {
  console.log("Option 3 - Cargar Archivo");

  var archivo = document.getElementById("seleccionador-archivos").files[0];  //Obtiene el archivo mediante el el input type="file" con id="seleccionador-archivos"
  var lector = new FileReader();  //Se crea el archivo filereader

  lector.onload = function(evento) {
    var contenido = evento.target.result;
    sessionStorage.setItem("file_contents",contenido);
  }
  lector.readAsText(archivo);

  alert('Se ha cargado el archivo');
}



// CERRAR SESIÓN (X)
function option4(){
  console.log("Option 3 - Cerrar Sesión");
    window.location.href = '../index.html';   
}




/*

function generarDot(node) {
  if (node === null) {
    return "";
  }

  let dotString = "";

  if (node.left !== null) {
    dotString += `${node.key} -> ${node.left.key};\n`;
    dotString += generarDot(node.left);
  }

  if (node.right !== null) {
    dotString += `${node.key} -> ${node.right.key};\n`;
    dotString += generarDot(node.right);
  }

  return dotString;
}

// Llamada inicial para generar el string .dot
const dotString = `digraph G {\n${generarDot(tree.root)}}`;

sessionStorage.setItem("Adminstrador_Graphviz",dotString);

console.log(dotString);

*/