async function cargarPedidos() {
  const tabla = document.getElementById("tabla-pedidos");
  tabla.innerHTML = "<tr><td colspan='6'>Cargando...</td></tr>";

  try {
    const response = await fetch("http://localhost:8080/api/pedidos");

    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const pedidos = await response.json();

    if (pedidos.length === 0) {
      tabla.innerHTML = "<tr><td colspan='6'>No hay pedidos registrados aún.</td></tr>";
      return;
    }

    tabla.innerHTML = "";
    pedidos.forEach(p => {
      const fecha = p.fechaCreacion ? new Date(p.fechaCreacion).toLocaleString() : 'N/A';
      tabla.innerHTML += `
        <tr>
          <td>#${p.idPedido}</td>
          <td>${p.idCliente}</td>
          <td>${p.direccionEntrega}</td>
          <td>$${p.montoTotal}</td>
          <td><strong>${p.estado}</strong></td>
          <td>${fecha}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    tabla.innerHTML = "<tr><td colspan='6' style='color:red;'>Error al conectar con el servidor.</td></tr>";
  }
}

// Cargar automáticamente al abrir la página
document.addEventListener("DOMContentLoaded", cargarPedidos);
