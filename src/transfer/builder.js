
var Transfer = require('../codec/transfer.js');
var Sender = require('../codec/sender.js');
var Beneficiary = require('../codec/beneficiary.js');
var Termination = require('../codec/termination.js');
var Constants = require('./constants.js');
var AccountReceivable = require('../codec/accountreceivable.js');
var Initiation = require('../codec/initiation.js');
var t = function(entityCode){
    console.log("builder");
    this.initiationEntityCode = entityCode;
    this.transfer = new Transfer();

    this.senderPhone="";
    this.senderEmailVal="";
    this.senderLastNameVal="";
    this.senderOtherNamesVal="";

    this.beneficiaryPhoneNumber="";
    this.beneficiaryEmail="";
    this.beneficiaryLastName="";
    this.beneficiaryOtherNames="";

    this.amountTmp="";
    this.initiatorAmount = "";
    this.initiatorChannel = "";

    this.terminationEntityCodeTmp="";
    this.terminationAccountNumberTmp = "";

     this.terminationCurrencyCodeTmp = Constants.CURRENCY_CODE;
     this.terminationPaymentMethodCodeTmp = Constants.TERMINATION_PAYMENT_METHOD_CODE;
     this.terminationCountryCodeTmp = Constants.COUNTRY_CODE;
     this.terminationAccountNumberTmp;
     this.terminationAccountTypeTmp = Constants.ACCOUNT_TYPE;
     this.initiatorCurrencyCode = Constants.CURRENCY_CODE;
     this.initiatorPaymentMethodCode = Constants.INITATION_PAYMENT_METHOD_CODE;

    this.surcharge = "";
    this.transferCode="";

    this.accountNumber = "";
    this.bankCode = "";
}
t.prototype.senderPhoneNumber = function(phone){
    this.senderPhone = phone;
    return this;
};
t.prototype.senderEmail = function(email){
    this.senderEmailVal = email;
    return this;
};
t.prototype.senderLastName = function(name){
    this.senderLastNameVal = name;
    return this;
};
t.prototype.senderOtherNames = function(name){
    this.senderOtherNamesVal = name;
    return this;
};
t.prototype.receiverPhoneNumber = function(val){
    this.beneficiaryPhoneNumber = val;
    return this;
};
t.prototype.receiverEmail = function(val){
    this.beneficiaryEmail = val;
    return this;
};
t.prototype.receiverLastName = function(val){
    this.beneficiaryLastName = val;
    return this;
};
t.prototype.receiverOtherNames = function(val){
    this.beneficiaryOtherNames = val;
    return this;
};
t.prototype.amount = function(val){
    this.initiatorAmount = val;
    this.amountTmp = val;
    return this;
};
t.prototype.channel = function(val){
    this.initiatorChannel = val;
    return this;
};
t.prototype.destinationBankCode = function(val) {
    this.terminationEntityCodeTmp = val;
    return this;
};
t.prototype.toAccountNumber = function(val) {
    this.terminationAccountNumberTmp = val;
    return this;
};
t.prototype.fee = function(val){
    this.surcharge = val;
    return this;
};
t.prototype.requestRef = function(val) {
    this.transferCode = val;
    return this;
};
t.prototype.build = function(){
    this.transfer.initiationEntityCode = this.initiationEntityCode;
    this.transfer.sender = new Sender(this.senderPhone, this.senderEmailVal, this.senderLastNameVal, this.senderOtherNamesVal);
    this.transfer.beneficiary = new Beneficiary(this.receiverPhoneNumber, this.beneficiaryEmail, this.beneficiaryLastName, this.beneficiaryOtherNames);
    this.transfer.accountNumber = this.terminationAccountNumberTmp;
    this.transfer.bankCode = this.terminationEntityCodeTmp;
    this.transfer.surcharge = this.surcharge;
    this.transfer.transferCode = this.transferCode;
    this.transfer.termination = new Termination(this.amountTmp, this.terminationEntityCodeTmp,this.terminationCurrencyCodeTmp, this.terminationPaymentMethodCodeTmp, this.terminationCountryCodeTmp);
    var accountReceivable = new AccountReceivable(this.terminationAccountNumberTmp, this.terminationAccountTypeTmp);
    this.transfer.termination.setAccountReceivable(accountReceivable);
    this.transfer.initiation = new Initiation(this.amountTmp, this.initiatorCurrencyCode, this.initiatorPaymentMethodCode, this.initiatorChannel);
    return this.transfer;
};
module.exports = t;