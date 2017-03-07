# B2C-Funds-Transfer-nodejs
```
var app = require('./src/index.js');
var initiatingEntityCode = "PBL";

//test clientId and clientSecret
//var clientId = "IKIA2EFBE1EF63D1BBE2AF6E59100B98E1D3043F477A";
//var clientSecret = "uAk0Amg6NQwQPcnb9BTJzxvMS6Vz22octQglQ1rfrMA=";
    
// sandbox clienId client
var clientId = "IKIA6570778A3484D6F33BC7E4165ADCA6CF06B2860A";
var clientSecret = "DXfUwpuIvMAKN84kv38uspqGOsStgFS0oZMjU7bPwpU=";

var Interswitch = require('interswitch');
var TransferRequestBuilder = app.TransferRequestBuilder;
var FundTransfer = app.FundTransfer;
var Constant = app.Constant;

var transfer = new FundTransfer({clientId: clientId, clientSecret: clientSecret, environment: "SANDBOX"});
//var transfer = new FundTransfer({clientId: clientId, clientSecret: clientSecret, environment: "PRODUCTION"});
//var transfer = new FundTransfer({clientId: clientId, clientSecret: clientSecret});


transfer.fetchBanks(function(err, response){
    if(err) {
        //fetch banks was not successful
        return;
    }
    else {
        console.log("bank response "+bankResponse);
        if(bankResponse) {

            var bankResponse = JSON.parse(response.body).banks;

            var aBank = bankResponse[0];
            var cbnCode = aBank.cbnCode; // Central bank code
            var bankName = aBank.bankName; // bank name:
            var bankCode = aBank.bankCode; // bankcode in alphabetical form: UBA, GTB, FBN
            console.log(cbnCode+" "+bankName+" "+bankCode);
        }

        var request = new TransferRequestBuilder(initiatingEntityCode)
            .amount("100000") // mandatory, minor denomination
            .channel(Constant.LOCATION) // mandatory: ATM-1, POS-2, WEB-3, MOBILE-4, KIOSK-5, PCPOS-6, LOCATION-7, DIRECT DEBIT-8
            .destinationBankCode(cbnCode)/* mandatory:  To be gotten from the get all banks code (transfer.fetchBanks())*/
            .toAccountNumber("0114951936") // mandatory
            .requestRef("60360575603527")// mandatory
            .senderPhoneNumber("07036913492") // optional
            .senderEmail("grandeur_man@yahoo.com") // optional
            .senderLastName("Desmond") // optional
            .senderOtherNames("Samuel") // optional
            .receiverPhoneNumber("07036913492") // optional
            .receiverEmail("grandeur_man@yahoo.com") // optional
            .receiverLastName("Desmond") // optional
            .receiverOtherNames("Samuel") // optional
            .fee("10000")// optional (minor denomination)
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

## Installation

```bash
$ npm install interswitch-funds-transfer
```

## Features

  * Get All Supported Banks
  * Account Validation
  * Funds Transfer

## Running sample app

```
cd B2C-Funds-Transfer-nodejs
node AppDriver.js

```

