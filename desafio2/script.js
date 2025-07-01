import Alumno from './objetos/alumno.js';
import PlanillaCalificaciones from './objetos/planillaCalificaciones.js';
import Carrera from './objetos/carrera.js';

const carreras = [
  new Carrera("Licenciatura en Sistemas", 4, "Lunes a Viernes de 8:00 a 12:00"),
  new Carrera("Ingeniería Electrónica", 5, "Lunes a Viernes de 14:00 a 18:00"),
  new Carrera("Licenciatura en Administración de Empresas", 4, "Lunes a Viernes de 10:00 a 14:00"),
  new Carrera("Licenciatura en Contaduría Pública", 4, "Lunes a Viernes de 16:00 a 20:00")
];

const materiasDisponibles = [
  ["Introducción a la Programación", "Teleinformatica y redes", "Estadistica y Probabilidad", "Sistemas II"],
  ["Circuitos Eléctricos", "Electrónica Digital", "Sistemas Digitales", "Programación de Microcontroladores"],
  ["Contabilidad General", "Matemática Financiera", "Administración de Empresas", "Comportamiento Organizacional"],
  ["Contabilidad Financiera", "Matemática Financiera", "Derecho Empresarial", "Ética Profesional"]
];

let alumno = null;
let calificaciones = [];
let indiceCarrera = null;

const titulo = document.getElementById("titulo");
const contenedorFormulario = document.getElementById("contenedorFormulario");
const divDatos = document.getElementById("datos");

function limpiarContenedor() {
  contenedorFormulario.innerHTML = "";
}

function mostrarFormularioRegistro() {
  const form = document.createElement("form");
  form.id = "formRegistro";

  const campos = [
    { label: "Nombre", id: "inputNombre", type: "text" },
    { label: "Apellido", id: "inputApellido", type: "text" },
    { label: "Edad", id: "inputEdad", type: "number" },
    { label: "DNI", id: "inputDni", type: "text" }
  ];

  campos.forEach(campo => {
    const label = document.createElement("label");
    label.textContent = campo.label + ": ";
    const input = document.createElement("input");
    input.type = campo.type;
    input.id = campo.id;
    input.required = true;
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  });

  const labelCarrera = document.createElement("label");
  labelCarrera.textContent = "Carrera: ";
  const selectCarrera = document.createElement("select");
  selectCarrera.id = "inputCarrera";
  selectCarrera.required = true;

  const opcionDefault = document.createElement("option");
  opcionDefault.value = "";
  opcionDefault.textContent = "Seleccione una carrera";
  selectCarrera.appendChild(opcionDefault);

  carreras.forEach((carrera, index) => {
    const opcion = document.createElement("option");
    opcion.value = index;
    opcion.textContent = carrera.getNombre();
    selectCarrera.appendChild(opcion);
  });

  labelCarrera.appendChild(selectCarrera);
  form.appendChild(labelCarrera);
  form.appendChild(document.createElement("br"));

  const boton = document.createElement("button");
  boton.type = "submit";
  boton.textContent = "Registrar Alumno";
  form.appendChild(boton);

  contenedorFormulario.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("inputNombre").value.trim();
    const apellido = document.getElementById("inputApellido").value.trim();
    const edad = parseInt(document.getElementById("inputEdad").value);
    const dni = document.getElementById("inputDni").value.trim();
    indiceCarrera = parseInt(document.getElementById("inputCarrera").value);

    if (!nombre || !apellido || isNaN(edad) || edad <= 0 || edad > 90 || !dni || isNaN(indiceCarrera)) {
      titulo.textContent = "Datos inválidos. Verifique los campos.";
      return;
    }

    const carreraSeleccionada = carreras[indiceCarrera];
    alumno = new Alumno(nombre, apellido, edad, dni, carreraSeleccionada);

    titulo.textContent = "Bienvenido " + alumno.getNombre();
    document.getElementById("nombre").textContent = "Nombre: " + alumno.getNombre();
    document.getElementById("apellido").textContent = "Apellido: " + alumno.getApellido();
    document.getElementById("dni").textContent = "DNI: " + alumno.getDni();
    document.getElementById("edad").textContent = "Edad: " + alumno.getEdad();
    document.getElementById("carrera").textContent = "Carrera: " + alumno.getCarrera().getNombre();
    document.getElementById("duracion").textContent = "Duración de la carrera: " + alumno.getCarrera().getDuracion() + " años";

    divDatos.style.display = "block";

    mostrarMenuNotas();
  });
}

