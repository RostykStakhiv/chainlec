import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'
import ActiveElectionRow from './ActiveElectionRow'

class ElectionDetails extends Component {
  getRows() {
    if (this.props.state !== "active") {
      return null;
    }

    let rows = [];
    this.props.candidates.forEach(e => {
      rows.push(
      <ActiveElectionRow 
        key={e.id}
        candidate={e.name}
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

export default ElectionDetails;
