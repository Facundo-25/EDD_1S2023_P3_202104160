function F_CerrarSesion(){
    window.location.href = '../../index.html';
}


function F_ReporteChats(){
    showUser();
}


function F_LimpiezaLocal(){
    localStorage.clear();
}




function F_filltableHash(){
    
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
