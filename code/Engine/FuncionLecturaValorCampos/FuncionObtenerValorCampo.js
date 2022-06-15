//Función:      obtenerValorCampo
//Descripción:  Funcion para obtener el valor de un campo, esta función soporta campos simples y restringidos, en el caso de restringidos se obtiene el valor del arreglo retornado y lo regresa como un valor simple
//Entradas:     idContainer => Identificador del contenedor de la tarea a la que pertenece el campo
//              idCampo => Identificador del campo que queremos obtener el valor
//              nivelCatalogo => nivel al que hace referencia, este parametro es opcional y por defecto es 0
//Salida:       Retorna el valor encontrado o vacio en caso de no tener valor, en el 

function obtenerValorCampo(idContainer, idCampo, nivelCatalogo = 0) {
    let valorRetorno = null;
    let valorCampo = getValueByFullName(idContainer, idCampo);

    if (valorCampo !== null && valorCampo !== undefined) {
        if (Array.isArray(valorCampo) && valorCampo.length > nivelCatalogo) {
            valorRetorno = valorCampo[nivelCatalogo];
        } else {
            valorRetorno = valorCampo;
        }
    }
    if (valorRetorno === null || valorRetorno === undefined) {
        valorRetorno = "";
    }

    return valorRetorno;
}
