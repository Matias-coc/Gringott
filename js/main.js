console.log("Bienvenido al simulador de prestamos");

// (77% de interes)

const interesPrestamo = 0.77;   

let continuar = true;

// Funciones

const datoPrestamo = () => {
    let monto = parseInt(prompt("ingrese el monto del prestamo:"));

    let cuotas = parseInt(prompt("ingrese cantidad de cuotas:"));

    return {monto, cuotas}; 
}

const calculo = () => {

}
