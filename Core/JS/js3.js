// CREAR CARPETAS
function option1(){

    //VACIA EL DIV
    var divCarpetas = document.getElementById("carpetas");
    divCarpetas.innerHTML = "";


    //OBTENIENDO EL VALOR DE LA NAVEGACIÓN
    var labelElement = document.querySelector('.etiqueta');
    var textoLabel = labelElement.value;
    


    //OBTENIENDO EL NUEVO NOMBRE
    var textboxElement = document.querySelector('.textbox');
    var textoTextbox = textboxElement.value;


    //SE INSERTA LA CARPETA AL ARBOL 
    carpetas.insert(textoTextbox,textoLabel);
    
    
    //MUESTRA LO QUE ESTA EN LAS CARPETAS
    carpetas.getHTML(textoLabel);  
    
  }
  



    
// ELIMINAR CARPETAS
function option2(){

    var textbox = document.getElementById("nombre_carpeta2");
    var texto = textbox.value;
    
    var labelElement = document.querySelector('.etiqueta');
    var textoLabel = labelElement.value;


    carpetas.Delete_Node(textoLabel,texto);

    //VACIA EL DIV
    var divCarpetas = document.getElementById("carpetas");
    divCarpetas.innerHTML = "";

    
    //MUESTRA LO QUE ESTA EN LAS CARPETAS
    carpetas.getHTML(textoLabel);
  }


function option3() {
    

    
  // Vaciar el div de la página
  const divCarpetas = document.getElementById("carpetas");
  divCarpetas.innerHTML = "";

  // Obtener el valor de la navegación
  const labelElement = document.querySelector('.etiqueta');
  const textoLabel = labelElement.value;
  console.log("Valor de la etiqueta: ", textoLabel);

  // Obtener el nuevo nombre
  const textbox = document.getElementById("nombre_carpeta3");
  const texto = textbox.value;
  console.log("Nuevo nombre de carpeta: ", texto);

  // Obtener el archivo seleccionado
  const archivo = document.getElementById("seleccionador-archivos").files[0];

  // Verificar si se seleccionó un archivo
  if (!archivo) {
    alert("Por favor seleccione un archivo.");
    return;
  }

  // Crear un FileReader
  const lector = new FileReader();

  lector.onload = function(evento) {
    const contenido = evento.target.result;
    sessionStorage.setItem("file_contents", contenido);

    // Obtener la extensión del archivo
    const extension = archivo.name.split(".").pop().toUpperCase();
    console.log("Formato del archivo: ", extension);

    

    carpetas.insert2(texto , textoLabel , extension);
      
      
    //MUESTRA LO QUE ESTA EN LAS CARPETAS
    carpetas.getHTML(textoLabel);

  };

  lector.onerror = function() {
    alert("Error al cargar el archivo.");
  };

  // Leer el archivo como texto
  lector.readAsText(archivo);
}




function option4(){

  console.log("Option 4 - Mostrar Arbol");


  //insert_arbolito(Usuario_Actual_W.carnet,Usuario_Actual_W.carpetas);

  //let cadena = matriz_carpetas(Usuario_Actual_W.carnet);
  //let cadena = carpetas.graph();

  
  /*
  let dotString = `digraph G {\n  label=\"Arbol N-Ario\";  \n  labelloc=top;   \n  labeljust=center; \n labelbgcolor=white;  \n   fontsize=18; bgcolor="#3d3f3d"; \n node[style=filled, color="#226DC3", fontname="Times New Roman", fontsize=12]; \n  edge[color="#FCE308"];  \n ${cadena}}`;
   */
 
    let dotString = carpetas.graphNoDirigido();

    console.log(dotString);
   // Generar la imagen con Graphviz utilizando la librería Viz.js
   var imagen = Viz(dotString);
  
   // Agregar la imagen al contenedor en la página HTML
   document.getElementById('graph_f3').innerHTML = imagen;    
}




function option5(){
  console.log("Option 5 - EXPERANDO INSTRUCIION");  
}




