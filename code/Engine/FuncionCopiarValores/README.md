# Funcion copiar valores entre contenedores

El archivo [CopiarValoresCampos.js](CopiarValoresCampos.js) es una función que nos facilita copiar los valores de los campos entre contenedores. El funcionamiento de Engine y las tareas con los campos es que si deseamos mostrar el valor capturado previamente tenemos que traerlo al contenedor donde lo mostraremos, con la finalidad de facilidar la implementación se creo esta función, su funcionamiento es el siguiente.

* Recibe cuatro parametros, id contenedor origen, campo origen, id contenedor destino, campo destino.
* Obtiene el valor del campo origen en el contenedor origen.
* Con el valor obtenido se realiza un put values al campo y contenedor destino.

Para utilizar la función se realizaria de la siguiente forma.

```
//en este ejemplo se copia el nombre de la sucursal que esta en la tarea formacion a la tarea actual que es comite de credito.
 await copiarCampo(ID_TAREA_FORMACION, 'nombreSucursal', ID_TAREA_ACTUAL, 'nombreSucursal');
```



Autor: Aide Zavala Torres
