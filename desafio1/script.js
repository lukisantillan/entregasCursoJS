import Alumno from './objetos/alumno.js';
import PlanillaCalificaciones from './objetos/planillaCalificaciones.js';
import Carrera from './objetos/carrera.js';

const botonMenu = document.getElementById("menu");
botonMenu.disabled = true;
botonMenu.textContent = "Debe registrarse primero";
// Definición de las carreras y sus tiempos de duración
let carreras = [
    new Carrera('Licenciatura en Sistemas', 4, 'Lunes a Viernes de 8:00 a 12:00'),
    new Carrera('Ingeniería Electrónica', 5, 'Lunes a Viernes de 14:00 a 18:00'),
    new Carrera('Licenciatura en Administración de Empresas', 4, 'Lunes a Viernes de 10:00 a 14:00'),
    new Carrera('Licenciatura en Contaduría Pública', 4, 'Lunes a Viernes de 16:00 a 20:00')
];
// Definición de las materias disponibles
let materiasDisponibles = [['Introducción a la Programación', 'Teleinformatica y redes', 'Estadistica y Probabilidad', 'Sistemas II'],
['Circuitos Eléctricos', 'Electrónica Digital', 'Sistemas Digitales', 'Programación de Microcontroladores'],
['Contabilidad General', 'Matemática Financiera', 'Administración de Empresas', 'Comportamiento Organizacional'],
['Contabilidad Financiera', 'Matemática Financiera', 'Derecho Empresarial', 'Ética Profesional']];

let calificaciones = [];

let titulo = document.getElementById("titulo");
titulo.textContent = "Bienvenido al Sistema de Alumnos, porfavor haga click en el botón para iniciar el registro de sus datos";
let alumno;
let flag = false;
let carreraSeleccionada;

let carrerasDisponibles = ['Licenciatura en Sistemas', 'Ingeniería Electrónica', 'Licenciatura en Administración de Empresas', 'Licenciatura en Contaduría Pública']
const botonIniciar = document.getElementById("simulador")
console.log("Script cargado correctamente");

botonIniciar.addEventListener("click", () => {
    alert(`Bienvenido al Sistema de alumnos,\nporfavor registrese con los datos que le pediremos a continuación.\nGracias por utilizar nuestro Sistema Web`);
    let nombre = prompt("Ingrese su nombre:");
    while (nombre === null || nombre.trim() === "") {
        alert("El nombre no puede estar vacío. Por favor, ingrese un nombre válido.");
        nombre = prompt("Ingrese su nombre:");
    }
    console.log("nombre ingresado: " + nombre);
    let apellido = prompt("Ingrese su apellido:");
    while (apellido === null || apellido.trim() === "") {
        alert("El apellido no puede estar vacío. Por favor, ingrese un apellido válido.");
        apellido = prompt("Ingrese su apellido:");
    }
    console.log("apellido ingresado: " + apellido);
    let solicitudEdad = prompt("Ingrese su edad:");
    let edad = parseInt(solicitudEdad);
    while (isNaN(edad) || edad <= 0 || edad > 90) {
        alert("La edad debe ser un número válido entre 1 y 90. Por favor, ingrese una edad válida.");
        solicitudEdad = prompt("Ingrese su edad:");
        edad = parseInt(solicitudEdad);
    }
    console.log("edad ingresada: " + edad);
    let dni = prompt("Ingrese su DNI:");
    while (dni === null || dni.trim() === "" || isNaN(dni) || dni.length < 7 || dni.length > 8) {
        alert("El DNI debe ser un número válido de 7 u 8 dígitos. Por favor, ingrese un DNI válido.");
        dni = prompt("Ingrese su DNI:");
    }
    console.log("dni ingresado: " + dni);
    let mensajeCarrera = "Seleccione una carrera:\n";
    for (let i = 0; i < carrerasDisponibles.length; i++) {
        mensajeCarrera += `${i + 1} - ${carrerasDisponibles[i]}\n`;
        console.log(mensajeCarrera);
    }
    let eleccionCarrera = prompt(mensajeCarrera);
    while (eleccionCarrera < 1 || eleccionCarrera > carrerasDisponibles.length || isNaN(eleccionCarrera)) {
        alert("La carrera seleccionada no es válida. Por favor, elija un número de carrera de la lista.");
        eleccionCarrera = prompt(`Seleccione una carrera:\n${mensajeCarrera}`);
    }
    carreraSeleccionada = carreras[eleccionCarrera - 1];
    console.log("carrera seleccionada: " + carreraSeleccionada.getNombre());
    alumno = new Alumno(nombre, apellido, solicitudEdad, dni, carreraSeleccionada);
    flag = true;
    console.log("actualizando el título");
    titulo.textContent = `Bienvenido ${alumno.getNombre()}.`
    let nombreAlu = document.getElementById("nombre");
    nombreAlu.textContent = `Nombre: ${alumno.getNombre()}`;
    let apellidoAlu = document.getElementById("apellido");
    apellidoAlu.textContent = `Apellido: ${alumno.getApellido()}`;
    let dniAlu = document.getElementById("dni");
    dniAlu.textContent = `DNI: ${alumno.getDni()}`;
    let edadAlu = document.getElementById("edad");
    edadAlu.textContent = `Edad: ${alumno.getEdad()}`;
    let carreraAlu = document.getElementById("carrera");
    carreraAlu.textContent = `Carrera: ${alumno.getCarrera().getNombre()}`;
    let duracionAlu = document.getElementById("duracion");
    duracionAlu.textContent = `Duración de la carrera: ${alumno.getCarrera().getDuracion()} años`;
    const botonMenu = document.getElementById("menu");
    botonMenu.disabled = false;
    botonMenu.textContent = "Menú de opciones";
    botonIniciar.disabled = true;
});

