import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'

class ElectionDetails extends Component {
  render() {
    return (
      <table className="ElectionDetails">
        <thead>
          <ElectionHeader title={this.props.title} />
        </thead>
      <tbody>
      </tbody>
    </table>
    );
  }
}

export default ElectionDetails;
