function calcularTotal() {
  const precioUnitario = parseFloat(document.getElementById("tipo-gas").value);
  let cantidad = parseInt(document.getElementById("cantidad").value);

  if (isNaN(cantidad) || cantidad < 1) {
    cantidad = 1;
    document.getElementById("cantidad").value = 1;
  }

  const total = precioUnitario * cantidad;
  document.getElementById("monto-total").innerText = total;
}

async function enviarPedidoBackend() {
  const direccionInput = document.getElementById("direccion");
  const direccion = direccionInput.value.trim();
  const monto = parseFloat(document.getElementById("monto-total").innerText);

  if (!direccion) {
    alert(" Por favor, ingresa una dirección de entrega.");
    return;
  }

  const pedidoData = {
    idCliente: 1,
    direccionEntrega: direccion,
    montoTotal: monto,
    estado: "PENDIENTE"
  };

  try {
    const response = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pedidoData)
    });

    if (response.ok) {
      const pedido = await response.json();

      // Mensaje de éxito
      alert(` ¡Pedido #${pedido.idPedido} registrado con éxito por un total de $${pedido.montoTotal}!`);

      // Limpiar formulario
      direccionInput.value = "";
      document.getElementById("cantidad").value = "1";
      document.getElementById("tipo-gas").selectedIndex = 1; // Volver al valor por defecto (15 Kg)
      calcularTotal();

    } else {
      alert(" Ocurrió un error al procesar el pedido en el servidor.");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert(" No se pudo conectar con el Backend. Verifica que Spring Boot esté iniciado.");
  }
}
