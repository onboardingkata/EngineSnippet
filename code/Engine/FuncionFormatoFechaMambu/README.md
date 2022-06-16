# Funcion de validación de campo BLOB

El archivo [FuncionFormatoFechaMambu.js](FuncionFormatoFechaMambu.js) cuenta con una función para convertir fechas en formato DD/MM/YYYY a formato YYYY-MM-DD y zona horaria si es que asi se requiere. Esta funcion es muy util al momento de enviar fechas a mambu.

la forma de uso es la siguiente:

Convertir formato de fecha sin zona horaria

```
  let fechaMambu = formatoFechaMambu("15/03/2022");
  //el valor de retorno sera 2022-03-15
```

Convertir formato de fecha con zona horaria

```
  let fechaMambu = formatoFechaMambu("15/03/2022", true);
  //el valor de retorno sera 2022-03-15T00:00:00-06:00
```

La función identifica si la fecha es de horario de verano para retornar el -05 y no el -06

Autor: Norberto Agustin Marcos