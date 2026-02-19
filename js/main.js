
const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

const inputMonto = document.getElementById("inputMonto");
const inputCuotas = document.getElementById("inputCuotas");
const btnSimular = document.getElementById("btnSimular");
const contenedorResultado = document.getElementById("resultado");
const contenedorHistorial = document.getElementById("historial");
const selectGarantia = document.getElementById("selectGarantia");
const selectDestino = document.getElementById("selectDestino")
const inputNombre = document.getElementById("inputNombre")
const inputApellido = document.getElementById("inputApellido")
const inputDNI = document.getElementById("inputDNI")
const inputIngresos = document.getElementById("inputIngresos")

let garantias = [];
let destinos= [];

async function cargarGarantias() {
    try{
        const response = await fetch("./DB/garantias.json");
        if (!response.ok) {
            throw new Error();
        }

        garantias = await response.json();
        garantias.forEach(garantia => {
            const option = document.createElement("option");

            option.value = garantia.id;
            option.textContent = garantia.nombre;

            selectGarantia.appendChild(option);
        });
    } catch {
        mostrarError("Error al cargar las garantías")
    } finally {

    }
}

async function cargarDestinos() {
    try{
        const response = await fetch("./DB/destinos.json");
        if (!response.ok) {
            throw new Error();
        }

        destinos = await response.json();
        destinos.forEach(destino => {
            const option = document.createElement("option");

            option.value = destino.id;
            option.textContent = destino.nombre;

            selectDestino.appendChild(option);
        });
    } catch {
        mostrarError("Error al cargar los destinos")
    } finally {}
    
}

selectDestino.onchange= () => {
    const destinoSeleccionado = destinos.find(
        destino => destino.id == selectDestino.value
    );

    if (!destinoSeleccionado) return;

    inputCuotas.max = destinoSeleccionado.maxCuotas;

    inputCuotas.placeholder = `Máximo ${destinoSeleccionado.maxCuotas} cuotas`;

    inputCuotas.value = "";
};

inputCuotas.oninput = () => {
    const max = Number(inputCuotas.max);

    if (Number(inputCuotas.value) > max) {
        inputCuotas.value = max;
    }
};

function mostrarError(mensaje) {
    Swal.fire({
        icon: `error`,
        title: `error`,
        text: mensaje,
        confirmBottonText: `Entendido` 
    });
}

function mostrarExito(resultado) {
    Swal.fire({
        icon: `success`,
        title: `Préstamo aprobado`,
        html: `
            Cliente: ${resultado.cliente.nombre} ${resultado.cliente.apellido}<br>
            Monto: $${resultado.prestamo.monto}<br>
            Cuotas: ${resultado.prestamo.cuotas}<br>
            Cuota mensual: $${resultado.prestamo.cuotaMensual.toFixed(2)}
            `,
            confirmButtonText: `Aceptar`
    });
}



function calcularPrestamo(monto, cuotas, tasa) {
    const interes = monto * tasa;
    const total = monto + interes;
    const cuotaMensual = total / cuotas;

    return{
        monto,
        cuotas,
        tasa,
        interes,
        total,
        cuotaMensual,
    };
}



