//Descripcion: Estructur para una funcion de asignacion
//Accion Editar se retorna el id de la carpeta o buzon en el arreglo, solo se debe enviar un valor
//Accion ver se retorna un id de buzon o carpeta o varios id's de carpetas, se puede enviar mas de un valor pero solo funciona para el view
(function (idInstancia, idTarea, tipoOperacion, carpetas, idCarpetasCandidatas) {
    //si la carpeta asignar no es necesario obtenerla o calcularla, se recomienda que se obtenga ne el cambio de estado se guarde en un campo y luego se lea el campo
    //de esta forma ya no se consumen recursos para leer la estructura jerarquica.
    const ID_TAREA = "[ID CONTENEDOR]";
    let idCarpeta = getValueByFullName(ID_TAREA, "[ID CAMPO CON ID CARPETA]");
    
    return [idCarpeta];
}(_v1_, _v2_, _v3_, _v4_, _v5_));