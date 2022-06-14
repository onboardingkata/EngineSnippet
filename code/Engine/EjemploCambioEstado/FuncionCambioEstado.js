(async function (_value) {
    
    //aqui define tus constantes de los estados
    //estos son algunos ejemplos, puedes borrar o renombrar.
    const PENDIENTE = 0;
    const EN_PROCESO = 1;
    const TERMINADO = 1;

    //Constantes de log
    const NOMBRE_PRODUCTO = "<Aqui nombre de producto>";
    const POSICION_CONTENEDOR = "<Aqui posicion contenedor>";
    const NOMBRE_CONTENEDOR = "<Aqui nombre contenedor>";

    //aqui define tus constantes del contenedor
    const  APROBADO = "APROBADO";

    //aqui define tus variables de la tarea
    let estadoActual = getContainerCustomStatus(_value.containerId);

    //funcion de cambio de estado
    try {
        //importante imprimir el estado inicial
        customLogger.Informative(NOMBRE_PRODUCTO, POSICION_CONTENEDOR, NOMBRE_CONTENEDOR, "Cambio Estado> Inicia en: " + estadoActual);
        //mecanica de cambio de estado
        switch (estadoActual) {
            case PENDIENTE:
                //aqui tu logica si es que hay condicioens
                estadoActual = EN_PROCESO;
                break;
            //agrega los demas casos que tengas que controlar

        }

    } catch (excepcion) {

        //importante logear los errores
        let errorMessageResponse = excepcion.response ? JSON.stringify(excepcion.response.data) : ""
        let textoErrorLog = `Error al procesar ${NOMBRE_CONTENEDOR} Error: ${excepcion.message} ${errorMessageResponse} : ${excepcion.stack}`;
        let textoError = `Error al procesar ${NOMBRE_CONTENEDOR} Error: ${excepcion.message} ${errorMessageResponse}`;
        logHelper.AddErrorEntry(`Error al procesar ${NOMBRE_CONTENEDOR} Error: ${excepcion.message}  ${errorMessageResponse}`);

        customLogger.Error(NOMBRE_PRODUCTO, POSICION_CONTENEDOR, NOMBRE_CONTENEDOR, textoErrorLog, JSON.stringify({}));
        //puedes manear un trhow o un estado de error, dependera de tu implementacion
        throw new Error(textoError);

    } finally {
        //Se regista en el log el final del procesamiento del cambio de estados
        customLogger.Informative(NOMBRE_PRODUCTO, POSICION_CONTENEDOR, NOMBRE_CONTENEDOR, "Cambio Estado> Finaliza en: " + estadoActual);
    }

    //se retorna el estado final
    return estadoActual;
})(_v_);