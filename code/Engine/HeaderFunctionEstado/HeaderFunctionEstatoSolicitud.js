//Descripcion: esta función obtiene el estado actual del contenedor del producto para saber que custom status tiene asignado y descripcion.
//Por esta forma nos evitamos hacer una comparación para retornar un texto.
(function (_value) {
    const idProducto = "<ID_CONTENEDOR_PRODUCTO>";
    let estadoActualProducto = getContainerCustomStatus(idProducto);
    let estadoTextoActual = documentJson.containers[idProducto].customStatusInfo[estadoActualProducto].description;
    return estadoTextoActual;
})(_v_);