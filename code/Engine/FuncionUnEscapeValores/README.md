# Funcion de Quitar Escape a Valores

El archivo [FuncionUnEscapeValores.js](FuncionUnEscapeValores.js) cuenta con una función para darle tratamiento a una cadena de texto y quitarle el escape, esta función es muy util para transformar valores que se reciben de mobile u otro sistema que vienen escapados.

la forma de uso es la siguiente:

```
  let valorEscape= unescapeValores("&lt;tag&gt;hola&lt;/tag&gt;");
  //el valor de retorno sera el siguiente <tag>hola</tag>
```

Autor: Norberto Agustin Marcos