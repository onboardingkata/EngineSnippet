//Descripcion: Obtiene los segundos entre dos fechas
//Paraemtros
//fechaFin => fecha inicial con la cual se realizara la comparacion
//fechaFin => fecha fin a la que se le realizara el calculo
function calcularTimpo(fechaInicio, fechaFin) {
    var dif = fechaFin.getTime() - fechaInicio.getTime()

    var Segundos_de_T1_a_T2 = dif / 1000;
    var Segundos_entre_fechas = Math.abs(Segundos_de_T1_a_T2);
    return Segundos_entre_fechas;
}