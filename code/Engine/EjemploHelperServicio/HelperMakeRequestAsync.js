//Los parametros de la funcion son los siguientes.
//containerName: Nombre del contendor donde se esta llamando, para identificar desde donde se realiza la llamada
//url: URL del servicio
//payload: Objeto que se enviara al servicio en caso de que sea POST, para GET va null
//header: Encabezados que se mandaran en el servicio
//method: Metodo utilizado por defecto va post pero funciona para GET
function llamarServicio(containerName, url, payload, header, method = "POST") {
    let serviceResponse;
    const MODULO_LOG = 'Servicio';
    const CODIGO_OK = '200'; 
    const CODIGO_ERROR = '500'; 

    try {
        //se loguea la fecha de inicio en que se va a llamar el servicio
        let fechaInicio = moment(new Date()).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss');
        customLogger.Informative(MODULO_LOG, CODIGO_OK, containerName, `Llamada servicio (${containerName} - ${fechaInicio})> : ${url}`, `Payload: ${JSON.stringify(payload)}`);

        serviceResponse = await service.MakeRequestAsync(url, payload, method, header);
        //se logea la fecha fin en que se llamo el servicio para en base a la fecha inicio se pueda obtener la duracion
        let fechaFin = moment(new Date()).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss');
        customLogger.Informative(MODULO_LOG, CODIGO_OK, containerName, `Respuesta servicio (${containerName} - ${fechaFin})> : ${url}`, `RespuestaServicio: ${JSON.stringify(serviceResponse)}`);

    } catch (ex) {
        //en caso de error se loguea el error y por medio del throw se burbujea el error.
        let fechaFin = moment(new Date()).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss');
        customLogger.Error(MODULO_LOG, CODIGO_ERROR, containerName, `Error en servicio (${containerName} - ${fechaFin})> : ${url} ${ex.message} ${ex.stack}`, `Payload: ${JSON.stringify(payload)}`);
        console.log(`Error en servicio (${containerName} - ${fechaFin})> : ${url} ${ex.message} ${ex.stack}`);
        throw ex;
    }

    return serviceResponse;
}
