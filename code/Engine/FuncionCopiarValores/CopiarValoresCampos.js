//Función:      copiarValorCampo
//Descripción:  Esta función es util para copiar valores entre campos de los contenedores, por ejemplo en el comite tenemos el caso donde hay que copiar valores de otras tareas para poder presentarlas, esta funcion nos facilita esa copia ingresando el origen y destino a donde enviaremos el valor.
//Entradas:     idTareaOrigen => Identificador del contenedor de la tarea a la que pertenece el campo origen
//idTareaOrigen => Identificador del contenedor de la tare a la que pertenece el campo origen
//idCampoOrigen => Identificador del campo origen
//idTareaDestino => Identificador del contenedor de la tarea a la que pertenece el campo destino
//idCampoDestino => Identificador del campo destino

async function copiarValorCampo(idTareaOrigen, idCampoOrigen, idTareaDestino, idCampoDestino) {
    let valorCampoOrigen = getValueByFullName(idTareaOrigen, idCampoOrigen);
    let objetoValorCampoDestino = {};

    objetoValorCampoDestino[idCampoDestino] = valorCampoOrigen;
    await saveValueHelper(idTareaDestino, objetoValorCampoDestino);
}