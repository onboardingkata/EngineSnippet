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

        #region Función 1: Método que convierte un archivo PDF codificado en base64 a una imagen codificada en base64.

        /// <summary>
		/// Método que convierte un archivo PDF codificado en base64 a una imagen codificada en base64.
        /// Concatena las páginas verticalmente.
        /// Requiere instalar Paquetes NuGet "Magick.NET-Q8-AnyCPU" y "Magick.NET.Core"
        /// Colocar los archivos "gsdll64.dll" y "gswin64c.exe" dentro del proyecto. Descargar una versión de Ghostscript para obtenerlos (https://ghostscript.com/releases/gsdnld.html)
		/// </summary>
		/// <param name="archivoPdfBase64"></param>
		/// <returns>Una cadena de la imagen codificada en base 64</returns>
		public static string ConvertirPdfAImagenVertical(string archivoPdfBase64)
		{
			string imagenBase64 = String.Empty;
			try
			{
                // Ruta de ubicación de los archivos "gsdll64.dll" y "gswin64c.exe"
				MagickNET.SetGhostscriptDirectory(HostingEnvironment.MapPath("~/App_Data/Ghostscript/x64"));

				var settings = new MagickReadSettings();
				settings.Density = new Density(100); // Pixeles por Pulgada

				using (var images = new MagickImageCollection())
				{
                    // Leer cadena de PDF de entrada
					byte[] archivoPdf = Convert.FromBase64String(archivoPdfBase64);

                    // Coloca el PDF en un Stream
					using (MemoryStream streamPDF = new MemoryStream(archivoPdf))
					{
                        // Lee el contenido del PDF desde el Stream
						images.Read(streamPDF, settings);

						// Se crea una sóla imagen con la data del Stream del PDF
						using (var vertical = images.AppendVertically())
						{
                            // Formato de imagen de salida
							vertical.Format = MagickFormat.Png;
							vertical.Alpha(AlphaOption.Remove);
							vertical.BackgroundColor = MagickColors.White;

                            // Constuye imagen de salida
							byte[] bytesImagen;
							using (MemoryStream streamImagen = new MemoryStream())
                            {
								vertical.Write(streamImagen);

								bytesImagen = streamImagen.ToArray();
							}
                            // Codifica la Imagen en base64
							imagenBase64 = Convert.ToBase64String(bytesImagen);
						}
					}
				}
			}
			catch (Exception ex)
			{
				throw;
			}
			return imagenBase64;
		}

        #endregion
    }
}
