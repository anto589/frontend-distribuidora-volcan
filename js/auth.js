

async function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!emailInput) {
    alert(" Por favor, ingresa un email.");
    return;
  }

  if (!passwordInput) {
    alert(" Por favor, ingresa una contraseña.");
    return;
  }

  const loginData = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const usuario = await response.json();

      // Mensaje de éxito
      alert(` ¡Bienvenido #${usuario.email}!`);
      localStorage.setItem("user", JSON.stringify(usuario))

    } else {
      alert("Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert(" No se pudo conectar con el Backend. Verifica que Spring Boot esté iniciado.");
  }
}
