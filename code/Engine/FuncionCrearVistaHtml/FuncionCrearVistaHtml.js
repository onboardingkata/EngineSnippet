//Descripcion: Funcion para crear una tabla html a partir de dos parametros, los textos que se desean mostrar y cantidad de columnas
//los textos que se van a mostrar estan divididos en etiqueta y campo.
//Parametros
//camposVistaPrevia, son los campos que deseamos que se generen en el html
//cantidadColumnas, es la cantidad de columnas que deseamos que se muestren por linea.
function creaVistaPreviaHtml(camposVistaPrevia, cantidadColumnas) {
    let vistaPrevia = "";
    let contador = 0;
    let controlCampos = "";
    for (let index = 0; index < camposVistaPrevia.length; index++) {
        const element = camposVistaPrevia[index];            
        if (contador === 0) {
            controlCampos += "<tr>";
        }
        controlCampos += `<td><div class="divTitulo">${element.Etiqueta}</div><div class="divTexto">${element.Campo} </div></td>`;
        contador++;
        if (contador === cantidadColumnas) {
            controlCampos += "</tr>";
            contador = 0;
        }

    }
    vistaPrevia = controlCampos ? `<table>${controlCampos}</table>` : "";
    return vistaPrevia;
}