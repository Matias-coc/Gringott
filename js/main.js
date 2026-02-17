
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

function mostrarError(mensaje) {
    const div = document.createElement("div")

    div.className = "error"
    div.textContent = mensaje;

    document.body.prepend(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

function preaprobarPrestamo (datosCliente, datosPrestamo) {

    const garantiaSeleccionada = garantias.find(
        garantia => garantia.id == datosPrestamo.garantiaId
    );

    const destinoSeleccionado = destinos.fin(
        destino => destino.id == datosPrestamo.destinoId
    );

    if (!garantiaSeleccionada || !destinoSeleccionado) {
        return {
            aprobado: false,
            motivo: "Debe seleccionar garantía y destino"
        };
    }

    const montoMaximo = datosCliente.ingresos * garantiaSeleccionada.multiplicador; 

    if (datosPrestamo > montoMaximo) {
        return{
            aprobado: false,
            motivo: "La cantidad dee cuotas supera el máximo permitido"
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

function guardarPrestamos() {
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
}

function eliminarPrestamo(index) {
    prestamos.splice(index, 1);
    guardarPrestamos();
    renderizarHistorial();
}

function mostrarResultado(prestamo) {
    contenedorResultado.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("resultado-prestamo");

    div.innerHTML = `
        <p><strong>Monto:</strong> $${prestamo.monto}</p>
        <p><strong>Cuotas:</strong> ${prestamo.cuotas}</p>
        <p><strong>Interés:</strong> $${prestamo.interes}</p>
        <p><strong>Total a pagar:</strong> $${prestamo.total}</p>
        <p><strong>Cuota Mensual:</strong> $${prestamo.cuotaMensual}</p>
    `;

    contenedorResultado.appendChild(div);
}

function renderizarHistorial() {
    contenedorHistorial.innerHTML = "";

    prestamos.forEach((prestamo, index) => {
        const div = document.createElement("div");
        div.classList.add("item-historial");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.onclick = () => {
            eliminarPrestamo(index);
        };

        div.innerHTML = `
        <p><strong>Préstamo ${index + 1}</strong></p>
        <p>Monto: $${prestamo.monto}</p>
        <p>Total: $${prestamo.total}</p>
        `;

        div.appendChild(btnEliminar);
        contenedorHistorial.appendChild(div);
    });
}



btnSimular.onclick = () => {
    const monto = Number(inputMonto.value);
    const cuotas = Number(inputCuotas.value);

    if (monto <= 0 || cuotas <= 0) {
        contenedorResultado.innerHTML = "<p>Ingresá valores válidos</p>";
        return;
    }

    const prestamo = calcularPrestamo(monto,cuotas);
    prestamos.push(prestamo);
    guardarPrestamos();
    mostrarResultado(prestamo);
    renderizarHistorial();

    inputMonto.value = "";
    inputCuotas.value = "";
};



renderizarHistorial();
cargarGarantias();
cargarDestinos();


























































