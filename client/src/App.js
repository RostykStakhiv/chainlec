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

  handleCreateLec(params) {
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