function option6(){
      window.location.href = '../../index.html';   
  }






// VOLVER AL INICIO EN EL PATH
function option7(){

  //VACIA EL DIV
  var divCarpetas = document.getElementById("carpetas");
  divCarpetas.innerHTML = "";


  var input = document.querySelector(".etiqueta"); // seleccionamos el elemento input por su clase CSS
  input.value = "/"; // modificamos el valor del input


  
  carpetas.getHTML("/");


}




function buscar(){
    //VACIA EL DIV
    var divCarpetas = document.getElementById("carpetas");
    divCarpetas.innerHTML = "";
    
    //OBTENIENDO EL VALOR DE LA NAVEGACIÓN
    var labelElement = document.querySelector('.etiqueta');
    var textoLabel = labelElement.value;
    
    
    carpetas.getHTML(textoLabel);
}












function crearCarpeta() {
  var folderName = document.getElementById('folder-name-input').value;
  if (folderName.trim() === '') {
    alert('Por favor ingrese un nombre para la carpeta.');
    return;
  }

  var newButton = document.createElement('button');
  newButton.className = 'custom-button';
  newButton.innerHTML = `
    <img src="../Pictures/Icon7.png" class="button-image" alt="Imagen de Carpeta 1">
    <span class="button-text">${folderName}</span>
  `;
  
  document.getElementById('carpetas').appendChild(newButton);
}









function editarLabel(texto) {
  var label = document.getElementById("Label_Compartido");
  label.innerText = texto;
}










function Insertar_Carpeta_Div(nombre_del_div, type) {
  // Obtén el valor de la variable nombre_variable (reemplaza esto con tu lógica de obtención del valor)
  var nombre_variable = nombre_del_div; // Ejemplo de texto dinámico

  // Crea un nuevo div
  var nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'carpeta';

  // Crea una imagen y asigna la ruta de la imagen a la fuente (src)
  var nuevaImagen = document.createElement('img');

  if (type === '-') {
    nuevaImagen.src = '../Pictures/IconA.png';
    nuevoDiv.addEventListener('click', function() {
      
        editarLabel(nombre_del_div);
        
        //VACIA EL DIV
           var divCarpetas = document.getElementById("carpetas");
           divCarpetas.innerHTML = "";

            var labelElement = document.querySelector('.etiqueta');
            var textoLabel = labelElement.value;


            if(textoLabel == "/"){
              textoLabel = textoLabel+nombre_variable;
            } else {

              textoLabel = textoLabel+"/"+nombre_variable;

            }

        
        
        labelElement.value = textoLabel // modificamos el valor del input
        
        
        
        carpetas.getHTML(textoLabel);  
        
    });
  } else if (type === 'PNG') {
    nuevaImagen.src = '../Pictures/IconB.png';
    nuevoDiv.addEventListener('click', function() {
      // Función para manejar eventos de click
      alert('Error al abrir el archivo PNG');
        editarLabel(nombre_del_div+"."+type);
    });
  } else if (type === 'TXT') {
    nuevaImagen.src = '../Pictures/IconC.png';
    nuevoDiv.addEventListener('click', function() {
      // Función para manejar eventos de click
        editarLabel(nombre_del_div+"."+type);
      alert('Error al abrir el archivo TXT');
    });
  } else if (type === 'PDF') {
    nuevaImagen.src = '../Pictures/IconD.png';
    nuevoDiv.addEventListener('click', function() {
      // Función para manejar eventos de click
        editarLabel(nombre_del_div+"."+type);
      alert('Error al abrir el PDF');
    });
  } else {
    nuevaImagen.src = '';
    alert("Error al abrir archivo");
  }

  nuevaImagen.width = 30; // Establecer ancho en 15px
  nuevaImagen.height = 30; // Establecer alto en 15px

  // Crea un elemento de texto (p) y asigna el valor de la variable nombre_variable como su contenido
  var nuevoTexto = document.createElement('p');
  nuevoTexto.textContent = nombre_variable;
  nuevoTexto.style.color = 'white';

  // Agrega la imagen y el texto al div creado anteriormente
  nuevoDiv.appendChild(nuevaImagen);
  nuevoDiv.appendChild(nuevoTexto);

  // Agrega el nuevo div al div con el id "carpetas"
  var carpetasDiv = document.getElementById('carpetas');
  carpetasDiv.appendChild(nuevoDiv);
}








