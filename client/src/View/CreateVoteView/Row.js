import React, { Component } from 'react';

export default class Row extends Component {
  render() {
    return (
      <label style={{height: "24px", width: "250px", fontSize: "20px", display: "flex", justifyContent: "space-between"}}>
        {this.props.label}:
        <input
          type="text"        
          name={this.props.name}
          onChange={this.props.onChange}
          style={{marginLeft: "0.5rem"}}
        />
      </label>
    );
  }
}
