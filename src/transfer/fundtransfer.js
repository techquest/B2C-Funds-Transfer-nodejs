/**
 * @options.clientId
 * @options.clientSecret
 * @options.env
 */
var Interswitch = require('../../../interswitch_javascript/lib/interswitch.js');
var Constants = require('./constants.js');
var FundTransfer = function(options){

    options = options || {};

    var clientId = options.clientId;
    var clientSecret = options.clientSecret;
    var env = options.env;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.env = env;
    this.interswitch = new Interswitch(clientId,clientSecret,env);
    

};

FundTransfer.prototype.ATM = "1";
FundTransfer.prototype.MOBILE = "4";
FundTransfer.prototype.KIOSK = "5";
FundTransfer.prototype.PCPOS = "6";
FundTransfer.prototype.POS = "2";
FundTransfer.prototype.LOCATION = "7";
FundTransfer.prototype.DIRECT_DEBITM = "8";
FundTransfer.prototype.WEB = "3";

/**
 * 
 */
FundTransfer.prototype.fetchBanks = function(callback){

    
    this.interswitch.send({
        url: GET_ALL_BANKS_RESOURCE_URL,
        method:Constants.GET
    }, function(err, response, body){
        //
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            console.log(response+" good");
        }
    });
}

module.exports = FundTransfer;
