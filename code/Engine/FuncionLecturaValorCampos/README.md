# Ejemplo de una función de cambio de estado

El ejemplo del archivo [FuncionObtenerValorCampo.js](FuncionObtenerValorCampo.js) es una función para leer campos de tipo de dato simple y restringido.

* Internamente implementa la función getValueByFullName para obtener el valor del campo
* Evalua si es un restringido por medio de una comparación de arreglo, en el caso de ser arreglo se obtiene el valor y se regresa como un valor simple.
* La función puede obtener el valor de un tipo de dato restringido de mas de un nivel, para ello en el parametro nivelCatalogo se envia el indice deseado.

la forma de uso es la siguiente:

Obtener el valor de un campo restringido multinivel
```
   //obteniendo el valor del campo restringido donde es multinivel y buscamos la parte uno, ejemplo el valor seria asi ["Principal","Abierto"]
   let decisionFormacion = obtenerValorCampo(ID_TAREA_ACTUAL, "decisionFormacion", 1);
   //El valor de retorno sera Abierto

```

Obteniendo el valor de un campo simple
```
   //obteniendo el valor de un campo simple, cuyo valor tiene "Aprobar"
   let decisionFormacion = obtenerValorCampo(ID_TAREA_ACTUAL, "decisionFormacion");
   //El valor de retorno sera Aprobar
```

Tratando de obtener el valor de un campo que no tiene valor
```
   //obteniendo el valor de un campo simple, cuyo valor es null
   let decisionFormacion = obtenerValorCampo(ID_TAREA_ACTUAL, "decisionFormacion");
   //El valor de retorno sera vacio "" ya que el campo no tiene valor
```

Autor: Aide Zavala Torres