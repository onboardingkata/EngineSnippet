# Funcion de validación de campo BLOB

El archivo [FuncionValidarBlob.js](FuncionValidarBlob.js) cuenta con una función para validar las propiedades de un campo de tipo BLOB y poder utilizarlo.

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
  let payloadDocumentos=[];
  let documentoContratoGrupal= getValueByFullName(ID_TAREA_IMPRESON, "contratoGrupal"));
  if (validarCampoBlob(documentoContratoGrupal)){
    //si el campo contiene un documento valido se utilizan los valores por ejemplo mandarlo a un payload
    payloadDocumentos.push({
      nombre: documentoContratoGrupal.FileName,
      ruta: documentoContratoGrupal.FileUrl
    })
  }
```

Autor: Norberto Agustin Marcos