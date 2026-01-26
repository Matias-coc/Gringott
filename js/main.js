const INTERES_PRESTAMO = 0.77; 

let prestamo = [];

const inputMonto = document.getElementById("inputMonto");
const inputCuotas = document.getElementById("inputCuotas");
const btnSimular = document.getElementById("btnSimular");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");

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

console.log(calcularPrestamo(100000, 12))
































































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