(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.mobileAPI = global.mobileAPI || {})));
}(this, (function (exports) {
    'use strict';
    require("../Constants");
    let request = require('sync-request');    
    var customLogger = require('../engineLogger');
    var http = require("http");
    var https = require('https');    
    const UrlUtil = require('url');
    let axios = require('axios');    
    var applicationInsightsHelper = require('../applicationInsightsHelper');

    const ADD_ORDER = "AddWorkOrdersXMLId";
    
    const UPDATE_ORDER = "UpdateExistsWorkOrdersId";

    function calcularTimpo(fechaInicio, fechaFin) {
        var dif = fechaFin.getTime() - fechaInicio.getTime()

        var Segundos_de_T1_a_T2 = dif / 1000;
        var Segundos_entre_fechas = Math.abs(Segundos_de_T1_a_T2);
        return Segundos_entre_fechas;
    }
    
    var _CreateParameters = function(parameters) {
        let bodyParemeters = "";
        for (var keyParameter in parameters) {
            let valueParameter = parameters[keyParameter];

            bodyParemeters += `<parametro llave="${keyParameter}" valor="${valueParameter}"/>`;

        }
        return bodyParemeters;
    }

    var _CallMobileAddWorkOrder = function (url, payload, soapAction) {
       
        let result = {};
        let paquete = "";
        var fechaInicio = new Date();

        let headers = {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': `http://tempuri.org/IBackEnd/${soapAction}`
        };
        applicationInsightsHelper.TrackDependency("_CallMobileAddWorkOrder Request", "URL: " + url , 200);
        console.log("Payload Mobile*****");
        console.log(payload);
        var res = request('POST', url, {
            headers: headers,
            body: payload
        });

        result = res.getBody().toString();

        var fechaFin = new Date();
        var tiempoProcesamiento = (calcularTimpo(fechaInicio, fechaFin) * 1000);

        applicationInsightsHelper.TrackDependency("_CallMobileAddWorkOrder Response", JSON.stringify({ "url": url, "requestData": payload, "jsonResult": result}), 200, tiempoProcesamiento);

        const xmlStatic = "<AddWorkOrdersXMLIdResult>";

        /* if (result.includes(xmlStatic)) {
            paquete = result.substring(
                result.lastIndexOf(xmlStatic) + xmlStatic.length,
                result.lastIndexOf("</AddWorkOrdersXMLIdResult>")
            );
        } */

        return result;
    };

    var _AddWorkOrderMobile = function (urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate) {        
      
        let responseService = _AddOrUpdateWorkOrder(urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate, ADD_ORDER);

        return responseService;
    }

    var _UpdateWorkOrderMobile = function (urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate) {        
      
        let responseService = _AddOrUpdateWorkOrder(urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate, UPDATE_ORDER);

        return responseService;
    }


    var _AddOrUpdateWorkOrder = function (urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate, soapAction) {
        
        let parametersBody = _CreateParameters(parameters);
        let envelopeExpiration = "";
        if (expirationDate){
            envelopeExpiration+=` expirationDate="${expirationDate}"`;
        }
        if (cancellationDate){
            envelopeExpiration+=` cancellationDate="${cancellationDate}"`;
        }
        //expirationDate="${expirationDate}"
        //cancellationDate="${endDate}"
        //assignDate=""
        let envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:${soapAction}><tem:clientId>${clientId}</tem:clientId><tem:productId>${productId}</tem:productId><tem:workOrders><![CDATA[<Coleccion><NewOrder id="${idOrder}" type="${type}" version="1.0" userName="${userName}" priority="1"${envelopeExpiration}><Parametros>${parametersBody}</Parametros></NewOrder></Coleccion>]]></tem:workOrders></tem:${soapAction}></soapenv:Body></soapenv:Envelope>`;

        customLogger.Error("Mobile", "878", "AddWorkOrderMobile", 'Peticion _AddOrUpdateWorkOrder', envelope);
        let responseService = _CallMobileAddWorkOrder(urlMobile, envelope, soapAction);
        customLogger.Error("Mobile", "878", "AddWorkOrderMobile", 'Respuesta _AddOrUpdateWorkOrder', JSON.stringify(responseService));

        return responseService;
    }

    var _AddOrUpdateWorkOrder = function (urlMobile, clientId, productId, idOrder, type, userName, expirationDate, parameters, cancellationDate, soapAction) {
        
        let parametersBody = _CreateParameters(parameters);
        let envelopeExpiration = "";
        if (expirationDate){
            envelopeExpiration+=` expirationDate="${expirationDate}"`;
        }
        if (cancellationDate){
            envelopeExpiration+=` cancellationDate="${cancellationDate}"`;
        }
        //expirationDate="${expirationDate}"
        //cancellationDate="${endDate}"
        //assignDate=""
        let envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:${soapAction}><tem:clientId>${clientId}</tem:clientId><tem:productId>${productId}</tem:productId><tem:workOrders><![CDATA[<Coleccion><NewOrder id="${idOrder}" type="${type}" version="1.0" userName="${userName}" priority="1"${envelopeExpiration}><Parametros>${parametersBody}</Parametros></NewOrder></Coleccion>]]></tem:workOrders></tem:${soapAction}></soapenv:Body></soapenv:Envelope>`;

        customLogger.Error("Mobile", "878", "AddWorkOrderMobile", 'Peticion _AddOrUpdateWorkOrder', envelope);
        //console.log("*******");
        //console.log(envelope);
        //console.log("*******");
        let responseService = _CallMobileAddWorkOrder(urlMobile, envelope, soapAction);
        customLogger.Error("Mobile", "878", "AddWorkOrderMobile", 'Respuesta _AddOrUpdateWorkOrder', JSON.stringify(responseService));

        return responseService;
    }


    var _SendMessageMobile = function (urlMobile, clientId, productId, userName, contentMsg) {        
        
        let soapAction = "QueueMessageToUserName";        
        let envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:QueueMessageToUserName><tem:clientId>${clientId}</tem:clientId><tem:productId>${productId}</tem:productId><tem:userName>${userName}</tem:userName><tem:sender>admin</tem:sender><tem:content>${contentMsg}</tem:content><tem:isImportant>true</tem:isImportant></tem:QueueMessageToUserName></soapenv:Body></soapenv:Envelope>`;

        customLogger.Error("Mobile", "878", "SendMessageMobile", 'Peticion _SendMessageMobile', envelope);
        let responseService = _CallMobileAddWorkOrder(urlMobile, envelope, soapAction);
        customLogger.Error("Mobile", "878", "SendMessageMobile", 'Respuesta _SendMessageMobile', JSON.stringify(responseService));

        return responseService;
    }

    var _CancelOrder = function (urlMobile, clientId, productId, idOrder) {        
        
        let soapAction = "CancelWorkOrdersXMLId";        
        let envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:CancelWorkOrdersXMLId><tem:clientId>${clientId}</tem:clientId><tem:productId>${productId}</tem:productId><tem:cancelOrders><![CDATA[<Collection><CancelOrder id="${idOrder}"/></Collection>]]></tem:cancelOrders></tem:CancelWorkOrdersXMLId></soapenv:Body></soapenv:Envelope>`;

        customLogger.Error("Mobile", "878", "CancelOrder", 'Peticion _CancelOrder', envelope);
        let responseService = _CallMobileAddWorkOrder(urlMobile, envelope, soapAction);
        customLogger.Error("Mobile", "878", "CancelOrder", 'Respuesta _CancelOrder', JSON.stringify(responseService));

        return responseService;
    }


    exports.CreateParameters = _CreateParameters;
    exports.CallMobileAddWorkOrder = _CallMobileAddWorkOrder;
    exports.AddWorkOrderMobile = _AddWorkOrderMobile;
    exports.UpdateWorkOrderMobile = _UpdateWorkOrderMobile;
    exports.AddOrUpdateWorkOrder = _AddOrUpdateWorkOrder;
    exports.SendMessageMobile = _SendMessageMobile;
    exports.CancelOrder = _CancelOrder;

    Object.defineProperty(exports, '__esModule', { value: true });
})));