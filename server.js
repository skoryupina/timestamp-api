var express = require('express')
var timestamp = require("unix-timestamp")
var app = express()

app.get('/:date', function (req, res) {
  var reqDate = req.params.date;
  
  //1. Пробуем конвертировать natural -> unix
  var dateUnix = timestamp.fromDate(reqDate);
  //2. Пробуем конвертировать в Date
  var dateNatural = new Date(Number(reqDate)*1000);
  
  res.setHeader('Content-Type', 'application/json');

  if (isNaN(dateUnix) && isNaN(dateNatural)) {
      res.send(JSON.stringify({ unix: null, natural : null}));
    } 
  else if (isNaN(dateUnix)){
      dateNatural = dateNatural.getMonth() + " " + dateNatural.getDay() + ", " + dateNatural.getFullYear(); 
      res.send(JSON.stringify({ unix: reqDate, natural : dateNatural}));
  } else {
    res.send(JSON.stringify({ unix: dateUnix, natural : reqDate}));
  }
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})