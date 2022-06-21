# Función para crear vista HTML a partir de un arreglo de datos

El archivo [FuncionCrearVistaHtml.js](FuncionCrearVistaHtml.js) contiene una función la cual recibe como parametro un arreglo de objetos con textos a presentar dentro de un html y la cantidad de columas, esta función es util al momento de mostrar resumenes en un campo de tipo HTML en engine.

la forma de uso es la siguiente:

```
  let camposVistaPrevia= [
                        {
                            "Etiqueta": "Nombre del Titular",
                            "Campo": getValueByFullName(ID_TAREA_FORMACION, "nombreTitularAhorroGrupal")
                        },
                        {
                            "Etiqueta": "Nombre del Banco",
                            "Campo": getValueByFullName(ID_TAREA_FORMACION, "nombreBancoAhorroGrupal")
                        },
                        {
                            "Etiqueta": "Cantidad de Deposito",
                            "Campo": getValueByFullName(ID_TAREA_FORMACION, "montoDepositado")
                        }
                    ];
  let cantidadColumnas = 2;
  let vistaPrevia = creaVistaPreviaHtml(camposVistaPrevia, cantidadColumnas);
  //el resultado sera una tabla html con dos filas de 2 columnas cada una.
```

Autor: Norberto Agustin Marcos