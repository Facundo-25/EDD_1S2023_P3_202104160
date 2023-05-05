function login_home() {

    var usuario = document.getElementById("text1").value;
    var contraseña = document.getElementById("text2").value;
    

    if (usuario == "admin") {
        if(contraseña == "admin"){
        window.location.href = 'Core/index2.html';    
        } else {
          alert('Contraseña Incorrecta'); 
        }      
      } else {
        
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
              //tempo_studen.carpetas = i.carpetas;
          }
        });


        sessionStorage.setItem("Usuario_Actual",tempo_studen.carnet);
        Clave_Usuario();
        

        if(status){
            if(contraseña == tempo_studen.password){
              window.location.href = 'Core/index3.html';
            } else {
              alert('Contraseña Icorrecta');
            }
        } else {
          alert('usuario no encontrado');
        }
      }  
  }