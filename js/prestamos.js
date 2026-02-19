function preaprobarPrestamo (datosCliente, datosPrestamo, garantias, destinos) {

    const garantiaSeleccionada = garantias.find(
        garantia => garantia.id == datosPrestamo.garantiaId
    );

    const destinoSeleccionado = destinos.find(
        destino => destino.id == datosPrestamo.destinoId
    );

    if (!garantiaSeleccionada || !destinoSeleccionado) {
        return {
            aprobado: false,
            motivo: "Debe seleccionar garantía y destino"
        };
    }

    const montoMaximo = datosCliente.ingresos * garantiaSeleccionada.multiplicador; 

    if (datosPrestamo.monto > montoMaximo) {
        return{
            aprobado: false,
            motivo: "La cantidad de cuotas supera el máximo permitido"
        };
    }

    if (datosPrestamo.cuotas > destinoSeleccionado.maxCuotas){
        return {
            aprobado: false,
            motivo: `Máximo permitido: ${destinoSeleccionado.maxCuotas} cuotas`
        };
    }

    const interes = datosPrestamo.monto * destinoSeleccionado.tasa;
    const total = datosPrestamo.monto + interes;
    const cuotaMensual = total / datosPrestamo.cuotas;

    return {
        aprobado: true, 
        cliente: datosCliente,

        prestamo: {
            monto: datosPrestamo.monto,
            cuotas: datosPrestamo.cuotas,
            interes,
            total,
            cuotaMensual,
            tasa: destinoSeleccionado.tasa,
            destino: destinoSeleccionado.nombre,
            garantia: garantiaSeleccionada.nombre
        }
    };
}

function guardarPrestamos(prestamos) {
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
}

function eliminarPrestamo(prestamos, index) {
    prestamos.splice(index, 1);
    guardarPrestamos(prestamos);
    renderizarHistorial();
}