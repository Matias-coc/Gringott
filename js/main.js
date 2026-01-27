const INTERES_PRESTAMO = 0.77; 

const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

const inputMonto = document.getElementById("inputMonto");
const inputCuotas = document.getElementById("inputCuotas");
const btnSimular = document.getElementById("btnSimular");
const contenedorResultado = document.getElementById("resultado");
const contenedorHistorial = document.getElementById("historial");

function calcularPrestamo(monto, cuotas) {
    const interes = monto * INTERES_PRESTAMO;
    const total = monto + interes;
    const cuotaMensual = total / cuotas;

    return{
        monto,
        cuotas,
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



























































// console.log("Bienvenido al simulador de prestamos");

// // (77% de interes)

// const interesPrestamo = 0.77;   

// let continuar = true;

// const historialPrestamos = [];
// // Funciones

// const datoPrestamo = () => {
//     let monto = parseInt(prompt("ingrese el monto del prestamo:"));

//     let cuotas = parseInt(prompt("ingrese cantidad de cuotas:"));

//     return {monto, cuotas}; 
// };

// const calculo = (monto, cuotas, interesPrestamo) => {
//     const interes = monto * interesPrestamo;
//     const total = monto + interes;
//     const cuotaMensual = total / cuotas;

//     return {interes, total, cuotaMensual};
// };

// // Resultado

// const resultado = (monto, cuotas, total, cuotaMensual, interes) => {
//     let mensaje = "-RESUMEN-\n" + "Monto: $" + monto + "\n" + "Cuotas:" + cuotas + "\n" + "Total a pagar: $" + total + "\n" + "Valor de la cuota: $" + cuotaMensual + "\n" + "Interes generado: $" + interes;

//     console.log(mensaje);
//     alert(mensaje);
// };

// // While

// while (continuar) {
//     let datos = datoPrestamo();
    
//     let resultados = calculo(datos.monto, datos.cuotas, interesPrestamo);

//     resultado(datos.monto, datos.cuotas, resultados.total, resultados.cuotaMensual, resultados.interes)

//     let  respuesta = confirm("¿Desea simular otro prestamo?");
//     if (respuesta == false){
//         continuar = false; 
//     }

//     historialPrestamos.push({
//         monto: datos.monto,
//         cuotas: datos.cuotas,
//         interes: resultados.interes,
//         total: resultados.total
//     })

// }

// for (historialPrestamo of historialPrestamos){
//     console.log(historialPrestamo)
// }

// console.log("Gracias por usar el simulador")