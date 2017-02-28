var jsSHA = require('jssha');
var Utility = {
    generateMAC: function(t){
        
        
        var initiation = t.initiation;
        var termination = t.termination;
        var init = initiation.amount+initiation.currencyCode+initiation.paymentMethodCode+
        termination.amount+termination.currencyCode+termination.paymentMethodCode+termination.countryCode;
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(init);
        var hash = shaObj.getHash("HEX");
        return hash;
    }
};

module.exports = Utility;