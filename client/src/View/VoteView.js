import React, { Component } from 'react';
import ActiveElectionDetails from './VoteView/ActiveElectionDetails'
import FutureElectionDetails from './VoteView/FutureElectionDetails'
import CompletedElectionDetails from './VoteView/CompletedElectionDetails'

const STYLES = {
    display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"
}

class VoteView extends Component {
  parseDate(epochTime) {
    let date = new Date(epochTime * 1000);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  getFutureElectionDetais(e) {
    return (
      <FutureElectionDetails
        key={e.id}
        title={e.title}
        time={this.parseDate(e.startTime)}
      />
    );
  }

  getCompletedElectionDetais(e) {
    return (
      <CompletedElectionDetails
        key={e.id}
        title={e.title}
        time={this.parseDate(e.startTime)}
        candidates={e.candidates} 
        results={e.results}
      />
    );
  }

  getActiveElectionDetais(e) {
    return (
      <ActiveElectionDetails
        key={e.id}
        lecId={e.id}
        title={e.title}
        time={this.parseDate(e.startTime)}
        candidates={e.candidates} 
        onVote={p => this.onVote(p)}
      />
    );
  }

  getElectionDetails() {
    let details = [];
    this.props.elections.forEach(e => {
      if (e.state === 'active') {
        details.push(this.getActiveElectionDetais(e));
      }
      else if (e.state === 'notStarted') {
        details.push(this.getFutureElectionDetais(e));
      }
      else if (e.state === 'completed') {
        details.push(this.getCompletedElectionDetais(e));
      }
      else {
        throw new Error('Unexpected state value');
      }
    });

    return details;
  }

  onVote(params) {
    this.props.onVote(params);
  }

  render() {
    return (
        <div style={STYLES}>
            <div style={{width: "33%", backgroundColor: "#f0f8ff", ...STYLES}}>
                <h1>Election List</h1>
                {this.getElectionDetails()}
            </div>
        </div>
  );
}
}

export default VoteView;
