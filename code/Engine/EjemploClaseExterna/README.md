# Clase externa para Engine

El archivo [ClaseExterna.js](ClaseExterna.js) cuenta con un ejemplo de una clase externa, la clase externa cuenta con dos funciones una sin referencias y otra con referencias a los helpers.

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
var ClaseExterna = require('./externals/ClaseExterna');
var claseExterna = new ClaseExterna();
//esta llamada es directamente la función y la función no requiere de utilizar helpers referenciados
claseExterna.llamarLog("Producto","01010101","nombreContenedor","Mensaje para el log",{});
//para llamar un servicio con las referencias de los helpers se utiliza env como primer parametro y un segundo parametro de tipo arreglo con los parametros de la función utilizando el apply
await claseExterna.llamarServicioReferenciado.apply(env, ["producto", "metodologia"]);
                    
```

Las clases externas son de utilidad cuando tenemos rutinas de codigo que utilizamos en diferentes contenedores, para tener un mejor mantenimiento en rutinas muy repetitivas utilizar este tipo de clases externas, otra de las ventajas que tienen las clases externas es que aplican a cualquier version del producto y no requieren generarse nuevas solicitudes para que tomen sus cambios, pero tambien es importante no agregar codigo que pueda hacer fallar a versiones anteriores.

Autor: Norberto Agustin Marcos