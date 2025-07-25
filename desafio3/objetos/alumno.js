class Alumno{
    constructor(nombre,apellido,edad,dni, carrera){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni
        this.carrera = carrera;
    }

    describir() {
        return `Nombre del alumno: ${this.nombre}, Dni : ${this.dni}, Estudia la carrera: ${this.carrera}`
    }

    getEdad = () => {return this.edad}

    getCarrera = () => {return this.carrera}

    getNombre = () => {return this.nombre}

    getDni = () => {return this.dni}

    getApellido = () => {return this.apellido}
    
}

export default Alumno;