botonMenu.addEventListener("click", () => {
    let flag2 = true
    while (flag2){
        let seleccion = prompt(`Bienvendio al Menú ${alumno.getNombre()}\nSeleccione la opción que desea realizar\n1-Registrar notas\n2- Solicitar Promedio\n3- Salir`);
        seleccion = parseInt(seleccion);
        switch (seleccion){
            case 1: 
                console.log("Ingresando notas");
                let notasAingresar = [];
                let indiceCarrera = carreras.findIndex(c => c.getNombre() === carreraSeleccionada.getNombre());
                let mensajeMateria = "Seleccione una materia para ingresar la nota: \n";
                for(let i = 0; i < materiasDisponibles[indiceCarrera].length; i++){
                    mensajeMateria += `${i + 1} - ${materiasDisponibles[indiceCarrera][i]}\n`;
                }
                console.log("Salio del for");
                let seleccionDeMateria = prompt(mensajeMateria);
                let cantidadDeNotas = prompt("¿Cuantas notas desea ingresar?")
                for(let j = 0; j < cantidadDeNotas; j++){
                    notasAingresar.push(parseFloat(prompt(`Ingrese la nota ${j + 1}:`)));
                    while (isNaN(notasAingresar[j]) || notasAingresar[j] < 0 || notasAingresar[j] > 10) {
                        alert("La nota debe ser un número válido entre 0 y 10. Por favor, ingrese una nota válida.");
                        notasAingresar[j] = parseFloat(prompt(`Ingrese la nota ${j + 1}:`));
                    }
                }
                let planilla = new PlanillaCalificaciones(materiasDisponibles[indiceCarrera][seleccionDeMateria - 1], notasAingresar);
                calificaciones.push(planilla);
                console.log("Creando planilla de calificaciones");
                alert(`Notas ingresadas correctamente para la materia ${planilla.getMateria()}`);
                console.log(`Notas ingresadas correctamente para la materia ${planilla.getMateria()}`);
                break;
            case 2:
                if (calificaciones.length === 0) {
                    alert("No hay calificaciones registradas. Por favor, registre notas primero.");
                    console.log("No hay calificaciones registradas. Por favor, registre notas primero.");
                } else {
                    let mensajeCalificaciones = "Calificaciones registradas:\n";
                    for (let i = 0; i < calificaciones.length; i++) {
                        mensajeCalificaciones += `${calificaciones[i].getMateria()}: ${calificaciones[i].calificaciones.join(", ")} - Promedio: ${calificaciones[i].getPromedio()}\n`;
                    }
                    alert(mensajeCalificaciones);
                    console.log(mensajeCalificaciones);
                }
                break;
            case 3:
                alert("Gracias por utilizar el sistema. ¡Hasta luego!");
                console.log("Gracias por utilizar el sistema. ¡Hasta luego!");
                flag2 = false;
                break;
            default:
                alert("Opción no válida. Por favor, elija una opción del 1 al 3.");
                console.log("Opción no válida. Por favor, elija una opción del 1 al 3.");
                break;
        }
    }
});