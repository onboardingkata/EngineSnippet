# Funcion calcular fecha de finalización de crédito

El archivo [FuncionFechaFinalizacionCredito.js](FuncionFechaFinalizacionCredito.js) cuenta con una serie de funciones que en base a un periodo y cuotas permiten calcular la fecha de finalizacion del credito.

la forma de uso es la siguiente:

```
  let periodo="MENSUAL"; 
  let cuotas="12";
  let inicioPago="27/06/2022";
  let holidays = [
            {
                "encodedKey": "8a1dab724ed60ac2014edac193654d5c",
                "name": "DIA TRABAJO",
                "id": 1,
                "date": "2015-05-01",
                "isAnnuallyRecurring": false,
                "creationDate": "2023-05-08T03:21:08-05:00"
            }
  ];
  let fechafinalizacion = calculaFechaFinalizacion(periodo, cuotas, fechaPagoInicial, holidays);
  //el valor obtenido es 29/05/2023
```

En el ejemplo anterior sumar 12 meses a la fecha de primer pago, nos daria el 27 del año siguiente, sin embargo el 27 de Mayor es dia sabado, por lo que la fecha se recorre hasta el dia lunes

La función de calculaFechaFinalizacion cuenta con un case donde los periodos programados son Semanal, Cada Dos Semanas, Cada Quince Dias, Cada 4 Semanas, Mensual, en caso de tener un nuevo periodo se agrega en el case con su correspondiente operación


## Funcion Agregar Dias

La función calculaFechaFinalizacion se auxilia de la función agregar dias para que en caso de que el dia no sea valido se pueda ir sumando una unidad hasta identificarlo como dia valido, esta función tambien se puede utilizar por separado para agregar dias a una fecha.

La forma de uso es la siguiente:

```
 let fecha="27/06/2022";
 let diaEjemplo = addDays(fecha, 2);
 //la función retornara 29/06/2022 al agregar dos dias
```

## Función es Dia de la semana o festivo

Esta función tambien se utiliza en la función de calculaFechaFinalizacion, lo que identifica esta función es si la fecha es una fecha valida, que no sea fin de semana o no sea festivo en base al parametro de los dias festivos.

La forma de uso es la siguiente:

```
  let fecha="01/05/2023";
  let holidays = [
            {
                "encodedKey": "8a1dab724ed60ac2014edac193654d5c",
                "name": "DIA TRABAJO",
                "id": 1,
                "date": "2023-05-01",
                "isAnnuallyRecurring": false,
                "creationDate": "2023-05-08T03:21:08-05:00"
            }
  ];
  let esFestivo = isWeekendOrHoliday(fecha, holidays);
  //en este caso como la fecha se encuentra en un festivo nos retornara false, al no ser una fecha valida
```

Esta función utiliza la estructura de los dias festivos que mambu retorna en su API

Autor: Norberto Agustin Marcos