/*


function Insertar_Carpeta_Div(nombre_del_div){
       

  // Obtén el valor de la variable nombre_variable (reemplaza esto con tu lógica de obtención del valor)
  var nombre_variable = nombre_del_div; // Ejemplo de texto dinámico

  // Crea un nuevo div
  var nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'carpeta';

  // Crea una imagen y asigna la ruta de la imagen a la fuente (src)
  var nuevaImagen = document.createElement('img');
  nuevaImagen.src = '../Pictures/Icon7.png';
  nuevaImagen.width = 30; // Establecer ancho en 15px
  nuevaImagen.height = 30; // Establecer alto en 15px

  // Crea un elemento de texto (p) y asigna el valor de la variable nombre_variable como su contenido
  var nuevoTexto = document.createElement('p');
  nuevoTexto.textContent = nombre_variable;
  nuevoTexto.style.color = 'white';

  // Agrega la imagen y el texto al div creado anteriormente
  nuevoDiv.appendChild(nuevaImagen);
  nuevoDiv.appendChild(nuevoTexto);

  // Agrega el nuevo div al div con el id "carpetas"
  var carpetasDiv = document.getElementById('carpetas');
  carpetasDiv.appendChild(nuevoDiv);

  // Agrega un evento de clic al nuevo div para mostrar el valor de la variable nombre_variable
  nuevoDiv.addEventListener('click', function() {

   //VACIA EL DIV
   var divCarpetas = document.getElementById("carpetas");
   divCarpetas.innerHTML = "";

    var labelElement = document.querySelector('.etiqueta');
    var textoLabel = labelElement.textContent;


    if(textoLabel == "/"){
      textoLabel = textoLabel+nombre_variable;
    } else {

      textoLabel = textoLabel+"/"+nombre_variable;

    }

    

    




    labelElement.textContent = textoLabel;

    Usuario_Actual_W.carpetas.getHTML(textoLabel);

    //alert(nombre_variable);
  });
}


*/



function optionA() {
    
    let matriz1 = JSON.parse(localStorage.getItem("tabla_permisos")) || []

    
    
  const propietario = Usuario_Actual_W.carnet;
  const destino = document.getElementById("usuario").value;
    
  //OBTENIENDO EL VALOR DE LA NAVEGACIÓN
  var labelElement = document.querySelector('.etiqueta');
  var ubicacion = labelElement.value;
    
  //OBTENIENDO EL VALOR DE LA NAVEGACIÓN
  const label = document.getElementById("Label_Compartido");
  const archivo = label.textContent;
  
  
    
  const lectura = document.getElementById("lectura").value;
  const escritura = document.getElementById("escritura").value;

    let permisos = "";

    if (lectura === "Si") {
      permisos += "r";
    }

    if (escritura === "Si") {
      permisos += "w";
    }

    
    const objeto1 = new node_permisos(propietario,destino,ubicacion,archivo,permisos);
    
    matriz1.push(objeto1);
    
    localStorage.setItem("tabla_permisos", JSON.stringify(matriz1));

}





class node_permisos{
    constructor(propietario, destino, ubicacion, archivo, permisos){
        this.propietario = propietario;
        this.destino = destino;
        this.ubicacion = ubicacion;
        this.archivo = archivo; 
        this.permisos = permisos;
    }
}




function getFormattedDateTime() {
  const date = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDateTime = date.toLocaleString('es-MX', options).replace(',', '');

  return formattedDateTime;
}