function confirmarEliminacion(index) {
    Swal.fire({
        title: `¿Eliminar préstamo?`,
        text: `Esta ación no se puede deshacer`,
        icon: `warning`,
        showCancelButton: true,
        confirmButttonText: `Sí, eliminar`,
        cancelButtontext: `Cancelar`,
        confirmButtonColor: `#d33`,
        cancelButtonColor: `#3085d6`
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarPrestamo(prestamos, index);

            Swal.fire({
                icon: ``,
                title: ``,
                text: ``,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}



function mostrarResultado(resultado) {
    contenedorResultado.innerHTML = "";

    const div = document.createElement("div");

    div.innerHTML = `
        <h3>Préstamo aprobado</h3>
        <p>Cliente: ${resultado.cliente.nombre} ${resultado.cliente.apellido}</p>
        <p>DNI: ${resultado.cliente.dni}</p>
        <p>Destino: ${resultado.prestamo.destino}</p>
        <p>Garantía: ${resultado.prestamo.garantia}</p>
        <p>Monto: ${resultado.prestamo.monto}</p>
        <p>Cuotas: ${resultado.prestamo.cuotas}</p>
        <p>Cuota mensual: ${resultado.prestamo.cuotaMensual}</p>
    `;

    contenedorResultado.appendChild(div);
}

function renderizarHistorial() {
    contenedorHistorial.innerHTML = "";

    prestamos.forEach((item, index) => {

        const div = document.createElement("div");
        div.classList.add("item-historial");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.onclick = () => {
            confirmarEliminacion(index);
        };

        const btnDetalle = document.createElement("button");
        btnDetalle.textContent = "Ver detalle";

        btnDetalle.onclick = () => {

            Swal.fire({
                title: "Detalle del préstamo",
                icon: "info",
                html: `
                    <p><strong>Cliente:</strong>${item.cliente.nombre} ${item.cliente.apellido}</p>
                    <p><strong>DNI:</strong>${item.cliente.dni}</p>
                    <p><strong>Ingresos:</strong>$${item.cliente.ingresos}</p>

                    <hr>

                    <p><strong>Destino:</strong>${item.prestamo.destino}</p>
                    <p><strong>Grantía:</strong>${item.prestamo.garantia}</p>
                    <p><strong>Tasa:</strong>${(item.prestamo.tasa * 100).toFixed(2)}%</p>

                    <hr>

                    <p><strong>Monto:</strong>$${item.prestamo.monto}</p>
                    <p><strong>Interés:</strong>$${item.prestamo.interes.toFixed(2)}</p>
                    <p><strong>Total:</strong>$${item.prestamo.total.toFixed(2)}</p>
                    <p><strong>Cuotas:</strong>${item.prestamo.cuotas}</p>
                    <p><strong>Cuota mensual:</strong>$${item.prestamo.cuotaMensual.toFixed(2)}</p>
                    `,
                    confirmBottonText: "Cerrar"
            });
        }

        div.innerHTML = `
        <p><strong>Préstamo ${index + 1}</strong></p>
        <p><strong>Cliente:</strong>${item.cliente.nombre} ${item.cliente.apellido}</p>
        <p><strong>DNI:</strong>${item.cliente.dni}</p>
        <p><strong>Destino:</strong>${item.prestamo.destino}</p>
        <p><strong>Garantía:</strong>${item.prestamo.garantia}</p>
        <p><strong>Monto:</strong>$${item.prestamo.monto}</p>
        <p><strong>Total:</strong>$${item.prestamo.total}</p>
        <p><strong>Cuota mensual:</strong>$${item.prestamo.cuotaMensual.toFixed(2)}</p>
        <hr>
        `;

        div.appendChild(btnEliminar);
        div.appendChild(btnDetalle);
        contenedorHistorial.appendChild(div);
    });
}



btnSimular.onclick = () => {
    const datosCliente = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        dni: inputDNI.value,
        ingresos: Number(inputIngresos.value)
    };

    const datosPrestamo = {
        garantiaId: selectGarantia.value,
        destinoId: selectDestino.value,
        monto: Number(inputMonto.value),
        cuotas: Number(inputCuotas.value)
    };

    if (
        !datosCliente.nombre ||
        !datosCliente.apellido ||
        !datosCliente.dni ||
        datosCliente.ingresos <= 0 ||
        datosPrestamo.monto <= 0 ||
        datosPrestamo.cuotas <= 0
    ) {
        mostrarError("Complete todos los campos correctamente");
        return;
    }

    const resultado = preaprobarPrestamo(datosCliente, datosPrestamo, garantias, destinos);

    if (!resultado.aprobado) {
        mostrarError(resultado.motivo);
        return;
    }

    prestamos.push(resultado);
    guardarPrestamos(prestamos);

    mostrarResultado(resultado);

    renderizarHistorial();

    mostrarExito(resultado);

    inputMonto.value = "";
    inputCuotas.value = "";
};



renderizarHistorial();
cargarGarantias();
cargarDestinos();


























































