# Funcion de Quitar Escape a JSON

El archivo [FuncionQuitarEscapeJson.js](FuncionQuitarEscapeJson.js) cuenta con una función para quitar los string \ que escapan un JSON, por defecto al consumir un servicio que ocupe " el servicio los convertira a \" para que pueda transmitirse, en ocaciones pasa que hay doble tratamiento y vienen \\" detectando la primera diagonal como caracter lo cual no nos permite aplicar un JSON.parse.

la forma de uso es la siguiente:

```
  let valorEscape= removeEscapeJson("{ \\"propiedad\\":\\"Valor\\"}");
  //el valor de retorno sera el siguiente { "propiedad" : "valor" }
```

Autor: Norberto Agustin Marcos