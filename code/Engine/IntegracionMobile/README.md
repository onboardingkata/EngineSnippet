# Integración API's de Mobile

La plataforma mobile cuenta con una serie de API's expuestas para interactuar directamente con ellas, estas API's utilizan SOAP, el archivo [mobileAPIHelper.js](mobileAPIHelper.js) es un modulo que puede ser implementado en las librerias externas de Engine para utilizarlo como funciones comunes para la interaccion con Mobile, las funciones que contiene el modulo son los siguientes.

## SendMessageMobile

Esta función permite realizar el envio de mensajes a un agente en mobile.

```
var mobileAPIHelper = require('./externals/mobileAPIHelper.js');
//Parametros
//urlMobile: Es la direccion del API de mobile para interactuar con los servicios
//mobileClientId: Es el valor del Client Id configurado en el ambiente con el que se va a interactuar
//productId: Es el product Id de un proceso implementado en mobile
//usuarioAsignado: Nombre del usuario de mobile al que se le va a enviar el mensaje
//mensaje: Texto que se le enviara al usuario

let respuestaMensajeMobile = mobileAPIHelper.SendMessageMobile(urlMobile, mobileClientId, productId, usuarioAsignado, mensaje);
```

La función retornara la respuesta en formato XML que el servicio de Mobile regresa.

```
<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\"><s:Body><QueueMessageToUserNameResponse xmlns=\"http://tempuri.org/\"><QueueMessageToUserNameResult/></QueueMessageToUserNameResponse></s:Body></s:Envelope>
```

## AddWorkOrderMobile

Esta función permite realizar el agregado de ordenes en mobile, utiliza la accción AddWorkOrdersXMLId.

```
var mobileAPIHelper = require('./externals/mobileAPIHelper.js');
//Parametros
//urlMobile: Es la direccion del API de mobile para interactuar con los servicios
//mobileClientId: Es el valor del Client Id configurado en el ambiente con el que se va a interactuar
//productId: Es el product Id de un proceso implementado en mobile
//idOrder: Identificador de la orden, sera el external id con el que se mandara.
//type: Es el valor del tipo de formulario que se asignarara
//usuarioAsignado: Nombre del usuario de mobile al que se le va a asignar la orden
//fechaExpiracion: Fecha de expiración de la orden
//parametrosMobile: Parametros que se enviaran en la asignación, tiene que ser un objeto con propiedades de tipo llave valor.
//fechaCancelacion: Fecha de cancelacion de la orden

let parametrosMobile = {
    "campouno": "valor",
    "subformulario": "xmlsubformulario"
}
let respuestaAddWorkOrder = mobileAPIHelper.AddWorkOrderMobile(urlMobile, mobileClientId, productId, idOrder, type, usuarioAsignado, fechaExpiracion, parametrosMobile, fechaCancelacion);
```
        
La función retornara la respuesta en formato XML que el servicio de Mobile regresa.

```
<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\"><s:Body><AddWorkOrdersXMLIdResponse xmlns=\"http://tempuri.org/\"><AddWorkOrdersXMLIdResult>add_d11ead28-c6f7-4467-9a34-2ac92204ab30_140620220056_E5F19003</AddWorkOrdersXMLIdResult></AddWorkOrdersXMLIdResponse></s:Body></s:Envelope>
```

## CancelOrder

Esta función permite cancelar una orden que aun se encuentra disponible en el dispositivo para que ya no pueda ser gestionada.

```
var mobileAPIHelper = require('./externals/mobileAPIHelper.js');
//Parametros
//urlMobile: Es la direccion del API de mobile para interactuar con los servicios
//mobileClientId: Es el valor del Client Id configurado en el ambiente con el que se va a interactuar
//productId: Es el product Id de un proceso implementado en mobile
//idOrder: Identificador de la orden, sera el external id con el que se cancelara.

let respuestaAddWorkOrder = mobileAPIHelper.CancelOrder(urlMobile, mobileClientId, productId, idOrder);
```

## UpdateWorkOrderMobile

Esta función permite actualizar una orden existente en el dispositivo.

```
var mobileAPIHelper = require('./externals/mobileAPIHelper.js');
//Parametros
//urlMobile: Es la direccion del API de mobile para interactuar con los servicios
//mobileClientId: Es el valor del Client Id configurado en el ambiente con el que se va a interactuar
//productId: Es el product Id de un proceso implementado en mobile
//idOrder: Identificador de la orden, sera el external id con el que se actualizara.
//type: Es el valor del tipo de formulario que se asignarara
//usuarioAsignado: Nombre del usuario de mobile al que se le va a asignar la orden
//fechaExpiracion: Fecha de expiración de la orden
//parametrosMobile: Parametros que se enviaran en la asignación, tiene que ser un objeto con propiedades de tipo llave valor y debe contar con todos los parametros de la orden, no es posible actualizar solo algunos campos.
//fechaCancelacion: Fecha de cancelacion de la orden

let respuestaAddWorkOrder = mobileAPIHelper.UpdateWorkOrderMobile(urlMobile, mobileClientId, productId, idOrder, type, usuarioAsignado, fechaExpiracion, parametrosMobile, fechaCancelacion);
```
            