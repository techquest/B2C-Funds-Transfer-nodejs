/**
 * @options.clientId
 * @options.clientSecret
 * @options.env
 */
var Interswitch = require('interswitch');
var Constants = require('./constants.js');
var Utility = require('../utility/utility.js');
var FundTransfer = function(options){

    options = options || {};

    var clientId = options.clientId;
    var clientSecret = options.clientSecret;
    var env = options.environment;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.env = env;
    if(!this.env) {
        this.env = "SANDBOX";
    }
    this.interswitch = new Interswitch(clientId,clientSecret,env);
    

};


/**
 * 
 */
FundTransfer.prototype.fetchBanks = function(callback){

    
    this.interswitch.send({
        url: Constants.GET_ALL_BANKS_RESOURCE_URL,
        method:Constants.GET
    }, function(err, response, body){
        //
        
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            
            callback(null, response);
            
        }
    });
};

FundTransfer.prototype.validateAccount = function(transfer, callback){
    var bankCode = transfer.bankCode;
    var accountNumber = transfer.accountNumber;
    var url = Constants.ACCOUNT_VALIDATION_URL_PREFIX + bankCode + "/"+ Constants.ACCOUNT_VALIDATION_URL_SUFFIX + accountNumber+"/names";
    this.interswitch.send({url:url, method:Constants.GET}, function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null,JSON.parse(body).accountName);
        }
    });
    
};

FundTransfer.prototype.send = function(transfer, callback){
    var mac = Utility.generateMAC(transfer);
    transfer.mac = mac;
    var response = this.interswitch.send({
        url:Constants.TRANSFER_RESOURCE_URL,
        method:Constants.POST,
        requestData: transfer
    }, function(err, response, body){
        if(err) {
            callback(err);
        }
        else{
            callback(null, JSON.parse(body));
        }
    });

};

module.exports = {
    FundTransfer: FundTransfer,
    ATM: 1,
    POS: 2,
    WEB: 3,
    MOBILE: 4,
    KIOSK: 5,
    PCPOS: 6,
    LOCATION: 7,
    DIRECT_DEBITM: 8

};
