function showUsername() {
  var usuario = document.getElementById("text_usuario").value;
  var contraseña = document.getElementById("text_contraseña").value;

  if (usuario === "admin") {
    if (contraseña === "admin") {
      window.location.href = "Core/Pages/index2.html";
    } else {
      alert("Contraseña Incorrecta");
    }
  } else {
    const usuarios = JSON.parse(localStorage.getItem("User_Fijos")) || [];

    let encontrado = false;
    let userTemp = new UsuarioF("", "", "", "", "");

    usuarios.forEach((usuarioTemporal) => {
        
      if (usuarioTemporal.carnet == usuario) {
          
        userTemp.nombre = usuarioTemporal.nombre;
        userTemp.password = usuarioTemporal.password;
        userTemp.encriptado = usuarioTemporal.encriptado;
        userTemp.index = usuarioTemporal.index;
        userTemp.carnet = usuarioTemporal.carnet;
          
          
        encontrado = true;
      }
    });

    if (encontrado) {
      if (userTemp.password == contraseña) {
        localStorage.setItem("User_Current", JSON.stringify(userTemp));
        window.location.href = "Core/Pages/index3.html";
      } else {
        alert("Contraseña Incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  }
}
