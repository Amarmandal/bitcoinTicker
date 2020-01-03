const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    var crypt = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypt,
            to: fiat,
            amount: amount,
        }
    }

    request(options, (error, response, body) => {
        var data = JSON.parse(body);
        var price = data.price;
        res.send(`<h1>Price of ${amount} ${crypt} is ${price} ${fiat}<h1>`);
    })

});

app.listen(3000, () => {
    console.log("Server has started!");
});

