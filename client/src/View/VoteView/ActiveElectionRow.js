import React, { Component } from 'react';

class ActiveElectionRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.candidate}</td>
        <td>
          <input 
            type="radio"
            checked={this.props.isChecked}
            onChange={this.props.onCheck}
          />
        </td>
      </tr>
    );
  }
}

export default ActiveElectionRow;
