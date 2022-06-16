# Función para guardar un archivo que esta en base 64 en el storage de Engine

El ejemplo del archivo [FuncionguardarBase64Storage.js](FuncionguardarBase64Storage.js) contiene la función para guardar un archivo que esta en base64 al storage de Engine y pueda mostrarse en el Front

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
   let archivoGuardado =saveFileTo(documentJson.documentId, _value.containerId, "a34xsdfdafsd...", "application/pdf");
   //el retorno sera un objeto { FileName: "archivogaurda...", FileUrl: "https://.....", MimeType:"application/pdf"  }
   //el archivo se puede guardar en un campo de tipo blob
```

Esta función es muy util cuando un servicio no retorna URL, y nos retorna un archivo en formato base64, para que se muestre en engine es necesario escribirla en el storage.

Autor: Norberto Agustin Marcos