//Descripcion: Funcion que permite obtener la cantidad de semanas entre fecha, aplica un redondeo en caso de que las semanas no sea completa.
//Parametros de entrada:
//fechaUno => fecha final del periodo que queremos obtener el valor
//fechaDos => fecha inicial del periodo que queremos obtener la validacion
function semanasFecha(fechaUno, fechaDos) {
    let splitValueUno = fechaUno.split("/");
    let fechaUnoFormato = new Date(`'${splitValueUno[2]}-${splitValueUno[1]}-${splitValueUno[0]}'`);
    let splitValueDos = fechaDos.split("/");
    let fechaDosFormato = new Date(`'${splitValueDos[2]}-${splitValueDos[1]}-${splitValueDos[0]}'`);

    var Difference_In_Time = fechaUnoFormato.getTime() - fechaDosFormato.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    console.log(Difference_In_Days);

    return Math.round(Difference_In_Days/7);
}