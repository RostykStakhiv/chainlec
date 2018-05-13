import React, { Component } from 'react';
import VoteView from './View/VoteView'
import CreateVoteView from './View/CreateVoteView'
import ElectionModel from './Model/ElectionModel'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: []
    }

    this.model = new ElectionModel();
  }

  convertToEpoch(date) {
    let parsedDate = date.split('/');
    let dateTime = new Date(parsedDate[2], parsedDate[1], parsedDate[0]);

    return Math.floor(dateTime.getTime() / 1000);
  }

  handleCreateLec(params) {
    params.startDate = this.convertToEpoch(params.startDate);
    params.endDate = this.convertToEpoch(params.endDate);
    params.candidates = params.candidates.split(',');
    
    this.model.createElection(params);
  }

  handleVote(params) {
    this.model.vote(params);
  }

  componentDidMount() {
    this.model.getElections((data) => {
      this.setState({
        elections : data
      });
    });
  }

  render() {
    return (
        <div className="App">
            <VoteView elections={this.state.elections} onVote={p => this.handleVote(p)}/>
            <CreateVoteView onCreateLec={p => this.handleCreateLec(p)}/>
        </div>
    );
  }
}

export default App;
