class PlanillaCalificaciones{
    constructor(materia, calificaciones){
        this.calificaciones = calificaciones
        this.materia = materia;
    }

    getPromedio = () => {return this.promedio}
    getMateria = () => {return `La materia la cual has cargado las calificaciones es ${this.materia}`}
    agregarCalificacion = (calificacion) => {this.calificaciones.push(calificacion)}
    getPromedio = () =>{
        let resultado;
        if(this.calificaciones.length === 0){
            resultado = `No hay calificaciones cargadas como para hacer un promedio`
        } else {
            let acumulador = 0;
            let longitudNotas = this.calificaciones.length;
            for(let i = 0; i < longitudNotas; i++){
                acumulador += this.calificaciones[i]
            }
            resultado = acumulador / longitudNotas
        }
        return resultado
    }
}

export default PlanillaCalificaciones;