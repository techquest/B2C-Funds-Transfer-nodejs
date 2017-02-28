var t = function(amount, entityCode, currencyCode, paymentMethodCode, countryCode){
    this.amount = amount;
    this.entityCode = entityCode;
    this.currencyCode = currencyCode;
    this.paymentMethodCode = paymentMethodCode;
    this.countryCode = countryCode;
    this.accountReceivable=undefined;
};

t.prototype.setAccountReceivable = function(val) {
    this.accountReceivable = val;

};

module.exports = t;