# Ejemplo de funcion de asignación

El archivo [EjemploFuncionAsignacion.js](EjemploFuncionAsignacion.js) cuenta con un ejemplo de la estructura de la función de asignación

Para utilizarlo realiza lo siguiente.

* Copia y pega la función de asignación en tu estado personalizado y accion correspondiente
* Agrega la logica para obtener la carpeta

## Recomendaciones en las funcioens de asignación

* Si durante el flujo varias tareas las estaras asignando a la misma carpeta, en la primera tarea realiza tu rutina para obtener el valor de la carpeta y guardalo en un campo, y en tu función de asignacion llama al campo que tenga la carpeta, esto es recomendable ya que ejecutar la rutina de busqueda en la jerarquia por cada asignación la cual retorne el mismo valor consumira muchos recursos, otra ventaja de guardarlo en un campo es que puedes consultar el valor obtenido.
* La logica en la función de la asignación solo debes utilizar getValueByFullName para obtener valores y los helper de los folders, evita guardar valores o consumir servicios en estas rutinas, ya que deben ser cortas y rapidas para asignar la carpeta.

Autor: David Anacona Alexander