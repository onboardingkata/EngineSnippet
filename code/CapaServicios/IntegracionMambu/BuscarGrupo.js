const MambuServices = require('./Svc/CoreServices');
const Utils = require('../../../Utils');
const Tracer = require('../../../Tracer');
const Constants = require('./Config/Constants');

module.exports = function (info) {
    const {
        Bridge, TenantId, Method, Query, Body, Headers, AsyncInfo, ThreadId,
    } = info;
    return new Promise((success, fail) => {
        Tracer.localTrace('BuscarGrupo');

        if (!Utils.isObject(Body)) {
            fail(new Error(Constants.Msg.INVALID_QUERY));
        }

        const nextStep = 'VisionFund/Complete';
        const msvc = new MambuServices(info, nextStep, Body);
        msvc.searchGroup(Body)
            .then((result) => Utils.flowTo(nextStep, result, info, success, fail))
            .catch((error) => fail(Utils.buildHttpError(error.response.status, error.response.data)));
    });
};
