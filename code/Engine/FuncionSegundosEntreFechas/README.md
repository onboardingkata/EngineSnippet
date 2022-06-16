# Obtener segundos entre fechas

El ejemplo del archivo [FuncionSegundosEntreFechas.js](FuncionSegundosEntreFechas.js) es una función obtener los segundos estre fechas.

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
    let fechaInicio = new Date();
    let fechaFin = new Date();
   //los parametros de entrada son fechas
   let segundos = calcularTimpo(fechaInicio, fechaFin)
   //el resultado sera un numero indicandonos el tiempo entre las dos fechas
```

Esta función es muy util para obtener tiempos de procesamiento y verificar si nuestrs rutinas estan lentas.

Autor: Norberto Agustin Marcos