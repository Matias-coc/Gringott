console.log("Bienvenido al simulador de prestamos");

// (77% de interes)

const interesPrestamo = 0.77;   

let continuar = true;

// Funciones

const datoPrestamo = () => {
    let monto = parseInt(prompt("ingrese el monto del prestamo:"));

    let cuotas = parseInt(prompt("ingrese cantidad de cuotas:"));

    return {monto, cuotas}; 
};

const calculo = (monto, cuotas, interesPrestamo) => {
    const interes = monto * interesPrestamo;
    const total = monto + interes;
    const cuotaMensual = total / cuotas;

    return {interes, total, cuotaMensual};
};

// Resultado

const resultado = (monto, cuotas, total, cuotaMensual) => {
    let mensaje = "-RESUMEEN-\n" + "Monto: $" + monto + "\n" + "Cuotas:" + cuotas + "\n" + "Total a pagar: $" + total + "\n" + "Valor de la cuota: $" + cuotaMensual;

    console.log(mensaje);
    alert(mensaje);
};

// While

while (continuar) {
    let datos = datoPrestamo();
    
    let resultados = calculo(datos.monto, datos.cuotas, interesPrestamo);

    resultado(datos.monto, datos.cuotas, resultados.total, resultados.cuotaMensual)

    let  respuesta = confirm("¿Desea simular otro prestamo?");
    if (respuesta == false){
        continuar = false; 
    }

}

console.log("Gracias por usar el simulador")