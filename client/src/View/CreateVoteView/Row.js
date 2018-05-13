import React, { Component } from 'react';

export default class Row extends Component {
  render() {
    return (
      <label>
        {this.props.label}:
        <input
          type="text"        
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}
