import React, { Component } from 'react';

class Button extends Component {
  onClick() {
    alert("Clicked");
  }

  render() {
    return (   
      <button 
          type="button"
          onClick={this.onClick}>
        clickMe
      </button>
    );
  }
}

export default Button;