function mostrarMenuNotas() {
  limpiarContenedor();

  const formNotas = document.createElement("form");
  formNotas.id = "formNotas";

  const labelMateria = document.createElement("label");
  labelMateria.textContent = "Seleccione una materia: ";
  const selectMateria = document.createElement("select");
  selectMateria.id = "materiaSelect";
  selectMateria.required = true;

  materiasDisponibles[indiceCarrera].forEach((materia, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = materia;
    selectMateria.appendChild(option);
  });

  labelMateria.appendChild(selectMateria);
  formNotas.appendChild(labelMateria);
  formNotas.appendChild(document.createElement("br"));

  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad de notas a ingresar: ";
  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.id = "cantidadNotas";
  inputCantidad.min = 1;
  inputCantidad.required = true;
  labelCantidad.appendChild(inputCantidad);
  formNotas.appendChild(labelCantidad);
  formNotas.appendChild(document.createElement("br"));

  const boton = document.createElement("button");
  boton.type = "submit";
  boton.textContent = "Cargar Notas";
  formNotas.appendChild(boton);

  contenedorFormulario.appendChild(formNotas);

  formNotas.addEventListener("submit", (e) => {
    e.preventDefault();
    const cant = parseInt(document.getElementById("cantidadNotas").value);
    const indiceMateria = parseInt(document.getElementById("materiaSelect").value);
    const materia = materiasDisponibles[indiceCarrera][indiceMateria];

    if (isNaN(cant) || cant <= 0) return;

    limpiarContenedor();
    const formCarga = document.createElement("form");
    formCarga.id = "formCargaNotas";

    const notas = [];

    for (let i = 0; i < cant; i++) {
      const label = document.createElement("label");
      label.textContent = "Nota " + (i + 1) + ": ";
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      input.max = 10;
      input.required = true;
      input.dataset.index = i;
      label.appendChild(input);
      formCarga.appendChild(label);
      formCarga.appendChild(document.createElement("br"));
    }

    const botonFinal = document.createElement("button");
    botonFinal.type = "submit";
    botonFinal.textContent = "Guardar Calificaciones";
    formCarga.appendChild(botonFinal);
    contenedorFormulario.appendChild(formCarga);

    formCarga.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const inputs = formCarga.querySelectorAll("input");
      inputs.forEach(inp => {
        const val = parseFloat(inp.value);
        if (!isNaN(val) && val >= 0 && val <= 10) notas.push(val);
      });

      const planilla = new PlanillaCalificaciones(materia, notas);
      calificaciones.push(planilla);

      mostrarResumenNotas();
    });
  });
}

function mostrarResumenNotas() {
  limpiarContenedor();

  const resumen = document.createElement("div");
  resumen.innerHTML = "<h3>Resumen de calificaciones:</h3>";
  calificaciones.forEach(p => {
    const pInfo = document.createElement("p");
    pInfo.textContent = `${p.getMateria()}: [${p.calificaciones.join(", ")}] - Promedio: ${p.getPromedio().toFixed(2)}`;
    resumen.appendChild(pInfo);
  });

  const btnOtra = document.createElement("button");
  btnOtra.textContent = "Cargar otra materia";
  btnOtra.addEventListener("click", () => {
    mostrarMenuNotas();
  });

  const btnFin = document.createElement("button");
  btnFin.textContent = "Finalizar";
  btnFin.addEventListener("click", () => {
    resumen.innerHTML += "<p>Gracias por utilizar el sistema.</p>";
    btnOtra.remove();
    btnFin.remove();
  });

  contenedorFormulario.appendChild(resumen);
  contenedorFormulario.appendChild(btnOtra);
  contenedorFormulario.appendChild(btnFin);
}

mostrarFormularioRegistro();