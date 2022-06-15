const Utils = require('../../../Utils');
const Constants = require('./Config/Constants');

module.exports = function (info) {
    const { Body } = info;
    return new Promise((success, fail) => {
        const { data, isOk } = Utils.getParentData(Body);
        if (isOk && Utils.isObject(data)) {
            success(data);
        } else {
            fail(new Error(Constants.Msg.INVALID_REQUEST));
        }
    });
};
