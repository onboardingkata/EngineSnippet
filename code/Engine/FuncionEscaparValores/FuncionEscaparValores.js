//Descripcion: Funcion para detectar valores & < > " ' y escaparlos, es util para enviar información a mobile.
//Parametros: texto de entrada que se desea escapar
function escaparValores(valorEscape) {
    return valorEscape.toString().replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}