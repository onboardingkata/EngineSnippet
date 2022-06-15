# Funciones de integración a Mambu

Los archivos presentes en la carpeta IntegracionMambu cuentan con funciones de integración para consumir APIS de Mambu, las APIS que se contemplan en este ejemplo son las siguiente

## Pasar usar el código, pega en tu implementación la carpeta y configura lo siguiente.

* El archivo Constants.js, se encuentra en una carpeta llamada Config, configura las URLS de las API´s que ocuparas del Core, así como mensaje general que llevaran tu aplicación. 
* Dentro de la misma carpeta se encuentra otro archivo llamada CoreConfig.json, configura la URL base del core bancario y los parámetros que necesitas llenar, de igual forma puedes agregar más constantes en ambos archivos de acuerdo a lo que necesito el cliente para el que estas implementando. 


## API's de integración con mambu

A continuación se listan las API's que se cuentan en este ejemplo.


## Buscar Cliente

Esta API realiza una busqueda por medio de un RFC o CURP para identificar si el cliente ya se encuentra registrado en mambu, en caso de estar registrado obtiene la información y la Retorna.

La entrada a recibir para utilizar esta api es la siguiente
```
//pendiente
```

## Buscar Grupo

Esta API realiza una busqueda por medio de nombre del grupo para identificar si el nombre ya esta utilizado.

La entrada a recibir para utilizar esta api es la siguiente
```
//pendiente
```

## Crear Cliente

Esta API permite realizar el registro de un nuevo cliente en Mambu.

La entrada a recibir para utilizar esta api es la siguiente
```
//pendiente
```

## Crear Grupo

Esta API permite realizar el registro de un nuevo grupo en mambu.

La entrada a recibir para utilizar esta api es la siguiente
```
//pendiente
```


## Estructura de los componentes.

La estructura de estos componentes esta de la siguiente forma.

* Config: Carpeta donde se tendrá los archivos de configuración general hacia los servicios de terceros y constantes que ocupara el proyecto en general.
* Svc: Carpeta que contendrá el archivo general al llamado de los servicios de terceros (Core bancario).




Autor: Itzel Alonzo Gomez