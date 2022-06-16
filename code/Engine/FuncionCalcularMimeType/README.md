# Funcion calcular MimeType

El archivo [FuncionCalcularMimeType.js](FuncionCalcularMimeType.js) cuenta con una función para leer el nombre del archivo y en base a la extension obtener el mimetype, como sabemos en Engine los Blob requierne tener un mimetype definido para mostrarlo en el front.

la forma de uso es la siguiente:

```
  let mimeType=calcularMimeType("archivo.pdf");
  //retornara el valor de application/pdf
```

Autor: Norberto Agustin Marcos