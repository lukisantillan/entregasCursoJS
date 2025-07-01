class Carrera{
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion; // en meses

    } 
    mostrarDetalles() {
        return `Carrera: ${this.nombre}, Duración: ${this.duracion} meses, Fecha de Inicio: ${this.fechaInicio.toLocaleDateString()}, Fecha de Fin: ${this.calcularFechaFin().toLocaleDateString()}`;
    }
    getNombre() {
        return this.nombre;
    }
    getDuracion() {
        return this.duracion;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }
    setDuracion(duracion) {
        this.duracion = duracion;
    }
    setFechaInicio(fechaInicio) {
        this.fechaInicio = new Date(fechaInicio);
    }
    setFechaFin(fechaFin) {
        this.fechaFin = new Date(fechaFin);
    }
}

export default Carrera;