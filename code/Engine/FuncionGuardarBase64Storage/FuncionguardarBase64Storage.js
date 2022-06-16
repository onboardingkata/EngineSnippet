//Descripcion: funcion para escbribir un archivo que viene en base 64, se escribe en el blob file y se retorna el objeto compuesto para almacenarlo
//Parametros
//documentId => valor del documentJson.documentId identificador de la instancia con la que se va a asociar el archivo
//containerId => Identificador del contenedor con el que se va a asociar el archivo
//base64File => archivo en base 64 que se va almacenar en el storage
//mimeTypePdf => mimetype del archivo que se va a aguardar, para pdf application/pdf
//Retorno: La función regresa un objeto compuesto con la estructura de un BlobFile de Engine.
//en caso de error retornara null
async function saveFileTo(documentId, containerId, base64File, mimeTypePdf) {
    
    //se guarda en bufer el archivo en base 64 para convertirlo a binario
    var archivo = Buffer.from(base64File, "base64"); // Ta-da

    try {
        //se llama la funcion de almacenamiento del archivo
        let blobName = await blobStorage.uploadContentFile(
            documentId,
            containerId,
            archivo
        );

        //despues del guardado se genera la URL del archivo para almacenarlo en la solicitud
        let sasURL = await blobStorage.getSharedAccessPolicy(
            documentId,
            blobName,
            31536000
        );
        let jsonFileObject = {};

        //se arma el objeto compuesto de archivo con el nombre del archivo y url, el mimetype para pdf es cosntante
        jsonFileObject.FileName = sasURL[0].fileName;
        jsonFileObject.FileUrl = sasURL[0].url;
        jsonFileObject.MimeType = mimeTypePdf;

        return jsonFileObject;
    } catch (exceptionContratos) {
        //en caso de ocurrir un error en el almacenamiento del archivo se guarda en el log, el flujo no se detiene
        let textoError =
            "Engine Error obteniendo y almacenando la información del archivo:  " +
            exceptionContratos.message +
            " :  " +
            exceptionContratos.stack;
        logHelper.AddErrorEntry(textoError);
        customLogger.Error(
            "Archivos",
            "500",
            "Almacenamiento de archivos",
            textoError,
            JSON.stringify({})
        );
        //throw new Error(textoError);
    }
    //si por algun motivo no se pudo escribir el archivo en el blob se retorna null
    return null;
}