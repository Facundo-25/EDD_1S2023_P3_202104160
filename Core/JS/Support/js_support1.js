//FUNCIÓN QUE ACTUALIZA LOS DATOS DE LA TABLA
function actualizarTabla(forma,arbol) {
    
    let datos = [];

    if(forma == "In-Orden"){
      console.log("Se imprimirá la matriz en su forma In-Orden");
      var datos_temp = [];
      sessionStorage.setItem("temp_table_inorden", JSON.stringify(datos_temp));
      inOrder_List(arbol.root);
      datos = JSON.parse(sessionStorage.getItem("temp_table_inorden"));
      console.log(datos);
    } else if(forma == "Post-Orden") {
      console.log("Se imprimirá la matriz en su forma Post-Orden");
      var datos_temp = [];
      sessionStorage.setItem("temp_table_postorden", JSON.stringify(datos_temp));
      postOrder_List(arbol.root);
      datos = JSON.parse(sessionStorage.getItem("temp_table_postorden"));
      console.log(datos);
    } else if(forma == "Pre-Orden"){
      console.log("Se imprimirá la matriz en su forma Pre-Orden");
      var datos_temp = [];
      sessionStorage.setItem("temp_table_preorden", JSON.stringify(datos_temp));
      preOrder_List(arbol.root);
      datos = JSON.parse(sessionStorage.getItem("temp_table_preorden"));
      console.log(datos);
    } else if(forma == "Original"){
      console.log("Se imprimirá la matriz en su forma original");
      datos = JSON.parse(sessionStorage.getItem("Matriz_Alumnos"));
    }

    
    
    const tabla = document.getElementById('tabla-datos');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';
    
    datos.forEach(dato => {
      const fila = document.createElement('tr');
      const celdaNombre = document.createElement('td')
      celdaNombre.textContent = dato.nombre;
      fila.appendChild(celdaNombre);
      
      const celdaEdad = document.createElement('td');
      celdaEdad.textContent = dato.carnet;
      fila.appendChild(celdaEdad);
      
      
      
      tbody.appendChild(fila);
    });

    
  }
  //FUNCIÓN PARA ORBENTER EL VALOR SELECCIONADO
  function valorseleccionado(){
  
    // Obtener el elemento select por su clase
    const selectElement = document.querySelector('.custom-select');
  
    // Obtener el valor seleccionado
    const selectedValue = selectElement.value;
  
    return selectedValue;
  }
  //TITULO DE LA TABLA 
  function title_table(variable){
    var var1_stato = variable;
    document.querySelector("#tabla-datos thead th").textContent = var1_stato;
  }
  




function preOrder_List(node) {
		if (node != null) {
      // Obtener el valor almacenado en sessionStorage
      var tempTablePreorden = sessionStorage.getItem("temp_table_preorden");

      // Convertir el valor en una matriz (si no existe, crear una nueva matriz vacía)
      var tempTablePreordenArray = JSON.parse(tempTablePreorden) || [];

      // Agregar un objeto a la matriz
      tempTablePreordenArray.push(node.key);

      // Almacenar la matriz actualizada en sessionStorage
      sessionStorage.setItem("temp_table_preorden", JSON.stringify(tempTablePreordenArray));


			
			preOrder_List(node.left);
			preOrder_List(node.right);
		}
		}


    function inOrder_List(node) {
      if (node != null) {
        
        // Recorrer el subárbol derecho en In-Orden
        inOrder_List(node.left);
        


        // Obtener el valor almacenado en sessionStorage
        var tempTableInOrden = sessionStorage.getItem("temp_table_inorden");
    
        // Convertir el valor en una matriz (si no existe, crear una nueva matriz vacía)
        var tempTableInOrdenArray = JSON.parse(tempTableInOrden) || [];
    
        // Recorrer el subárbol izquierdo en In-Orden
        inOrder_List(node.left);
    
        // Agregar el valor del nodo actual a la matriz
        tempTableInOrdenArray.push(node.key);
    
        // Almacenar la matriz actualizada en sessionStorage
        sessionStorage.setItem("temp_table_inorden", JSON.stringify(tempTableInOrdenArray));
        
        inOrder_List(node.right);

      }
    }


    function postOrder_List(node) {
      if (node != null) {
        
        // Recorrer el subárbol derecho en In-Orden
        postOrder_List(node.left);
        postOrder_List(node.right);


        // Obtener el valor almacenado en sessionStorage
        var tempTableInOrden = sessionStorage.getItem("temp_table_postorden");
    
        // Convertir el valor en una matriz (si no existe, crear una nueva matriz vacía)
        var tempTableInOrdenArray = JSON.parse(tempTableInOrden) || [];
    
        // Recorrer el subárbol izquierdo en In-Orden
        inOrder_List(node.left);
    
        // Agregar el valor del nodo actual a la matriz
        tempTableInOrdenArray.push(node.key);
    
        // Almacenar la matriz actualizada en sessionStorage
        sessionStorage.setItem("temp_table_postorden", JSON.stringify(tempTableInOrdenArray));
        

      }
    }
    






  //GENERACIÓN DE ARCHIVO GRAPHVIZ  (X)
  function make_graphviz(lista){

    let tree = new AVLTree(); 
    let users = [];
    let users_folders = [];

    let count= 1;
    lista.forEach(alumno=> {
      tree.root = tree.insert(tree.root, new Estudiante(alumno.nombre,alumno.carnet,alumno.password,count) );
      users.push(new Estudiante(alumno.nombre,alumno.carnet,alumno.password,count));
      users_folders.push(new Info_Enario(alumno.carnet));
      count++;
    });
    sessionStorage.setItem("Matriz_Usuarios",JSON.stringify(users));
    sessionStorage.setItem("Matriz_Usuarios_Carpetas",JSON.stringify(users_folders));
    // Llamada inicial para generar el string .dot
    const dotString = `digraph G {\n label=\"Arbol AVL\";  \n  labelloc=top;   \n  labeljust=center; \n labelbgcolor=white;  \n   fontsize=18; bgcolor="#3d3f3d"; \n node[style=filled, color="#226DC3", fontname="Times New Roman", fontsize=12]; \n  edge[color="#FCE308"];  \n ${generarDot(tree.root)}}`;
    sessionStorage.setItem("Adminstrador_Graphviz",dotString);    

    return tree;
  }

  //GENERACIÓN DEL ARCHIVO .DOT
  function generarDot(node) {
    if (node === null) {
      return "";
    }
  
    let dotString = "";

    dotString += Info_Node(node);
 
    if (node.left !== null) {
      dotString += `${node.key.id} -> ${node.left.key.id};\n`;
      dotString += generarDot(node.left);
    }
  
    if (node.right !== null) {
      dotString += `${node.key.id} -> ${node.right.key.id};\n`;
      dotString += generarDot(node.right);
    }
  
    return dotString;
  }

  //DEVUELVE EL STRING CON LA INFORMAICÓN DE CADA NODO PARA GRAPHVIZ EXAMPLE("1[label="Steven 202104160 null "])
  function Info_Node(node) {
		let AREA = "";
		if (node != null) {
			AREA += node.key.id + '[label=" Nombre: '+node.key.nombre+' \n Carnet: '+node.key.carnet+' \n Altura: '+node.height+' "];\n';
			this.Info_Node(node.left);
			this.Info_Node(node.right);
		}
		return AREA;
		}
  
  



