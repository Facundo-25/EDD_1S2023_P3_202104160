  //GENERACIÓN DE ARCHIVO GRAPHVIZ  (X)
  function make_graphviz(lista){

    let tree = new AVLTree(); 

    let count= 1;
    lista.forEach(alumno=> {
      tree.root = tree.insert(tree.root, new Usuario(alumno.nombre,alumno.carnet,alumno.password,alumno.carpetaRaiz,count) );  
      count++;
    });
      
    
    let dotString = `digraph G {\n label=\"Arbol AVL\";  \n  labelloc=top;   \n  labeljust=center; \n labelbgcolor=white;  \n   fontsize=18; bgcolor="#3d3f3d"; \n node[style=filled, color="#226DC3", fontname="Times New Roman", fontsize=12]; \n  edge[color="#FCE308"];  \n ${generarDot(tree.root)}}`;
      
    //show_div(dotString);

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







//ARBOL AVL

	class Node {
		constructor(d) {
		this.key = d;
		this.height = 1;
		this.left = null;
		this.right = null;
		}
	}

	class AVLTree {
		constructor() {
		this.root = null;
		}

		// A utility function to get
		// the height of the tree
		height(N) {
		if (N == null) return 0;

		return N.height;
		}

		// A utility function to get
		// maximum of two integers
		max(a, b) {
		return a > b ? a : b;
		}

		// A utility function to right
		// rotate subtree rooted with y
		// See the diagram given above.
		rightRotate(y) {
		var x = y.left;
		var T2 = x.right;

		// Perform rotation
		x.right = y;
		y.left = T2;

		// Update heights
		y.height = this.max(this.height(y.left),
		this.height(y.right)) + 1;
		x.height = this.max(this.height(x.left),
		this.height(x.right)) + 1;

		// Return new root
		return x;
		}

		// A utility function to left
		// rotate subtree rooted with x
		// See the diagram given above.
		leftRotate(x) {
		var y = x.right;
		var T2 = y.left;

		// Perform rotation
		y.left = x;
		x.right = T2;

		// Update heights
		x.height = this.max(this.height(x.left),
		this.height(x.right)) + 1;
		y.height = this.max(this.height(y.left),
		this.height(y.right)) + 1;

		// Return new root
		return y;
		}

		// Get Balance factor of node N
		getBalance(N) {
		if (N == null) return 0;

		return this.height(N.left) - this.height(N.right);
		}

		insert(node, key) {
		/* 1. Perform the normal BST insertion */
		if (node == null) return new Node(key);

		if (key.id < node.key.id)
		node.left = this.insert(node.left, key);
		else if (key.id > node.key.id)
		node.right = this.insert(node.right, key);
		// Duplicate keys not allowed
		else return node;

		/* 2. Update height of this ancestor node */
		node.height =
			1 + this.max(this.height(node.left),
				this.height(node.right));

		/* 3. Get the balance factor of this ancestor
			node to check whether this node became
			unbalanced */
		var balance = this.getBalance(node);

		// If this node becomes unbalanced, then there
		// are 4 cases Left Left Case
		if (balance > 1 && key.id < node.left.key.id)
		return this.rightRotate(node);

		// Right Right Case
		if (balance < -1 && key.id > node.right.key.id)
			return this.leftRotate(node);

		// Left Right Case
		if (balance > 1 && key.id > node.left.key.id) {
			node.left = this.leftRotate(node.left);
			return this.rightRotate(node);
		}

		// Right Left Case
		if (balance < -1 && key.id < node.right.key.id) {
			node.right = this.rightRotate(node.right);
			return this.leftRotate(node);
		}

		/* return the (unchanged) node pointer */
		return node;
		}
	}



function inOrder_List(node) {
  if (node != null) {
    // Recorrer el subárbol izquierdo en In-Orden
    inOrder_List(node.left);

    // Obtener el valor almacenado en localStorage
    var tempTableInOrden = localStorage.getItem("temp_table_inorden");

    // Convertir el valor en una matriz (si no existe, crear una nueva matriz vacía)
    var tempTableInOrdenArray = JSON.parse(tempTableInOrden) || [];

    // Agregar el valor del nodo actual a la matriz
    tempTableInOrdenArray.push(node.key);

    // Almacenar la matriz actualizada en localStorage
    localStorage.setItem("temp_table_inorden", JSON.stringify(tempTableInOrdenArray));

    // Recorrer el subárbol derecho en In-Orden
    inOrder_List(node.right);
  }
}


  


//MOSTRAR EN EL DIV
function show_div(archivo){
var codigoGraphviz = archivo;
console.log(codigoGraphviz);

var imagen = Viz(codigoGraphviz, { format: 'jpeg' });
document.getElementById('graph').innerHTML = imagen;

// Crear un objeto Blob con la imagen generada por Viz.js
var blob = new Blob([imagen], { type: 'image/jpeg' });

// Crear una URL descargable a partir del objeto Blob
var url = URL.createObjectURL(blob);

// Crear un enlace para descargar la imagen
var link = document.createElement('a');
link.href = url;
link.download = 'nombre_de_archivo.jpg';

// Simular un clic en el enlace para iniciar la descarga
link.click();

// Liberar la URL creada con URL.createObjectURL()
URL.revokeObjectURL(url);

}




function fill_tableInorden(){
  // Obtener la referencia a la tabla y el cuerpo de la misma
  const tabla = document.getElementById('tabla-datos');
  const cuerpoTabla = tabla.getElementsByTagName('tbody')[0];

  // Obtener la matriz de datos desde el localStorage
  const matrizDatos = JSON.parse(localStorage.getItem('temp_table_inorden'));

  // Recorrer la matriz y crear una fila por cada elemento
  matrizDatos.forEach((fila) => {
    // Crear una nueva fila y agregarla al cuerpo de la tabla
    const nuevaFila = cuerpoTabla.insertRow();

    // Crear celdas para cada valor de la fila y agregarlas a la fila
    const celdaCarnet = nuevaFila.insertCell();
    celdaCarnet.innerHTML = fila.carnet;

    const celdaNombre = nuevaFila.insertCell();
    celdaNombre.innerHTML = fila.nombre;

    const celdaPassword = nuevaFila.insertCell();
    celdaPassword.innerHTML = fila.password;
      
      
  tabla.style.height = "300px"; // ajustar la altura deseada
  tabla.style.overflowY = "auto"; // remover la propiedad overflow-y
      
 
  });
    
}












function llenarTablaUsuarios(datosUsuarios) {
  // Paso 1: Obtener la referencia de la tabla y del cuerpo de la tabla
  const tabla = document.getElementById("tabla-datos2");
  const cuerpoTabla = tabla.getElementsByTagName("tbody")[0];

  // Paso 2: Iterar a través del vector de objetos de usuario
  datosUsuarios.forEach((usuario) => {
    // Paso 3: Crear una nueva fila y las celdas correspondientes para cada atributo del objeto de usuario
    const fila = document.createElement("tr");
    const celdaCarnet = document.createElement("td");
    const celdaNombre = document.createElement("td");
    const celdaPassword = document.createElement("td");

    // Agregar el contenido a las celdas
    celdaCarnet.innerText = usuario.carnet;
    celdaNombre.innerText = usuario.nombre;
    celdaPassword.innerText = usuario.encriptado;

    // Paso 4: Agregar cada celda a la fila y agregar la fila al cuerpo de la tabla
    fila.appendChild(celdaCarnet);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPassword);
    cuerpoTabla.appendChild(fila);
  });
}






