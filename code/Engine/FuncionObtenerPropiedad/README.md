# Función para obtener el valor de un atributo

El archivo [FuncionObtenerPropiedad.js](FuncionObtenerPropiedad.js) contiene una función la cual nos permitira obtener el valor de un atributo si el objeto cuenta con esa propiedad, en caso de no contar se puede asignar un valor por defecto.

La función se utiliza de la siguiente manera:

```
let objeto={};
let atributo="NumExterior";
const valorDefecto ="S/N";
let numeroExterior=obtenerValorPropiedad(objeto, atributo, valorDefecto)
//en este caso el objeto no tiene atributo llamado numero exteror retornara S/N
```

Autor: Norberto Agustin Marcos