/**************************************************************************************************************************************************
/*Christian Cabato (12915892)
/* Weather Node Application
/*************************************************************************************************************************************************/
/* Import necessary functions */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
/*************************************************************************************************************************************************/
/* Weather API to gather weather updates and data */
const apiKey = '707eb3f5c59cfec81dc40aff093a8373';
/*************************************************************************************************************************************************/
/* Set ejs format */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
/*************************************************************************************************************************************************/
/* GET index.html */
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
/*************************************************************************************************************************************************/
/* Post city of choice */
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees Fahrenheit in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
/*************************************************************************************************************************************************/
/* Server portal */
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
/*************************************************************************************************************************************************/