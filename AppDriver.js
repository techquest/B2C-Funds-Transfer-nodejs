var app = require('./src/index.js');
var initiatingEntityCode = "PBL";
var clientId = "IKIA2EFBE1EF63D1BBE2AF6E59100B98E1D3043F477A";
var clientSecret = "uAk0Amg6NQwQPcnb9BTJzxvMS6Vz22octQglQ1rfrMA=";
var Interswitch = require('../interswitch_javascript/lib/interswitch.js');

var transfer = new app.FundTransfer(clientId, clientSecret, "SANDBOX");
console.log(transfer.ATM);

//fetch all banks
transfer.fetchBanks(function(err, response){
    
});

