const express = require("express"); //require express module
const https = require ("https"); // this lets you perform get requests to an external module
const bodyParser = require ("body-parser"); //the package we installed in our terminal using npm i body-parser. this will allow us to look through body of post-request and fetch data based on name of input
const app = express(); // initialize a new express app

app.use(bodyParser.urlencoded({extended: true})); //need this code ALWAYS to start parsing through body of post request

app.get("/", function(req,res){ // this is how to act once YOU get a GET request to your home page
  res.sendFile(__dirname + "/index.html"); //sending the label that asks for city name
})

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "2873b6bb0f38276aac18f36161ebe2f0";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  // this url is what we generated on postman
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){ //lets you access the actual message body you are gettng back
    const weatherData = JSON.parse(data) //javaScript object that contains the data you are getting
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon; // this is the name of the icon
    const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<h1>The temperature in " + query +  " is " + temp + " degrees Celcius.</h1>") // this is what OUR server is sending to the client's browser.
    res.write("<p> The weather is currently " + description + "<p>");
    res.write("<img src =" + imageURL + ">");
    res.send(); //this sends the parsed data you get from API back to YOUR website by responding to the client's get request to YOUR server. 
    })
  });
})







app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
