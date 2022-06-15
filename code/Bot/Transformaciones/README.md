# Ejemplo de una función para consumir servicios

El archivo [FuncionesTransformacion.js](FuncionesTransformacion.js) contiene varios ejemplos de funciones de transformación.

La siguiente función guarda el resultado de una llamada de API en el contexto llamada [[RESULTADO]]

```
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
```

La siguiente función a partir del resultado de un API se extraen ciertos elementos de la respuesta para almacenarnos en diferentes variables como NOMBRE, MONTO_DEUDA, FECHA_VENCIMIENTO, CONTENEDOR, ESTADO_TAREA, se guardan en el contexto para ppoder utilizarlos.

```
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
```

La siguiente función se utiliza en una capsula y es para obtener el Token de una autenticación a Engine y para guardarlo en el contexto y utilizarlos en siguientes llamadas.

```
(function(accessToken) {

    var bearer = 'Bearer ';
    var token = accessToken;
    var BEARER_TOKEN = bearer + token;
    return ['BEARER_TOKEN', BEARER_TOKEN];

}([[ACCESS_TOKEN]]));
```

Autor: Andres Perezalonso Eguia
