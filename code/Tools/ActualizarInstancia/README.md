# Tool para actualizar el custom status de una instancia

El archivo [ActualizaInstancia.js](ActualizaInstancia.js) es un script que nos permitira leer una definición, leer la información de un contenedor, obtener su custom status y pegarselo a una instancia existente.

Las isntancias en Engine generan una copia de la definición en el momento que se crean, en procesos muy largo y ocurre un bug en las etapas finales, corregirlo y hacer otra solicitud requiere de mucho tiempo en volver a llegar, el script permite actualizar la función de cambio de estado de una instancia para agilizar la validación de un cambio.

Para utilizarlo se debe realizar lo siguiente.

* En la variable connectionString se debe colocar la cadena de conexion a mongo
* En la constante DEFINITION_ID se debe colocar el definition id del que vamos a obtener la información actualizada.
* En la constante ESQUEMA_VERSION se debe colocar la version de la definición que vamos a obtener.
* En la constante INSTANCIA_ID debemos colocar la instancia que deseamos actualizar.
* En la constante DB_NAME va el nombre de la base de datos en mongo.
* En la constante ID_CONTENEDOR_ACTUALIZAR va el identificador del contenedor al cual deseamos obtener el codigo actualizado y contenedor que se actualizara de la instancia.

El script utiliza mongodb por lo que es necesario instalar el paquete

```
npm install mongodb
```

Una vez hecho todos los ajustes se ejecuta de la siguiente forma

```
node ActualizaInstancia.js
```

La funcion nos retornara e indicara cuando se haya terminado la actualización.

Autor: Norberto Agustin Marcos