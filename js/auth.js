

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
      window.location.href = "pedidos.html";

    } else {
      alert("Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert(" No se pudo conectar con el Backend. Verifica que Spring Boot esté iniciado.");
  }
}

async function crear() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const password2Input = document.getElementById("password2");

  if (!emailInput) {
    alert(" Por favor, ingresa un email.");
    return;
  }

  if (!passwordInput) {
    alert(" Por favor, ingresa una contraseña.");
    return;
  }

  if (!password2Input) {
    alert(" Por favor, ingresa una contraseña.");
    return;
  }

  if (passwordInput.value !== password2Input.value) {
    alert("Contraseñas no coinciden.");
    return;
  }

  const loginData = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const usuario = await response.json();

      // Mensaje de éxito
      alert(` ¡Usuario #${usuario.email} creado!`);

    } else {
      alert("Error al crear cuenta");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert(" No se pudo conectar con el Backend. Verifica que Spring Boot esté iniciado.");
  }
}

