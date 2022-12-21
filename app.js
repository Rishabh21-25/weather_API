const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const appKey = "f19639cde733be8c9b1ff212a4f14e31";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + appKey;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDs = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather of  "+query+"  is currently " +  weatherDs + "<h1>");
            res.write("<h1>The temperature of " + query +  " is " + temp +  " K.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

        })
        //res.send("Server is ok");
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});