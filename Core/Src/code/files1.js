    //SE INSERTARA EN EL LISTADO DE USUARIOS
    const insertUser = (nombre, carnet, password, carpetaRaiz) => {
        const usuario = new Usuario(nombre, carnet, password, carpetaRaiz);
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };



    const showUser = () => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.forEach(usuario => {
        console.log(usuario.nombre, usuario.carnet, usuario.password, usuario.carpetaRaiz);
        });
    };

        
 
    






    //SE INSERTARA EN EL LISTADO DE USUARIOS FINAL
    const insertUserFijos = (elemento) => {
        const usuarios = JSON.parse(localStorage.getItem('User_Fijos')) || [];
        usuarios.push(elemento);
        localStorage.setItem('User_Fijos', JSON.stringify(usuarios));
    };

    //SE DEVOLVERA UN OBJETO POR MEDIO DEL FCARNET
    const returnUserFijo = (search) => {
        const usuarios = JSON.parse(localStorage.getItem('User_Fijos')) || [];
        let temporal = new UsuarioF("","","","","");
        
        usuarios.forEach(usuario => {
            if (search == usuario.carnet){
                temporal.nombre = usuario.nombre;
                temporal.carnet = usuario.carnet;
                temporal.index = usuario.index;
                temporal.password = usuario.password;
                temporal.encriptado = usuario.encriptado;
            }
        });
        return temporal;        
    };






//CREACION DEL DICCIONARIO
function generarDiccionario(carnet) {
  // Obtener el diccionario actual desde localStorage o crear un nuevo objeto vacío si no existe
  var diccionario = JSON.parse(localStorage.getItem('diccionario')) || {};

  // Crear un nuevo árbol enario
  var arbolEnario = new Tree_Enario();

  // Agregar una nueva entrada de carnet con el atributo "arbol" en el diccionario, que tenga el nuevo árbol enario como valor
  diccionario[carnet] = { arbol: arbolEnario };

  // Guardar el diccionario actualizado en localStorage
  localStorage.setItem('diccionario', JSON.stringify(diccionario));
}


function insertarEnArbol(carnet, path) {
  var diccionario = JSON.parse(localStorage.getItem('diccionario'));
  
  // Verificar si el objeto con el carnet existe en el diccionario
  if (diccionario.hasOwnProperty(carnet)) {
    var arbol = diccionario[carnet].arbol;
    // Verificar si el atributo 'arbol' es null antes de intentar insertar en él
    if (arbol) {
      arbol.insertar(path);
      diccionario[carnet].arbol = arbol;
      localStorage.setItem('diccionario', JSON.stringify(diccionario));
    } else {
      console.log('El árbol para el carnet ' + carnet + ' no ha sido creado aún.');
    }
  } else {
    console.log('El carnet ' + carnet + ' no se encuentra en el diccionario.');
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