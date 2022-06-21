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
{
  "filterCriteria": [
    {
      "field": "_Datos_Personales_Clientes.MEX_CURP",
      "operator": "EQUALS",
      "value": "XAXA820828FSDFFSF9"
    },
    {
      "field": "_Datos_Personales_Clientes.RFC_Clientes",
      "operator": "EQUALS",
      "value": "XAXA820828"
    }
  ]
}
```

## Buscar Grupo

Esta API realiza una busqueda por medio de nombre del grupo para identificar si el nombre ya esta utilizado.

La entrada a recibir para utilizar esta api es la siguiente
```
{
    "filterCriteria": [
        {
            "field": "branchKey",
            "operator": "EQUALS",
            "value": "8a818f6f66554434016656382a9030f3"
        },
        {
            "field": "groupName",
            "operator": "EQUALS",
            "value": "GRUPO NUEVO"
        }
    ]
}
```

## Crear Cliente

Esta API permite realizar el registro de un nuevo cliente en Mambu.

La entrada a recibir para utilizar esta api es la siguiente
```
{
    "firstName": "Nadia Maria",
    "lastName": "Garcia",
    "middleName": "Alonzo",
    "homePhone": "5511223344",
    "mobilePhone": "5511223344",
    "preferredLanguage": "SPANISH",
    "birthDate": "2021-08-03",
    "gender": "FEMALE",
    "notes": "",
    "assignedBranchKey": "8a818e67593845350159464e713a71d3",
    "assignedCentreKey": "8a818f9c771fc295017721125c6e46a5",
    "assignedUserKey": "8a818f577840ceb5017843f487cd6f6c",
    "clientRoleKey": "8a18257a4d07a80a014d0998962e74ec",
    "idDocuments": [
        {
            "documentType": "INE",
            "documentId": "131313"
        }
    ]
}
```

## Crear Grupo

Esta API permite realizar el registro de un nuevo grupo en mambu.

La entrada a recibir para utilizar esta api es la siguiente
```
{
    "groupName": "Grupo Postman",
    "notes": "",
    "assignedUserKey": "8a818f577840ceb5017843f487cd6f6c",
    "assignedBranchKey": "8a818e67593845350159464e713a71d3",
    "assignedCentreKey": "8a818f9c771fc295017721125c6e46a5",
    "emailAddress": "",
    "mobilePhone": "",
    "homePhone": "",
    "preferredLanguage": "SPANISH",
    "groupRoleKey": "8a18257a4d07a80a014d0998972b74ed",
    "addresses": [],
    "groupMembers": []
}
```


## Estructura de los componentes.

La estructura de estos componentes esta de la siguiente forma.

* Config: Carpeta donde se tendrá los archivos de configuración general hacia los servicios de terceros y constantes que ocupara el proyecto en general.
* Svc: Carpeta que contendrá el archivo general al llamado de los servicios de terceros (Core bancario).




Autor: Itzel Alonzo Gomez