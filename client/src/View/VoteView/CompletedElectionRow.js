import React, { Component } from 'react';

class CompletedElectionRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.candidate}</td>
        <td>{this.props.result}</td>
      </tr>
    );
  }
}

export default CompletedElectionRow;
