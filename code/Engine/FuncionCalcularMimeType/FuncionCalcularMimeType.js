//Descripcion: Esta función busca la extension del nombre del archivo para identificarlo y retornar un mimetype predefinido
//Parametros: nombreDocumento valor del nombre del archivo al que se le va a calcular el mimetype
function calcularMimeType(nombreDocumento){
    let mimeTypeDocX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    let mimeTypeDoc = "application/msword";
    let mimeTypePDF = "application/pdf";
    let mimeTypeZIP = "application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip";
    let retorno = "";
    let nombreArchivo = nombreDocumento.split(".");
   
    let extension = nombreArchivo[nombreArchivo.length-1];
    
    switch (extension) {
        case "pdf":
            retorno = mimeTypePDF;
            break;
        case "zip":
            retorno = mimeTypeZIP;
            break;
        case "doc":
            retorno= mimeTypeDocX
            break;
        case "docx":
            retorno= mimeTypeDoc
        default:
            break;
    }

    return retorno;
}