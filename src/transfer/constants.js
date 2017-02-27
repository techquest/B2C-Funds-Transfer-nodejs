var Constants = function(){

};


Constants.prototype.CURRENCY_CODE = "566";
Constants.prototype.INITATION_PAYMENT_METHOD_CODE = "CA";
Constants.prototype.TERMINATION_PAYMENT_METHOD_CODE = "AC";
Constants.prototype.ACCOUNT_TYPE = "00";
Constants.prototype.TERMINAL_ID = "TerminalId";
Constants.prototype.GET = "GET";
Constants.prototype.POST = "POST";
Constants.prototype.TRANSFER_RESOURCE_URL = "api/v2/quickteller/payments/transfers";
Constants.prototype.MAX_TRANSFER_LENGTH = "566";
Constants.prototype.COUNTRY_CODE = "NG";
Constants.prototype.GET_ALL_BANKS_RESOURCE_URL = "api/v2/quickteller/configuration/fundstransferbanks";
Constants.prototype.ACCOUNT_VALIDATION_URL_PREFIX = "api/v1/nameenquiry/banks/";
Constants.prototype.ACCOUNT_VALIDATION_URL_SUFFIX = "accounts/";
module.exports = {
    GET_ALL_BANKS_RESOURCE_URL : "api/v2/quickteller/configuration/fundstransferbanks",
    GET : "GET"
}