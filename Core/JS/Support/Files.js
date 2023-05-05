sessionStorage.getItem("file_contents"," :) ");         //ESTE ARCHIVO CONTIENE EL TEXTO DEL ARCHIVO JSON ANALIZADO (ORIGINAL)
sessionStorage.getItem("Matriz_Alumnos", null);         //ESTE ARCHIVO CONTIENEN LA MATRIZ DE ALUMNOS ACEPTADOS EN EL QUE SE TRABAJARA
sessionStorage.getItem("Adminstrador_Graphviz",null);   //ESTE ARCHIVO TIENENE EL GRAPHVIZ DE LA LISTA QUE SE OBTIENEN EN LA TABLA SEGUN SU ORDEN


sessionStorage.getItem("temp_table_preorden", null); 	//ALMACENA UNA MATRIZ DE FORMA PRE-ORDEN
sessionStorage.getItem("temp_table_inorden", null); 	//ALMACENA UNA MATRIZ DE FORMA In-ORDEN
sessionStorage.getItem("temp_table_postorden", null); 	//ALMACENA UNA MATRIZ DE FORMA Post-ORDEN

sessionStorage.getItem("Matriz_Usuarios",null);			//ESTE ARCHIVO ALMACENA LAS VARIABLES EN EL SISTEMA







class Estudiante {
    constructor(nombre, carnet, contraseña,id) {
      this.nombre = nombre;
      this.carnet = carnet;
      this.password = contraseña;
      this.id = id;	    
      this.carpetas = new Tree_Enario();
      this.historial = new ListaCircular();
    }
  }

	



	
function Return_Studen(usuario){

  const matriz1 = JSON.parse(sessionStorage.getItem("Matriz_Usuarios")) || [];
        let status = false;
        let tempo_studen = new Estudiante();
        matriz1.forEach(i=> {
          if(i.carnet == usuario){
            status = true
              tempo_studen.nombre = i.nombre;
              tempo_studen.carnet = i.carnet;
              tempo_studen.password = i.password;
              tempo_studen.id = i.id;
              tempo_studen.altura = i.altura;
              
          }
        });

    return tempo_studen;
}



function Modificacion_Arbol_Enario(usuario,nodo_completo){

  const matriz1 = JSON.parse(sessionStorage.getItem("Matriz_Usuarios")) || [];
      
        matriz1.forEach(i=> {
          if(i.carnet == usuario){
             i = nodo_completo;
          }
        });

    
}

	