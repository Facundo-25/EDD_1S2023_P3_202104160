

function insert_arbolito(usuario,arbolito){

    const matriz1 = JSON.parse(sessionStorage.getItem("Matriz_Usuarios")) || [];
        
          matriz1.forEach(i=> {
            if(i.carnet == usuario){
              
                i = JSON.stringify(arbolito);
                
                console.log('IMPRIMIENDO I');
                console.log(i);
                console.log('IMPRIMIENDO ARBOLITO');
                console.log(arbolito);
                
                         
            }
          });

  }



  function matriz_carpetas(usuario){

    const matriz1 = JSON.parse(sessionStorage.getItem("Matriz_Usuarios")) || [];
    AREA = "";

          let status = false;
          
          matriz1.forEach(i=> {
            if(i.carnet == usuario){
              status = true
                  AREA = JSON.parse(i.carpetas).graph();            
            }
          });

    return AREA;
  }