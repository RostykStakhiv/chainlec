import React, { Component } from 'react';
import VoteView from './View/VoteView'
import CreateVoteView from './View/CreateVoteView'
import ElectionModel from './Model/ElectionModel'

class App extends Component {
  state = {
    elections: []
  }

  handleCreateLec(params) {
    alert(JSON.stringify(params));
  }

  handleVote(params) {
    alert(JSON.stringify(params));
  }

  componentDidMount() {
    let model = new ElectionModel();
    model.getElections((data) => {
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
