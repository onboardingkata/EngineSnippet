//Descripcion función para agregar dias a una fecha
//Parametros
//fechaFinalizacionCredito => Fecha a la que se la gregaran los dias
//days => valor numero de la cantidad de dias que se agregaran
function addDays(fechaFinalizacionCredito, days) {
    let dateParts = fechaFinalizacionCredito.split('/');
    let fecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    let result = new Date(fecha);
    result.setDate(result.getDate() + days);
    let fechaRetorno = moment(result).format('DD/MM/YYYY'); 
    return fechaRetorno;
}

//Descripcion función para identificar si la fecha no es fin de semana o un dia festivo
//fechaFinalizacionCredito fecha que se validara
//holidays arreglo de los dias festivos
function isWeekendOrHoliday(fechaFinalizacionCredito, holidays) {
    let dateParts = fechaFinalizacionCredito.split('/');
    let fecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    let date = new Date(fecha);

    if (date.getDay() === 6 || date.getDay() === 0) {
        return true;
    }

    for (let index = 0; index < holidays.length; index += 1) {
        let element = holidays[index];

        let dateParts = element.date.split('/');
        let fecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        if (fecha.getFullYear() === date.getFullYear()
            && fecha.getMonth() === date.getMonth()
            && fecha.getDate() === date.getDate()) {
            return true;
        }
    }

    return false;
}

//Descripcion Funcion para calcular la fecha final del credito, se identifica que la fecha final no sea no laborable
//Parametros
//Periodo => Periodo de los pagos
//cuotas => numero de cuotas que se van a realizar
//fechaPagoInicial => fecha en que se realiza el primer pago
//holidays => arreglo con los dias festivos
function calculaFechaFinalizacion(periodo, cuotas, fechaPagoInicial, holidays=[]){
    let splitValueUno = fechaPagoInicial.split("/");
    let fechaUnoFormato = new Date(`'${splitValueUno[2]}-${splitValueUno[1]}-${splitValueUno[0]}'`);
    let fechaFinalizacionCredito = null;
    let addKeyValue = "";
    let valorAgregar = 0;

    let peridoValor = Array.isArray(periodo) ? periodo[0] : periodo;

    switch (peridoValor) {
        case 'SEMANAL':                
            addKeyValue="weeks";
            valorAgregar = (cuotas -1) * 1;
            break;
        case 'CADA DOS SEMANAS':
            addKeyValue="weeks";
            valorAgregar = cuotas * 2;
            break;
        case 'CADA QUINCE DIAS':
            addKeyValue="days";
            valorAgregar = cuotas * 15;
            break;
        case 'CADA 4 SEMANAS':
            addKeyValue="weeks";
            valorAgregar = cuotas * 4;
            break;
        case 'MENSUAL':
            addKeyValue="months";
            valorAgregar = (cuotas -1) * 1;
            break;        
        default:
            break;
    }

    fechaFinalizacionCredito = moment(fechaUnoFormato).add(addKeyValue, valorAgregar).format('DD/MM/YYYY'); 

    while (isWeekendOrHoliday(fechaFinalizacionCredito, holidays)) {
        fechaFinalizacionCredito = addDays(fechaFinalizacionCredito, 1);
    }

    return fechaFinalizacionCredito;        

}