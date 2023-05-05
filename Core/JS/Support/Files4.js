

class Info_Enario{
    constructor(carnet){
        this.carnet = carnet;
        this.arbol = new Tree_Enario();
    }

}



function Clave_Usuario(){

    let vector = JSON.parse(sessionStorage.getItem("Matriz_Usuarios_Carpetas")) || [];

    let count = 0;

    vector.forEach(valor => {
        if(sessionStorage.getItem("Usuario_Actual") == valor.carnet){
            sessionStorage.setItem("Usuario_Actual_Clave",count);
        }
        count ++;
    });
    


}

/*

function Devolver_Arbol(carnet){
    let vector = JSON.parse(sessionStorage.getItem("Matriz_Arboles_Carpetas")) || [];
    
    let temporal = new Info_AVL();

    vector.forEach(element => {
        if(carnet == element.carnet){
            temporal.carnet = element.carnet;
            temporal.arbol = element.arbol;
        }
    });

    temporal.arbol;

}
*/