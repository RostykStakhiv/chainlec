import React, { Component } from 'react';
import VoteView from './View/VoteView'
import CreateVoteView from './View/CreateVoteView'
import ElectionModel from './Model/ElectionModel'

import axios from 'axios';

class App extends Component {
  state = {
    elections: []
  }

  componentDidMount() {
    let model = new ElectionModel();
    model.getElections((data) => {
      this.setState({
        elections : data
      })
    })
  }

  render() {
    return (
        <div className="App">
            <VoteView elections={this.state.elections}/>
            <CreateVoteView />
        </div>
    );
  }
}

export default App;
