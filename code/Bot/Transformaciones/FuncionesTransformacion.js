//Función de transformación después de llamado API,
//para guardar la respuesta entera del mismo en una
//entidad de contexto llamada [[RESULTADO]]

function transform(input, contextEntities) {
    var result = [];
    var entrada = JSON.parse(input);
    var contextEntityResultlat = {
        key: "RESULTADO",
        value: entrada
    };
    result.push(contextEntityResultlat);
    return JSON.stringify(result);

}

//La misma función con modificaciones se puede utilizar 
//para extraer múltiples datos de una respuesta y 
//guardarlos en entidades de contexto, por ejemplo:

function transform(input, contextEntities) {
    var result = [];
    var entrada = JSON.parse(input);
    var contextEntityNombre = {
        key: "NOMBRE",
        value: entrada.values.data.autosave.nombre.value
    };
    var contextEntityMontoDeuda = {
        key: "MONTO_DEUDA",
        value: entrada.values.data.autosave.montoDeuda.value
    };
    var contextEntityFechaVencimiento = {
        key: "FECHA_VENCIMIENTO",
        value: entrada.values.data.autosave.fechaVencimiento.value
    };
    var contextEntityContenedor = {
        key: "CONTENEDOR",
        value: entrada.containerId
    };
    var contextEntityEstadoTarea = {
        key: "ESTADO_TAREA",
        value: entrada.values.customStatus
    };
    result.push(contextEntityNombre);
    result.push(contextEntityMontoDeuda);
    result.push(contextEntityFechaVencimiento);
    result.push(contextEntityContenedor);
    result.push(contextEntityEstadoTarea);
    return JSON.stringify(result);

}

//Función para construir un token con la palabra Bearer
//en cápsula de asignación interna
//y después utilizar la entidad de contexto como Header

(function(accessToken) {

    var bearer = 'Bearer ';
    var token = accessToken;
    var BEARER_TOKEN = bearer + token;
    return ['BEARER_TOKEN', BEARER_TOKEN];

}([[ACCESS_TOKEN]]));