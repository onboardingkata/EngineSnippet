# Función para consultar un servicio que retorne Binario y guardarlo en el Storage de Engine

El ejemplo del archivo [FuncionDescargarGuardarArchivo.js](FuncionDescargarGuardarArchivo.js) contiene la función para descargar un archivo via URL y que se almacene en el storage de Engine y pueda mostrarse en el Front.

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
   let archivoGuardado =saveFileTo(documentJson.documentId, _value.containerId, "https://www.dominio.com/serviciobinario", "application/pdf");
   //el retorno sera un objeto { FileName: "archivogaurda...", FileUrl: "https://.....", MimeType:"application/pdf"  }
   //el archivo se puede guardar en un campo de tipo blob
```

Esta función es util en donde existan servicios que regresen la información de forma binaria y se pueda almacenar en el storage de engine, por ejemplo Unykoo retorna el reporte en binario, por lo que para mostrarlo en Engine es necesario que se guarde en el storage

Autor: Norberto Agustin Marcos