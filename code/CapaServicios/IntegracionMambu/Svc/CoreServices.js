/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
const Utils = require('../../../../Utils');
const Tracer = require('../../../../tracer');
const configCore = require('../Config/CoreConfing.json');
const Constants = require('../Config/Constants');

const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_CONTENT_VALUE = 'application/json';
const HEADER_ACEPT = 'Accept';
const HEADER_ACEPT_VALUE = 'application/vnd.mambu.v2+json';
const HEADER_AUTHORIZATION = 'Authorization';
const HEADER_USER_AGENT = 'User-Agent';

const HEADER_AUTH_VALUE = (usr, psw) => `Basic ${Utils.b64EncodeUtf8String(`${usr}:${psw}`)}`;

module.exports = function (info, nextStep, processInfo) {
    const {
        Bridge, TenantId, AsyncInfo, ThreadId,
    } = info;
    function config() {
        return configCore.Tenants[TenantId];
    }
    function headers() {
        const header = {
            [HEADER_AUTHORIZATION]: HEADER_AUTH_VALUE(config().Usr, config().Psw),
            [HEADER_CONTENT_TYPE]: HEADER_CONTENT_VALUE,
            [HEADER_ACEPT]: HEADER_ACEPT_VALUE,
            [HEADER_USER_AGENT]: config().UsrAgt,
        };
        return header;
    }
    function isValidTenant(fail) {
        if (!configCore.Tenants.hasOwnProperty(TenantId)) {
            fail(new Error(Constants.Msg.NO_TENANT_IN_PROPERTIES));
        }

        if (!Utils.isStringNotEmpty(TenantId)) {
            fail(new Error(Constants.Msg.NO_TENANT_IN_BODY));
        }
    }
    function post(url, data, from, success, fail, header) {
        const head = header || headers();
        Bridge.HttpRequest.postEx(
            ThreadId,
            TenantId,
            success,
            fail,
            nextStep,
            processInfo,
            AsyncInfo,
            url,
            data,
            head,
        ).catch((error) => {
            Tracer.traceError(error);
            fail(error);
        });
    }

    function searchGroup(data) {
        return new Promise((success, fail) => {
            isValidTenant(fail);

            if (!Utils.isStringNotEmpty(data.groupName)) {
                fail(new Error(Constants.Msg.NO_GROUP_NAME));
            }

            if (!Utils.isStringNotEmpty(data.assignedBranchKey)) {
                fail(new Error(Constants.Msg.NO_BRANCH_KEY));
            }

            const url = Constants.Url.SEARCH_GROUPS(config().Url);

            const body = {
                filterCriteria: [{
                    field: 'branchKey',
                    operator: config().HarcodedParameters.Equals,
                    value: data.assignedBranchKey,
                },
                {
                    field: 'groupName',
                    operator: config().HarcodedParameters.Equals,
                    value: data.groupName,
                },
                ],
                sortingCriteria: {
                    field: 'creationDate',
                    order: 'ASC',
                },
            };

            post(url, body, 'searchGroup', success, fail);
        });
    }
    function searchClient(data) {
        return new Promise((success, fail) => {
            isValidTenant(fail);

            const searchTerm = data.curp || data.rfc;
            const serachBy = data.curp
                ? config().HarcodedParameters.FilterSelectionCURP
                : config().HarcodedParameters.FilterSelectionRFC;

            if (!Utils.isStringNotEmpty(searchTerm)) {
                fail(new Error(Constants.Msg.NO_CLIENT_SEARCH_TERM));
            }
            const url = Constants.Url.SEARCH_CLIENTS(config().Url);
            const body = {
                filterCriteria: [{
                    field: serachBy,
                    operator: config().HarcodedParameters.Equals,
                    value: searchTerm,
                }],
            };
            post(url, body, 'searchClient', success, fail);
        });
    }

    function createClient(data) {
        return new Promise((success, fail) => {
            isValidTenant(fail);
            const url = Constants.Url.CREATE_CLIENT(config().Url);
            data.preferredLanguage = config().HarcodedParameters.PreferredLanguage;
            post(url, data, 'createClient', success, fail);
        });
    }
    function createGroup(data) {
        return new Promise((success, fail) => {
            isValidTenant(fail);
            const url = Constants.Url.CREATE_GROUP(config().Url);
            const body = {
                groupName: data.groupName,
                notes: '',
                assignedUserKey: data.assignedUserKey,
                assignedBranchKey: data.assignedBranchKey,
                assignedCentreKey: data.assignedCentreKey,
                emailAddress: '',
                mobilePhone: '',
                homePhone: '',
                preferredLanguage: config().HarcodedParameters.PreferredLanguage,
                groupRoleKey: config().groupRoleKey,
                addresses: [],
                groupMembers: data.groupMembers || [],
                _General_Grupos: data._General_Grupos,
                _Datos_Recomendacion_Grupos: data._Datos_Recomendacion_Grupos,
            };

            post(url, body, 'createGroup', success, fail);
        });
    }
    this.searchClient = searchClient;
    this.searchGroup = searchGroup;
    this.createClient = createClient;
    this.createGroup = createGroup;
};
