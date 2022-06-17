using ImageMagick;
using System;
using System.IO;
using System.Web.Hosting;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Core
{
    public class FuncionesReutilizables
    {

        #region Función 2: Obtener el valor de una propiedad con cierto nombre de un objeto Json

        /// <summary>
        /// Método de Extensión: Obtiene una propiedad dentro de un json, si no existe devuelve un valor por default.
        /// Ejemplo: valorPropiedad = objetoJson.PropiedadDefault<string>("nombrePropiedad")
        /// </summary>
        /// <param name="objetoJson">El json del cual se desea obtener la propiedad</param>
        /// <param name="propiedad">EL nombre de la propiedad que se desea obtener</param>
        /// <returns>El valor de tipo T</returns>
        public static T PropiedadDefault<T>(this JToken objetoJson, string propiedad)
        {
            try
            {
                JToken token = objetoJson[propiedad];
                if (token == null || token.Type == JTokenType.Null)
                {
                    return default(T);
                }
                if (String.IsNullOrEmpty(token.Value<string>()))
                {
                    return default(T);
                }
                return token.Value<T>();
            }
            catch (Exception ex)
            {
                throw new Exception("La propiedad: " + propiedad + " no tiene el formato correcto", ex);
            }
        }

        #endregion

        #region Función 3: Obtener el valor de una propiedad dentro de un arreglo con cierto nombre de un objeto Json
        
        /// <summary>
        /// Método de Extensión: Obtiene el valor de una propiedad que está dentro de un arreglo en el objeto json, si no existe devuelve un valor por default.
        /// Ejemplo: valorPropiedad = objetoJson.PropiedadArrayDefault<string>("nombrePropiedad")
        /// </summary>
        /// <param name="objetoJson">El json del cual se desea obtener la propiedad</param>
        /// <param name="propiedad">EL nombre de la propiedad que se desea obtener</param>
        /// <returns>El valor de tipo T</returns>
        public static T PropiedadArrayDefault<T>(this JToken objetoJson, string propiedad)
        {
            try
            {
                JToken token = objetoJson[propiedad];
                if (token == null || token.Type == JTokenType.Null || !token.HasValues)
                {
                    return default(T);
                }

                JArray arregloValor = (JArray)token;

                if (arregloValor.Count > 0)
                {
                    JToken valor = arregloValor[0];
                    if (String.IsNullOrEmpty(valor.Value<string>()))
                    {
                        return default(T);
                    }
                    return valor.Value<T>(); ;
                }
                else
                {
                    return default(T);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("La propiedad: " + propiedad + " no tiene el formato correcto", ex);
            }
        }

        #endregion
	
    }
}
