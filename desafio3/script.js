
let carreras = [];
let materiasDisponibles = [];
let alumno = null;
let calificaciones = [];
let indiceCarrera = null;

const titulo = document.getElementById("titulo");
const contenedorFormulario = document.getElementById("contenedorFormulario");
const divDatos = document.getElementById("datos");
const cerrarSesionBtn = document.getElementById("cerrarSesion");

function limpiarContenedor() {
  contenedorFormulario.innerHTML = "";
}

function toast(mensaje) {
  Toastify({ text: mensaje, duration: 3000, gravity: "top", position: "center", backgroundColor: "#007bff" }).showToast();
}

async function cargarDatos() {
  try {
    const resCarreras = await fetch("./carreras.json");
    carreras = await resCarreras.json();

    const resMaterias = await fetch("./materias.json");
    materiasDisponibles = await resMaterias.json();

    const datosGuardados = JSON.parse(localStorage.getItem("datosAlumno"));
    const notasGuardadas = JSON.parse(localStorage.getItem("calificaciones"));

    if (datosGuardados) {
      Swal.fire({
        title: "¿Deseás recuperar los datos guardados?",
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No"
      }).then(res => {
        if (res.isConfirmed) {
          alumno = datosGuardados;
          calificaciones = notasGuardadas || [];
          indiceCarrera = alumno.indiceCarrera;
          mostrarDatosAlumno();
          mostrarResumenNotas();
        } else {
          localStorage.clear();
          mostrarFormularioRegistro();
        }
      });
    } else {
      mostrarFormularioRegistro();
    }
  } catch (err) {
    Swal.fire("Error", "No se pudieron cargar los datos.", "error");
  }
}

function mostrarFormularioRegistro() {
  limpiarContenedor();

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
    opcion.textContent = carrera.nombre;
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
      Swal.fire("Error", "Datos inválidos. Verifique los campos.", "error");
      return;
    }

    alumno = { nombre, apellido, edad, dni, carrera: carreras[indiceCarrera], indiceCarrera };
    calificaciones = [];
    localStorage.setItem("datosAlumno", JSON.stringify(alumno));
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
    toast("Alumno registrado exitosamente");

    mostrarDatosAlumno();
    mostrarMenuNotas();
  });
}

function mostrarDatosAlumno() {
  titulo.textContent = "Bienvenido " + alumno.nombre;
  document.getElementById("nombre").textContent = "Nombre: " + alumno.nombre;
  document.getElementById("apellido").textContent = "Apellido: " + alumno.apellido;
  document.getElementById("dni").textContent = "DNI: " + alumno.dni;
  document.getElementById("edad").textContent = "Edad: " + alumno.edad;
  document.getElementById("carrera").textContent = "Carrera: " + alumno.carrera.nombre;
  document.getElementById("duracion").textContent = "Duración de la carrera: " + alumno.carrera.duracion + " años";
  divDatos.style.display = "block";
  cerrarSesionBtn.style.display = "inline-block";
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

      const promedio = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2);
      calificaciones.push({ materia, calificaciones: notas, promedio });
      localStorage.setItem("calificaciones", JSON.stringify(calificaciones));

      toast("Notas guardadas");
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
    pInfo.textContent = `${p.materia}: [${p.calificaciones.join(", ")}] - Promedio: ${p.promedio}`;
    resumen.appendChild(pInfo);
  });

  const btnOtra = document.createElement("button");
  btnOtra.textContent = "Cargar otra materia";
  btnOtra.addEventListener("click", mostrarMenuNotas);

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

cerrarSesionBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

cargarDatos();
