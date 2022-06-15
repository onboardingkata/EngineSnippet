# Ejemplo de una función para consumir servicios

El ejemplo del archivo [HelperMakeRequestAsync.js](HelperMakeRequestAsync.js) es una función que implementa el helper service.MakeRequestAsync para hacer una llamada de servicios, el ejemplo cuenta con las buenas practicas recomendadas en el area de Onboarding, cuenta con las siguientes caracteristicas.

* Funciona para cualquier tipo de Metodo (GET, POST, PUT)
* Cuenta con loggin para guardar los parametros de entrada y salida.
* Cuenta con un control de errores para almacenar el error obtenido en el consumo del servicio.

Para usar este codigo copia y pega en tu implementación y utilizalo de la siguiente forma.

* Donde requieras llamar un servicio llama la funcion llamarServicio
* El primer parametro es el nombre de tu contenedor, esto con fines de loggin se utiliza.
* El segundo parametro es la URL del servicio que vas a llamar, esta URL o parte de su base debe estar en una variable como buena practica.
* El tercer parametro es el payload como objeto, la conversion a JSON la hace internamente el Helper.
* El cuarto parametro son los headers, en caso de que no utilices manda un objeto vacio {}
* El quito parametro es el metodo, por defecto tiene POST pero puedes utilizar PUT y GET entre otros.

La funcion se utiliza de la siguietne forma
```
let respuesta= await llamarServicio("ID_CONTENEDOR", "https://www.dominio.com/api", { valorUno: 1}, { token: "abc"}, "POST");
//la respuesta en forma de objeto se almacenara en la variable respuesta
```

Autor: Norberto Agustin Marcos
