using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace FuncioneReutilizables
{
    /// <summary>
    /// Indica el tipo de peticion del servicio
    /// </summary>
    public enum TipoPeticion
    {
        Post = 1,
        Get = 2,
        Delete = 3,
        Put = 4
    }

    /// <summary>
    /// Clase que modela la estructura de una petición enviada a servicios REST
    /// </summary>
    /// <typeparam name="T">El tipo de entidad que será enviada dentro del cuerpo de la petición</typeparam>
    public class PeticionRest<T>
    {
        /// <summary>
        /// Propiedad que indica el tipo de petición que se está realizando
        /// </summary>
        public TipoPeticion Metodo { get; set; }

        /// <summary>
        /// Propiedad que indica el objeto que será enviado dentro de la petición
        /// </summary>
        public T Entidad { get; set; }

        /// <summary>
        /// Propiedad que indice el string enviado como cuerpo de la petición
        /// </summary>
        public string Cuerpo { get; set; }

        /// <summary>
        /// Propiedad que indica el Id del Modelo
        /// </summary>
        public string IdEntidad { get; set; }

        /// <summary>
        /// Propiedad que indica la URL base del servicio
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Propiedad que indica la el servicio particular al que se llamará
        /// </summary>
        public string Servicio { get; set; }

        /// <summary>
        /// Propiedad que indica los parámetros de la Url en caso de existir.
        /// </summary>
        public string ParametrosUrl { get; set; }

        /// <summary>
        /// Propiedad que indica si se debe guardar el contenido de la respuesta sin deserializar.
        /// </summary>
        public bool GuardarRespuestaSinDeserializar { get; set; }

        /// <summary>
        /// Propiedad que indica los Headers a enviarse dentro de la petición
        /// </summary>
        public Dictionary<string, string> Encabezados { get; set; }

        /// <summary>
        /// Constructor, inicializa una nueva instancia de la clase
        /// </summary>
        public PeticionRest()
        {
            this.Url = "";
            this.Servicio = "";
            this.ParametrosUrl = "";
            this.Cuerpo = "";
            this.Encabezados = new Dictionary<string, string>();
            this.GuardarRespuestaSinDeserializar = false;
        }
    }

    /// <summary>
    /// Clase que modela la respuesta de la llamada a un servicio REST
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class RespuestaRest<T>
    {
        /// <summary>
        /// La entidad a la que se deserializa la respuesta del servicio
        /// </summary>
        public T Entidad { get; set; }

        /// <summary>
        /// Contenido de la respuesta sin deserializar
        /// </summary>
        public string ContenidoRespuesta { get; set; }

        /// <summary>
        /// Propiedad que indica si la petición de proecso exitosamente
        /// </summary>
        public bool Correcto { get; set; }

        /// <summary>
        /// Mensaje que indica el error enn caso de haber ocurrido
        /// </summary>
        public string MensajeError { get; set; }

        /// <summary>
        /// Log detallado y stactk trace del error en caso de haber ocurrido
        /// </summary>
        public string DetalleError { get; set; }

        /// <summary>
        /// El código de estatus de la respuetsa http
        /// </summary>
        public int CodigoEstatus { get; set; }
    }

    /// <summary>
    /// Clase que realiza conexiones genéricas a servicios REST
    /// </summary>
    public class ConexionServiciosRest
    {

        /// <summary>
        /// Método que realiza una petición GET a un servicio REST.
        /// </summary>
        /// <param name="servicio">URL principal donde se encuentra alojado el servicio REST</param>
        /// <param name="urlServicio">Endpoint de acceso al servicio.</param>
        /// <returns>Objeto HttpResponseMessage que tiene el contenido de la respuesta del servicio.</returns>
        public static HttpResponseMessage LlamadaGET(string servicio, string urlServicio)
        {

            using (var cliente = new HttpClient())
            {
                if (urlServicio.ToLower().Contains("https"))
                {
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = ((sender, certificate, chain, sslPolicyErrors) => true);
                }

                //Estableciendo la url que proporciona acceso al servidor que publica la API 
                cliente.BaseAddress = new Uri(urlServicio);

                //Configurando encabezados para que la petición de realice en formato JSON
                cliente.DefaultRequestHeaders.Accept.Clear();

                HttpResponseMessage respuesta = cliente.GetAsync(servicio).GetAwaiter().GetResult();

                return respuesta;
            }

        }

        /// <summary>
        /// Método que realiza una petición GET a un servicio REST y obtiene la respuesta en un arreglo de bytes.
        /// </summary>
        /// <param name="servicio">URL principal donde se encuentra alojado el servicio REST.</param>
        /// <param name="urlServicio">Endpoint de acceso al servicio.</param>
        /// <returns>El arreglo de bytes con la respuesta.</returns>
        public static byte[] ObtenerRespuestaBytesServicioGet(string servicio, string urlServicio)
        {
            var response = LlamadaGET(servicio, urlServicio);

            if (response.IsSuccessStatusCode && response.Content != null)
            {
                return response.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult();
            }

            return null;
        }

        /// <summary>
        /// Método que realiza una petición GET a un servicio REST y obtiene la respuesta en un string.
        /// </summary>
        /// <param name="servicio">URL principal donde se encuentra alojado el servicio REST.</param>
        /// <param name="urlServicio">Endpoint de acceso al servicio.</param>
        /// <returns>El string con la respuest.a</returns>
        public static string ObtenerRespuestaStringServicioGet(string servicio, string urlServicio)
        {
            var response = LlamadaGET(servicio, urlServicio);

            if (response.IsSuccessStatusCode && response.Content != null)
            {
                return response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            }

            return null;
        }

        /// <summary>
        /// Método principal que realiza una peticion a un servicio REST.
        /// </summary>
        /// <typeparam name="T1">El tipo de entidad del contenido de la petición.</typeparam>
        /// <typeparam name="T2">El tipo de entidad del contenido de la respuesta.</typeparam>
        /// <param name="peticion">Objeto de tipo T1 con la petición.</param>
        /// <returns>Objeto de tipo T2 con la respuesta.</returns>
        public static RespuestaRest<T2> LlamarServiciosRest<T1, T2>(PeticionRest<T1> peticion)
        {
            RespuestaRest<T2> respuestaRest = new RespuestaRest<T2>();
            try
            {
                HttpResponseMessage respuesta = LlamarServiciosRest(peticion);
                respuestaRest.CodigoEstatus = (int)respuesta.StatusCode;
                if (respuesta.IsSuccessStatusCode)
                {
                    respuestaRest.Entidad = DeserializarRespuestaServicio<T2>(respuesta, out string contenido);
                    if (peticion.GuardarRespuestaSinDeserializar)
                    {
                        respuestaRest.ContenidoRespuesta = contenido;
                    }
                    respuestaRest.Correcto = true;
                }
                else
                {
                    respuestaRest.MensajeError = DeserializarRespuestaServicio<string>(respuesta, out string contenido);
                    respuestaRest.DetalleError = ObtenerMensajeErrorLlamadaRest(peticion, respuesta) + respuestaRest.MensajeError;
                    respuestaRest.Correcto = false;
                }
            }
            catch (Exception ex)
            {
                respuestaRest.MensajeError = ex.Message;
                respuestaRest.DetalleError = ex.ToString();
                respuestaRest.Correcto = false;
            }
            return respuestaRest;
        }

        /// <summary>
        /// Método que realiza una peticion a un servicio REST.
        /// </summary>
        /// <typeparam name="T">EL tipo de entidad contenido en la petición.</typeparam>
        /// <param name="peticion">La petición que será enviada al servicio.</param>
        /// <returns>Objeto HttpResponseMessage que tiene el contenido de la respuesta del servicio.</returns>
        private static HttpResponseMessage LlamarServiciosRest<T>(PeticionRest<T> peticion)
        {
            using (HttpClient cliente = new HttpClient())
            {
                cliente.Timeout = TimeSpan.FromMinutes(10);
                if (peticion.Url.ToLower().Contains("https"))
                {
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = ((sender, certificate, chain, sslPolicyErrors) => true);
                    //System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                }

                //Estableciendo la url que proporciona acceso al servicio
                if (!peticion.Url.EndsWith("/"))
                {
                    peticion.Url = peticion.Url + "/";
                }
                cliente.BaseAddress = new Uri(peticion.Url);

                //se configuran los encabezados para la petición, entre ellos que se realice en formato json
                AgregarHeaders(cliente.DefaultRequestHeaders, peticion.Encabezados);

                HttpResponseMessage respuesta;

                //se realiza la llamada al servicio dependiendo del tipo de método
                switch (peticion.Metodo)
                {
                    case TipoPeticion.Post:
                        {
                            peticion.Cuerpo = SerializarPeticionServicio(peticion.Entidad);
                            respuesta = cliente.PostAsync(peticion.Servicio,
                                new StringContent(peticion.Cuerpo, Encoding.UTF8, "application/json")).GetAwaiter().GetResult();
                        }
                        break;
                    case TipoPeticion.Get:
                    default:
                        {
                            string parametrosUrl = !String.IsNullOrWhiteSpace(peticion.IdEntidad) ? peticion.IdEntidad + "/" : "";
                            parametrosUrl = !String.IsNullOrWhiteSpace(peticion.ParametrosUrl) ? (peticion.ParametrosUrl.StartsWith("?") ? peticion.ParametrosUrl : "?" + peticion.ParametrosUrl) : "";
                            parametrosUrl = peticion.Servicio.EndsWith("/") ? peticion.Servicio + parametrosUrl : peticion.Servicio + "/" + parametrosUrl;
                            respuesta = cliente.GetAsync(parametrosUrl).GetAwaiter().GetResult();
                        }
                        break;
                }
                return respuesta;
            }
        }

        /// <summary>
        /// Método que agrega los encabezados a la petición.
        /// </summary>
        /// <param name="headersPeticion">Objeto a donde se va an agregar los encabezados.</param>
        /// <param name="encabezados">Diccionario que contiene los encabezados a enviarse.</param>
        private static void AgregarHeaders(HttpRequestHeaders headersPeticion, Dictionary<string, string> encabezados)
        {
            headersPeticion.Clear();
            foreach (KeyValuePair<string, string> encabezado in encabezados)
            {
                headersPeticion.TryAddWithoutValidation(encabezado.Key, encabezado.Value);
            }
            headersPeticion.Add("Accept", "application/json");
        }

        /// <summary>
        /// Método que convierte un objeto a su representación en json.
        /// </summary>
        /// <typeparam name="T">El tipo de la entidad.</typeparam>
        /// <param name="modelo">El objeto a convertir.</param>
        /// <returns>un string con el objeto serializado.</returns>
        private static string SerializarPeticionServicio<T>(T modelo)
        {
            string contenido = "";

            if (typeof(T) == typeof(String))
            {
                contenido = (String)Convert.ChangeType(modelo, typeof(String));
            }
            else
            {
                JsonSerializerSettings microsoftDateFormatSettings = new JsonSerializerSettings
                {
                    DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
                };
                contenido = JsonConvert.SerializeObject(modelo, microsoftDateFormatSettings);
            }
            return contenido;
        }

        /// <summary>
        /// Método que obtiene a respuesta de un servicio Rest y la deserializa a un objeto.
        /// </summary>
        /// <typeparam name="T">El tipo de la entidad.</typeparam>
        /// <param name="respuesta">La resuesta obtenida por el servicio Rest.</param>
        /// <returns>El objeto T deserializado</returns>
        private static T DeserializarRespuestaServicio<T>(HttpResponseMessage respuesta, out string contenido)
        {
            T contenidoRespuesta;
            Stream contenidoStream = respuesta.Content.ReadAsStreamAsync().GetAwaiter().GetResult();
            contenidoStream.Seek(0, SeekOrigin.Begin);
            using (var reader = new StreamReader(contenidoStream))
            {
                contenido = reader.ReadToEnd();
                if (typeof(T) == typeof(String))
                {
                    contenidoRespuesta = (T)Convert.ChangeType(contenido, typeof(T));
                }
                else
                {
                    contenidoRespuesta = JsonConvert.DeserializeObject<T>(contenido);
                }
                return contenidoRespuesta;
            }
        }

        /// <summary>
        /// Método que obtiene a respuesta de un servicio Rest y la deserializa a una lista.
        /// </summary>
        /// <typeparam name="T">El tipo de la entidad.</typeparam>
        /// <param name="respuesta">La resuesta obtenida por el servicio Rest.</param>
        /// <returns>Lista con objetos deserializados.</returns>
        private static List<T> DeserializarListaServicio<T>(HttpResponseMessage respuesta)
        {
            List<T> listaContenido = new List<T>();
            Stream contenidoStream = respuesta.Content.ReadAsStreamAsync().GetAwaiter().GetResult();
            contenidoStream.Seek(0, SeekOrigin.Begin);
            using (var reader = new StreamReader(contenidoStream))
            {
                string contenido = reader.ReadToEnd();
                listaContenido = DeserializarALista<T>(contenido);
                return listaContenido;
            }
        }

        /// <summary>
        /// Método que deserializa un json a una lista.
        /// </summary>
        /// <typeparam name="T">El tipo de la entidad.</typeparam>
        /// <param name="json">String con el contenido json.</param>
        /// <returns>Lista con objetos deserializados.</returns>
        private static List<T> DeserializarALista<T>(string json)
        {
            var arreglo = JArray.Parse(json);
            List<T> listaObjetos = new List<T>();

            foreach (var item in arreglo)
            {
                try
                {
                    T elemento;
                    if (typeof(T) == typeof(String))
                    {
                        elemento = (T)Convert.ChangeType(item, typeof(T));
                    }
                    else
                    {
                        elemento = JsonConvert.DeserializeObject<T>(item.ToString(),
                            new JsonSerializerSettings() { DateParseHandling = DateParseHandling.None });
                    }
                }
                catch (Exception ex)
                {

                }
            }
            return listaObjetos;
        }

        /// <summary>
        /// Obtiene un mensaje de error apartir de la petición.
        /// </summary>
        /// <typeparam name="T">El tipo de la peticion.</typeparam>
        /// <param name="peticion">La petición que será enviada al servicio.</param>
        /// <param name="respuesta">La resuesta obtenida por el servicio Rest.</param>
        /// <returns>String con mensaje detallado de error</returns>
        private static string ObtenerMensajeErrorLlamadaRest<T>(PeticionRest<T> peticion, HttpResponseMessage respuesta)
        {
            string mensaje = string.Empty;
            try
            {
                mensaje = "Error en llamada a servicio REST. "
                            + "Url: " + peticion.Url + " ,"
                            + "Servicio: " + peticion.Servicio + " , "
                            + "Parametos: " + peticion.ParametrosUrl + " , "
                            + "Codigo de error: " + respuesta.StatusCode.ToString() + " , "
                            + "Error: " + respuesta.ReasonPhrase + " , ";
            }
            catch
            {

            }
            return mensaje;
        }

    }


   

}
