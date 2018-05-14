const _ = require("underscore");
const express = require('express');
const app = express();

let cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

var Client = require('node-rest-client').Client;
var client = new Client();

const mockData = [
    { 
      id : "ID_Election_1",
      title: "President Election",
      startTime: 1530403200,
      endTime: 1530403200,
      state: "notStarted",
      candidates: [
        {
            id: "ID_Dido",
            name: "Dido",
        },
        {
          id: "ID_Baba",
          name: "Baba",
        },
      ],
      results: null,
    },
    { 
      id : "ID_Election_2",
      title: "President Election",
      startTime: 1425168000,
      endTime: 1425168000,
      state: "completed",
      candidates: [
        {
            id: "ID_Poroh",
            name: "Poroh",
        },
        {
          id: "ID_Oleh_Valeriiovych",
          name: "Oleh Valeriiovych",
        },
        {
          id: "ID_Yanukovych",
          name: "Viktor Fedorovych",
        },
      ],
      results: [
        {
          id: "ID_Poroh",
          result: 22123123,
        },
        {
          id: "ID_Oleh_Valeriiovych",
          result: 123123,
        },
        {
          id: "ID_Yanukovych",
          result: 101,
        },
      ]
    },
    { 
      id : "ID_Election_3",
      title: "Parlament Election",
      startTime: 1526207409,
      endTime: 1526207409,
      state: "active",
      candidates: [
        {
          id: "ID_Poroh",
          name: "Dido",
        },
        {
          id: "ID_Oleh_Valeriiovych",
          name: "Oleh Valeriiovych",
        },
        {
          id: "ID_Yanukovych",
          name: "Viktor Fedorovych",
        },
      ],
      results: null,
    }
  ];

/*
  List all polls
*/
app.get('/chainlec/v1/elections', (req, res, next) => {
  console.log("GET elections");
  client.get('http://0.0.0.0:3000/api/org.acme.empty.Poll', function(data, response) {
    res.json(data);
  });
  // res.status(200);
  // res.send(mockData);
});

/*
  Register new voter
*/
app.post('/register/voter', function(req, res) {
  var args = {
    data: {
      "$class": "org.acme.empty.RegisterVoter",
      "passportID": req.body.passportID,
      "password": req.body.password,
    },
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  };
  client.post("http://localhost:3000/api/RegisterVoter", args, function(data, response) {
    res.json(data);
  });
});

app.post('/chainlec/v1/elections', (req, res, next) => {
  console.log(`POST elections. Body = ${JSON.stringify(req.body)}`);
  res.status(200);
});

app.post('/chainlec/v1/votes', (req, res, next) => {
  console.log(`POST votes. Body =  ${JSON.stringify(req.body)}`);
  res.status(200);
});

app.listen(3003, () => console.log('Example app listening on port 3003!'));