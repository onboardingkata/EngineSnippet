# Función para convertir ruta en un visor HTML

El archivo [FuncionRutaAVisor.js](FuncionRutaAVisor.js) cuenta con una función que recibe una ruta como parametro para identificar si es un pdf o imagen para crear un visor, esta función es util cuando se requiere devolver imagenes o archivos en mobile.

la forma de uso es la siguiente:

```
    let rutaDocumento = "http://...pdf";
    let visor=formatoRuta(rutaDocumento);
    //nos retornara un visor de pdf
```

Autor: Norberto Agustin Marcos