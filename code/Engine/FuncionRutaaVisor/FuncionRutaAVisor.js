//Descripcion esta función recibe una ruta http con un documento o imagen identifica la extencion para crear un visor html escapado
//Parametros valor rutaDocumento es la ruta del archivo
function formatoRuta(rutaDocumento) {
    let retorno = "";
    if (rutaDocumento) {
        if (rutaDocumento.toLowerCase().includes("pdf")) {
            //para documentos pdf
            retorno = `&lt;html&gt;&lt;body&gt;&lt;center&gt;&lt;h2&gt;Documento&lt;/h2&gt;&lt;/center&gt;&lt;br/&gt;&lt;a href=&quot;${rutaDocumento}&quot; &gt;Descargar&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;`;
        } else {
            //para imagenes
            retorno = `&lt;html&gt;&lt;body&gt;&lt;center&gt;&lt;h2&gt;Foto&lt;/h2&gt;&lt;/center&gt;&lt;br/&gt;&lt;img src=&quot;${rutaDocumento}&quot; alt=&quot;Trulli&quot; width=&quot;100%&quot; height=&quot;auto&quot; /&gt;&lt;/body&gt;&lt;/html&gt;`;
        }
    }
    return retorno;
}