function increaseCount() {
  let count = localStorage.getItem("count");
  count++;
  localStorage.setItem("count", count);
  return count;
}



function generateHash(index, timestamp, transmitter, receiver, message) {
  const messageString = `${index}${timestamp}${transmitter}${receiver}${message}`;
  return CryptoJS.SHA256(messageString).toString();
}




function enviar(){
    
    const matriz_mensaje = JSON.parse(localStorage.getItem("mensajeria")) || [];
    
    
    const destino = document.getElementById("usuario2").value;
        
     //OBTENIENDO EL VALOR DE LA NAVEGACIÓN
    const label = document.getElementById("chat_mensajes");
    const mensaje = label.value;
  

    
    //alert("Enviando mensaje: "+destino+" contenido: "+mensaje);
    
    


    // Obtener el elemento div
            const chatDiv = document.querySelector('.chat_mensajeria');
    
    
     // En la página donde recuperas el objeto BlockChain:
            const blockchainData = JSON.parse(localStorage.getItem('blockChain'));
            const blockchain = new BlockChain();
            blockchain.chain = blockchainData.chain;
            blockchain.currentTransactions = blockchainData.currentTransactions;
    
    
    /*
    
     blockchain.insert(Usuario_Actual_W.carnet, destino, mensaje);
    
    
    
    const html_VAR = blockchain.getMessages(Usuario_Actual_W.carnet, destino);
    
    chatDiv.innerHTML = html_VAR;
    
    
    
    localStorage.setItem('blockChain', JSON.stringify(blockchain));
    
    
    */
    
    let countador = increaseCount();
    
    if(mensaje){
    
        const mens = {
            index: countador,
            Transmitter:   Usuario_Actual_W.carnet,
            Receiver: destino,
            Message:  mensaje,
            Message_E: cifrarConAES(mensaje),
            Timestamp: getFormattedDateTime(),
            PreviusHash : devolverpreviushash(countador, mensaje ,destino, Usuario_Actual_W.carnet),
            Hash: cifrarConAES(countador.toString()+ getFormattedDateTime() +Usuario_Actual_W.carnet + destino + mensaje  )
        }

         matriz_mensaje.push(mens);

         localStorage.setItem("mensajeria", JSON.stringify(matriz_mensaje));

        chatDiv.innerHTML = generarHTML(Usuario_Actual_W.carnet ,  destino  );

        label.value = "";
        
    } else {
        
        //alert("Debe ingresar un mensaje");
    }

}



function devolverpreviushash(index, mensaje){
    console.log(index);
    if(index == "0"){
        return "0000";
    } else {
        return cifrarConAES2(mensaje);
        
    }
    
}



    // Definir la función de cifrado
function cifrarConAES(contraseña) {
  // Definir la cadena de texto a cifrar
  const texto_claro = "Hola, este es mi mensaje secreto";

  // Convertir la contraseña y el vector de inicialización a formatos compatibles con CryptoJS
  const clave = CryptoJS.enc.Utf8.parse(contraseña);
  const iv = CryptoJS.enc.Utf8.parse(contraseña.substring(0, 16));

  // Cifrar la cadena de texto usando AES
  const texto_cifrado = CryptoJS.AES.encrypt(texto_claro, clave, { iv: iv });

  // Devolver la cadena de texto cifrada como una cadena de caracteres
  return texto_cifrado.toString();
}



function cifrarConAES2(contraseña) {
  // Definir la cadena de texto a cifrar
  const texto_claro = "HOY SALE EDD";

  // Convertir la contraseña y el vector de inicialización a formatos compatibles con CryptoJS
  const clave = CryptoJS.enc.Utf8.parse(contraseña);
  const iv = CryptoJS.enc.Utf8.parse(contraseña.substring(0, 16));

  // Cifrar la cadena de texto usando AES
  const texto_cifrado = CryptoJS.AES.encrypt(texto_claro, clave, { iv: iv });

  // Devolver la cadena de texto cifrada como una cadena de caracteres
  return texto_cifrado.toString();
}

