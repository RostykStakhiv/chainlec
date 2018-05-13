import React, { Component } from 'react';
import Button from './Button'

class ElectionHeader extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.title}</th>
        <th>{this.props.time}</th>
        <th>
          <Button />
        </th>
      </tr>
    );
  }
}

export default ElectionHeader;
