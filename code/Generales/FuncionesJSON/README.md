# Funciones para obtener el valor de una propiedad en un JSON utilizando C#

El archivo [FuncionesJSON.cs](FuncionesJSON.cs) cuenta con una clase que contienen funciones para obtener el valor de una propiedad en un JSON.

Las funciones que cuenta la case son las siguientes:

* PropiedadDefault - Este metodo busca una propiedad en un JSON simple
* PropiedadArrayDefault - Este metodo busca una propiedad en un JSON de tipo Arreglo.

A continuación un ejemplo de como se utiliza la clase

```
    //Busqueda en un json simple
    valorPropiedad = objetoJson.PropiedadDefault<string>("nombrePropiedad")

    //Busqueda en un arreglo
    valorPropiedad = objetoJson.PropiedadArrayDefault<string>("nombrePropiedad")
```

Autor: Ulises Ortega Mena