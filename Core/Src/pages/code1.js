
function showUsername() {
    
    var usuario = document.getElementById("text_usuario").value;
    var contraseña = document.getElementById("text_contraseña").value;
    

    if (usuario == "admin") {
        if(contraseña == "admin"){
        window.location.href = 'Core/Pages/index2.html';    
        } else {
          alert('Contraseña Incorrecta'); 
        }      
      } else {
        
          alert('Usuario no encontrado');
      }
    
}