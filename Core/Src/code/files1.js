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