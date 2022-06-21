//Descripcion: La siguiente función obtiene el valor de un atributo en un objeto, si el atributo no tiene valor, se puede retornar un valor por defecto
//Parametros
//objeto => objeto en donde se buscara el atributo
//atributo => Nombre del atributo al cual se le desea obtener valor.
//valorDefecto => valor por defecto en caso de que no se cuente con el atributo o tenga un valor vacio o null.
function obtenerValorPropiedad(objeto, atributo, valorDefecto) {
    if (objeto !== null && objeto !== undefined) {
        if (objeto[atributo] !== null && objeto[atributo] !== undefined && objeto[atributo] !== "") {
            return objeto[atributo];
        }
    }
    if (valorDefecto !== null && valorDefecto !== undefined && valorDefecto !== "") {
        return valorDefecto;
    }

    return undefined;
}