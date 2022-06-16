//Descripcion: Esta funcion permite convertir una fecha en formato DD/MM/YYY a formato YYYY-MM-DD, de manera adicional se indicar si se desea concatenar la zona horaria, en mambu hay algunas fechas que requieren la zona horaria.
//Parametros de entrada
//fecha => fecha que se va a convertir 
//concatenarDefaultHora valor por defecto en falso pero en caso de requerir la zona horaria se manda en

function formatoFechaMambu(fecha, concatenarDefaultHora = false) {
    let valorRetorno = null;
    if (fecha && fecha.length >= 10) {

        if (concatenarDefaultHora){
            const cdmx = 'America/Mexico_City';
            let fechaTimeZona = moment(fecha,'DD/MM/YYYY').tz(cdmx).format();

            const UTC6 = 'T00:00:00-06:00';
            const UTC5= 'T00:00:00-05:00';


            const dia = fecha.substring(0, 2);
            const mes = fecha.substring(3, 5);
            const ano = fecha.substring(6, 10);
            

            valorRetorno = ano + '-' + mes + '-' + dia;

            valorRetorno += fechaTimeZona.includes("-05:00") ? UTC5 : UTC6;


        }
        else {
            const dia = fecha.substring(0, 2);
            const mes = fecha.substring(3, 5);
            const ano = fecha.substring(6, 10);

            valorRetorno = ano + '-' + mes + '-' + dia;
            
        }

      

    } else {
        return fecha;
    }
    return valorRetorno;
}