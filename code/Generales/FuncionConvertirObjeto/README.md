# Función para mapear las propiedades de un objeto en otro tipo.

El archivo [ConvertirObjeto.cs](ConvertirObjeto.cs) cuenta con una función para mapear las propiedades de un objeto en otro, esto es muy util al momento de consurmir servicio o exponer respuesta de servicios.

Para utilizar la función se realiza de la siguiente forma.

```
//Así se emplea (las clases deben de tener los mismos nombres de campos)
var garantiaPersonalBantotal = mapper.RealizaMapper<GarantiaPersonalSolicitudCreditoFormiikMSE, GarantiaPersonalSolicitudCreditoFormiikBantotalMSE>(garantiaPersonal);
```

Autor: Jorge Barajas Estrada