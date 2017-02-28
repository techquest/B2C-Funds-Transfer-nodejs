# B2C-Funds-Transfer-nodejs
```
var app = require('./src/index.js');
var initiatingEntityCode = "PBL";
var clientId = "IKIA2EFBE1EF63D1BBE2AF6E59100B98E1D3043F477A";
var clientSecret = "uAk0Amg6NQwQPcnb9BTJzxvMS6Vz22octQglQ1rfrMA=";
var Interswitch = require('../interswitch_javascript/lib/interswitch.js');
var TransferRequestBuilder = app.TransferRequestBuilder;
var FundTransfer = app.FundTransfer;


var transfer = new FundTransfer.exportedFunction({clientId: clientId, clientSecret: clientSecret, environment: "DEVELOPMENT"});
//console.log(transfer.ATM);

//fetch all banks

transfer.fetchBanks(function(err, response){
    if(err) {
        //fetch banks was not successful
        return;
    }
    else {
        var bankResponse = JSON.parse(response.body).banks;

        var aBank = bankResponse[0];
        var cbnCode = aBank.cbnCode; // Central bank code
        var bankName = aBank.bankName; // bank name:
        var bankCode = aBank.bankCode; // bankcode in alphabetical form: UBA, GTB, FBN
        console.log(cbnCode+" "+bankName+" "+bankCode);

        var request = new TransferRequestBuilder(initiatingEntityCode)
                    .senderPhoneNumber("07036913492") // optional
                    .senderEmail("grandeur_man@yahoo.com") // optional
                    .senderLastName("Desmond") // optional
                    .senderOtherNames("Samuel") // optional
                    .receiverPhoneNumber("07036913492") // optional
                    .receiverEmail("grandeur_man@yahoo.com") // optional
                    .receiverLastName("Desmond") // optional
                    .receiverOtherNames("Samuel") // optional
                    .amount("100000") // mandatory, minor denomination
                    .channel(FundTransfer.LOCATION) // mandatory: ATM-1, POS-2, WEB-3, MOBILE-4, KIOSK-5, PCPOS-6, LOCATION-7, DIRECT DEBIT-8
                    .destinationBankCode(cbnCode)/* mandatory:  To be gotten from the get all banks code*/
                    .toAccountNumber("0114951936") // mandatory
                    .fee("10000")// optional
                    .requestRef("40360435603527")// mandatory
                    .build();
        
        var validationResponse = transfer.validateAccount(request, function(err, name){
            if(err) {
                //name validation was not successful
            }
            else {
                var accountName = name;
                console.log("account name "+name);
            }
        });// validate account

        var response = transfer.send(request, function(err, response){
            if(err) {
                //an error occured wihle doing transfer
                console.log(err);
            }
            else {
                if(! response.errors) {

                    var mac = response.mac;
                    var transactionDate = response.transactionDate;
                    var responseCode = response.responseCode;
                    console.log(mac+" "+transactionDate+" "+responseCode);
                }
                else {

                    //transfer not successful
                    console.log(JSON.stringify(response));
                }
            }

        });



    }
});//end of fetchBanks
```