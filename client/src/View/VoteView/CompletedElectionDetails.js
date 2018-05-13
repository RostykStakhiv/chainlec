import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'
import CompletedElectionRow from './CompletedElectionRow'

class CompletedElectionDetails extends Component {
  getRows() {
    let rows = [];
    this.props.candidates.forEach(e => {
      let result = this.props.results.find(elem => elem.id === e.id).result;

      rows.push(
        <CompletedElectionRow 
          key={e.id}
          candidate={e.name}
          result={result}
        />);
    });

    return rows;
  }

  render() {
    return (
      <table className="ElectionDetails">
        <thead>
          <ElectionHeader
            title={this.props.title}
            time={this.props.time} 
          />
        </thead>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}

export default CompletedElectionDetails;
