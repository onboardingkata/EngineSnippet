# Funcion para dar formato a valores numericos a valor númerico.

El archivo [FuncionFormatoMoneda.js](FuncionFormatoMoneda.js) contiene una función que recibe un valor y lo convierte a formato moneda. La función es compatible con los valores restringidos de Engine, si se manda un arreglo obtiene el primer valor para darle formato.

```
let valorCampoUno=1000000;
let valorFormatoUnoconvertirFormatoMoneda(valorCampoUno)
//el valor de retorno sera $1,000,000.00

let valorCampoDos=[1000000];
let valorFormatoDosconvertirFormatoMoneda(valorCampoDos)
//el valor de retorno sera $1,000,000.00
```