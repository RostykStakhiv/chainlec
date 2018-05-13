import React, { Component } from 'react';

class ActiveElectionRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.candidate}</td>
      </tr>
    );
  }
}

export default ActiveElectionRow;
