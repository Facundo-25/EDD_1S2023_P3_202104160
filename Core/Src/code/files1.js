const {Usuario} = require("./files1");


export let _usuarios = [];

        export const insertUser = (nombre, carnet, password, carpetaRaiz) => {
          const usuario = new Usuario(nombre, carnet, password, carpetaRaiz);
          _usuarios.push(usuario);
        };

        export const showUser = () => {
          console.log(_usuarios);
        };
        
