# Funcion para convertir un PDF en Imagen y cambiar orientación vertical

El archivo [FuncionPDFaImagen.cs](FuncionPDFaImagen.cs) cuenta con una clase que contienen una función para convertir un PDF a una imagen, el parametro que recibe es el pdf en formato base64, la función detecta si hay varias paginas y las concatena de manera vertical.

Para el funcionamiento es necesario lo siguiente:

* Requiere instalar Paquetes NuGet "Magick.NET-Q8-AnyCPU" y "Magick.NET.Core"
* Colocar los archivos "gsdll64.dll" y "gswin64c.exe" dentro del proyecto. Descargar una versión de Ghostscript para obtenerlos (https://ghostscript.com/releases/gsdnld.html)
		

A continuación un ejemplo de como se utiliza la clase

```
    imagenResultado = ConvertirPdfAImagenVertical(string archivoPdfBase64)
```

Autor: Ulises Ortega Mena