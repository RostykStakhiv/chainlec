//import { start } from "repl";

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

let baseURL = 'http://localhost:3015/';
let baseComposerAPIURL = 'http://localhost:3000/api/';
let apiVersion = 'v1/';

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
app.get('/chainlec/' + apiVersion + 'elections', (req, res, next) => {
  console.log("GET elections");
  client.get(baseComposerAPIURL + 'org.acme.empty.Poll', function(data, response) {
    let candidateIDs = new Set();
    data.forEach(pollDict => {
      pollDict.candidates.forEach(pollCandidateObjectID => {
        let splitID = pollCandidateObjectID.split('#');
        let candidateID = splitID[splitID.length - 1];
        candidateIDs.add(candidateID);
      });
    });

    client.get(baseComposerAPIURL + 'org.acme.empty.Candidate', function(candidatesResp, response) {
      console.log("Cand Resp:" + candidatesResp);
      var candidates = {};
      candidatesResp.forEach(candidateDict => {
        let candidateID = String(candidateDict["passportID"]);
        console.log('CandidateID:' + candidateID);

        if(candidateIDs.has(candidateID)) {
            candidates[candidateID] = candidateDict;
        }
      })

      var responseData = [];
      data.forEach(pollDict => {
        var pollResponseDict = {};
        let startTime = pollDict["startDate"];
        let endTime = pollDict["finishDate"];
        let currentTime = Date.now();
        var state = "";
        if(currentTime > startTime && currentTime < endTime) {
          state = "active";
        } else if(currentTime > endTime) {
          state = "completed";
        } else {
          state = "notStarted";
        }

        pollResponseDict["state"] = state;
        pollResponseDict["id"] = pollDict["pollName"];
        pollResponseDict["title"] = pollDict["pollName"];
        pollResponseDict["startTime"] = pollDict["startDate"];
        pollResponseDict["endTime"] = pollDict["finishDate"];
        
        var pollCandidates = [];

        pollDict.candidates.forEach(pollCandidateObjectID => {
          let splitID = pollCandidateObjectID.split('#');
          let candidateID = splitID[splitID.length - 1];
          let candidate = candidates[candidateID];
          pollCandidates.push(candidate);
        });

        pollResponseDict["candidates"] = pollCandidates;
        //pollResponseDict["results"] = [];

        responseData.push(pollResponseDict);
      })

      client.get(baseComposerAPIURL + 'org.acme.empty.ElectionVote', function(votesResp, response) {
        if(votesResp.length == 0) {
          res.json(responseData);
          res.status(200);
          return;
        }

        responseData.forEach(pollDict => {
          let state = pollDict["state"];
          let pollID = pollDict["id"];
          var pollVotes = [];

          if(state == "completed") {
            voteResp.forEach(voteDict => {
              let votePollObject = voteDict["poll"];
              let splitID = votePollObject.split('#');
              let votePollID = splitID[splitID.length - 1];
              if(votePollID == pollID) {
                pollVotes.push(voteDict);
              }
            })
          }

          let candidates = pollDict["candidates"];
          candidates.forEach(candidateDict =>{
            let candID = candidateDict["passportID"];
            var candVotes = [];
            var candResult = {};
            candResult["passportID"] = candID;

            pollVotes.forEach(pollVoteDict =>{
              let voteCandidateObjID = pollVoteDict["candidate"];
              let splitID = votePollObject.split('#');
              let voteCandID = splitID[splitID.length - 1];

              if(voteCandID == candID) {
                candVotes.push(pollVoteDict);
              }
            })

            candResult["result"] = candVotes.length;
          })
        })

        res.json(responseData);
      });
    });
  });
});

//Vote
app.post('/chainlec/v1/votes', (req, res, next) => {
  let voterID = req.body.voterId;
  let pollID = req.body.lecId;
  let candID = req.body.candidateId;

  var args = {
    data: {
      "$class": "org.acme.empty.RegisterVoter",
      "passportID": voterID,
      "password": "123",
    },
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  };

  client.post(baseComposerAPIURL + 'org.acme.empty.RegisterVoter', args, function(data, response) {

    var voteArgs = {
      data: {
        "$class": "org.acme.empty.Vote",
        "poll": pollID,
        "candidate": candID,
        "voter": voterID,
        //"transactionId": "string",
        //"timestamp": "2018-05-14T22:05:17.022Z"
      },
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      }
    };

    client.post(baseComposerAPIURL + 'org.acme.empty.Vote', voteArgs, function(data, response) {
      res.json(data);
      res.status(200);
    });
  });

  res.status(200);
});

//Create Poll
app.post('/chainlec/v1/elections', function(data, response) {
  console.log(`POST elections. Body = ${JSON.stringify(data.body)}`);
  let body = data.body;
  let pollName = data.body.title;
  let startDate = data.body.startDate;
  let endDate = data.body.endDate;
  let candidates = data.body.candidates;

  var poll = {
    data: {
      "$class": "org.acme.empty.CreatePoll",
      "creationDate": 0,
      "pollName": pollName,
      "startDate": startDate,
      "finishDate": endDate,
      "candidates": candidates,
      "transactionId": "",
      "timestamp": "2018-05-15T05:39:07.577Z"
    },
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  };

  // candidates.forEach(candidateID => {
  //   let candidate = {
  //     data: {
  //       "$class": "org.acme.empty.Candidate",
  //       "passportID": candidateID,
  //       "password": "123"
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept":"application/json"
  //     }
  //   }
  // });


  client.post(baseComposerAPIURL + 'org.acme.empty.CreatePoll', poll, function(data, response) {
    res.json(data);
    res.status(200);
  });
});

app.listen(3140, () => console.log('Example app listening on port 3140!'));