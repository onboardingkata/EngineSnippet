//const externalCatalogHelper = require('../externalCatalogHelper');
//const notificationHelper = require('../notificationsHelper');
//const service = require('../ServiceUtils');
//const xmlToJsonHelper = require('../xmlToJsonHelper');
//const associatePdfHelper = require('../AssociatePdfHelper');
//const schedulerHelper = require('../schedulerHelper');
//const moment = require('moment-timezone');
//const logHelper = require('../logValidationHelper');
const contextService = require('request-context');
const customLogger = require('../engineLogger');
const moment = require('moment-timezone');

class ClaseExterna {
    constructor() {
    }

    llamarLog(nombreProducto, pocisionContenedor, nombreContenedor, mensaje, objeto){
        customLogger.Informative(nombreProducto, pocisionContenedor, nombreContenedor, mensaje, JSON.stringify(objeto));
    }

    async llamarServicioReferenciado(producto, metodologia){
        //para llamar los helpers se tiene que utilizar el this.
        let estadoTarea = this.getContainerCustomStatus("id_tarea");
        let valorCampo = this.getValueByFullName("id_tarea", "valorCampo");

        //para gaurdar es el mismo esquema
        await this.saveValueHelper("idtarea", {
            valorCampo: valorCampo
        });
    }


}

module.exports = ClaseExterna;

var ClaseExterna = require('./externals/ClaseExterna');
var claseExterna = new ClaseExterna();
//esta llamada es directamente la función y la función no requiere de utilizar helpers referenciados
claseExterna.llamarLog("Producto","01010101","nombreContenedor","Mensaje para el log",{});
//para llamar un servicio con las referencias de los helpers se utiliza env como primer parametro y un segundo parametro de tipo arreglo con los parametros de la función utilizando el apply
await claseExterna.llamarServicioReferenciado.apply(env, ["producto", "metodologia"]);
                    