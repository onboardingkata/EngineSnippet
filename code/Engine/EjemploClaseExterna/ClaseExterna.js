//Descripcion: Ejemplo de una clase externa

//En caso de no hacer una llamada con referencia por medio del apply se tienen que definir los helpers que vamos a utilizar.

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
//la clase tiene que ser exportada para poder utilizarla.
module.exports = ClaseExterna;

