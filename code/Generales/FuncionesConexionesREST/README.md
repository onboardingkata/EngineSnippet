# Funciones de consumo de servicios REST en C#

El archivo [ConexionServiciosRest.cs](ConexionServiciosRest.cs) cuenta con una clase que nos permite consumir servicios REST, la función esta construida en C#.

Las funciones que cuenta la case son las siguientes:

* LlamarServiciosRest - Este metodo llama al servicio y serializa la respuesta en un objeto
* ObtenerRespuestaBytesServicioGet - Este metodo llama al servicio y devuelve la respuesta como un arreglo de Bytes
* ObtenerRespuestaStringServicioGet - Este metodo llama al servicio y devuelve la repuesta como String.

A continuación un ejemplo de como se utiliza la clase

```
    public class EjemploConsumo
    {

        public static void ConsumirServicio()
        {
            //acá se construye el cuerpo que se enviará en la petición
            var cuerpoPeticion = new
            {
                propiedad1 = "a",
                propiedad2 = "b"
            };

            PeticionRest<object> peticionRest = new PeticionRest<object>();

            //Se agregan los headers y parámetros a la petición
            peticionRest.Encabezados.Add("Authorization", "Bearer " + "acá el token de acceso en caso de requerirse");
            peticionRest.Entidad = cuerpoPeticion;
            peticionRest.Url = "http://localhost:80/";
            peticionRest.Metodo = TipoPeticion.Post;
            peticionRest.Servicio = "api/ejemploServicio";
            peticionRest.GuardarRespuestaSinDeserializar = false;

            //Se utiliza el método respectivo de la biblioteca para consumir el servicio REST
            RespuestaRest<JToken> respuestaRest = ConexionServiciosRest.LlamarServiciosRest<object, JToken>(peticionRest);

            //Se verifica que la respuesta sea correcta
            if (!respuestaRest.Correcto)
            {
                throw new Exception("Ocurrio un error al llamar al servicio." + respuestaRest.DetalleError);
            }

            var objetoRespuesta = respuestaRest.Entidad;

            //acá lo necesario para trabajar con la respuesta del servicio objetoRespuesta


        }


    }
```

Autor: Victor Ortiz Othon