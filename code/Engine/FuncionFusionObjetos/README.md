# Función para copiar las propiedades de un objeto a otro.

El archivo [CopyValues.js](CopyValues.js) cuenta con una función que recibe una ruta como parametro para identificar si es un pdf o imagen para crear un visor, esta función es util cuando se requiere devolver imagenes o archivos en mobile.

la forma de uso es la siguiente:

```
    let source = {
        "propiedad1": 1
    };
    let targetValues = {
        "propiedad2": 2
    }
    targetValues = copyValues(source, targetValues);

    //la función retornara  {"propiedad1": 1,   "propiedad2": 2} que es la fusión de ambos objetos
```

Autor: Itzel Alonzo Gomez