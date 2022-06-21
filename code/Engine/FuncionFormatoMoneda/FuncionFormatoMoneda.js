//Descripcion: Recibre como pareametro un valor, en caso de ser diferente de vacio se convierte a numerico y se le da foromato.
//Esta funcion es compatible con Engine para los campos restringidos, si es arreglo obtiene el indice cero
function convertirFormatoMoneda(valorCampo) {
    let valorRetorno = null;
    valorRetorno=valorCampo;
    if (valorCampo !== null && valorCampo!== undefined) {
        if (Array.isArray(valorCampo)) {
            valorRetorno = valorCampo[0];
        } else {
            valorRetorno = valorCampo;
        }
    }
    if (valorRetorno !== null || valorRetorno !== undefined) {
        valorRetorno = "$" + parseFloat(valorRetorno).toLocaleString();
    } 

    return valorRetorno;
}