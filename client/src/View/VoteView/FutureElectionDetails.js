import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'

class FutureElectionDetails extends Component {
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
          <tr>
            <td>Election would take place soon</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default FutureElectionDetails;
