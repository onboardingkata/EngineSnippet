//Descripcion: Funcion para convertir valores & < > " ' que estan escapados a su valor original, es util para leer información de mobile que envia escapada.
//Parametros: texto de entrada que se desea quitar escapar
function unescapeValores(valorEscape) {
    return valorEscape.replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}