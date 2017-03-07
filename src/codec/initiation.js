var initiation = function(amount, currencyCode, paymentMethodCode, channel){
    this.amount=amount;
    this.currencyCode = currencyCode;
    this.paymentMethodCode = paymentMethodCode;
    this.channel = channel;
};

module.exports = initiation;