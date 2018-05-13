import React, { Component } from 'react';
import ActiveElectionDetails from './VoteView/ActiveElectionDetails'
import FutureElectionDetails from './VoteView/FutureElectionDetails'

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
]

class VoteView extends Component {
  getFutureElectionDetais(e) {
    return (
      <FutureElectionDetails
        key={e.id}
        title={e.title}
        time={e.startTime}
      />
    );
  }

  getActiveElectionDetais(e) {
    return (
      <ActiveElectionDetails
        key={e.id}
        title={e.title}
        time={e.startTime}
        candidates={e.candidates} 
      />
    );
  }

  getElectionDetails() {
    let details = [];
    mockData.forEach(e => {
      if (e.state === 'active') {
        details.push(this.getActiveElectionDetais(e));
      }
      else if (e.state === 'notStarted') {
        details.push(this.getFutureElectionDetais(e));
      }
    });

    return details;
  }

  render() {
    return (
      <div className="VoteView">
        <p>Election List</p>
        {this.getElectionDetails()}
      </div>
  );
}
}

export default VoteView;
