//Descripcion: Esta función valida las propiedades de un campo de tipo de dato Blob para identificar si es un elemento valido o no para utilizarlo.
//Parametros: texto de entrada que se desea escapar
function validarCampoBlob(documentoValidar) {
    let retorno = false;
    if ((documentoValidar) && (documentoValidar.FileName) && (documentoValidar.FileUrl) && (documentoValidar.MimeType)) {
        retorno = true;
    }
    return retorno;
}