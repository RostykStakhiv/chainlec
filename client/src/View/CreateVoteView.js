import React, { Component } from 'react';
import Row from './CreateVoteView/Row'
const EmptyInputErrorMsg = 'You should fill in all the fields';

class CreateVoteView extends Component {
  constructor(props) {
    super(props);

    this.layout = [
      {
        name: 'startDate',
        label: 'Start Date'
      },
      {
        name: 'endDate',
        label: 'End Date'
      },
      {
        name: 'title',
        label: 'Title'
      },
      {
        name: 'candidates',
        label: 'Candidates'
      },
    ];

    this.state = {};
    let keys = this.layout.map(x => x.name);
    keys.forEach(k => {
      this.state[k] = null;
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.isEmptyInput()) {
      let passport = prompt("Please enter your passport number", "МС070183");

      if (passport) {
        this.passport = passport.replace(/\s/g,'');
        this.sendData();
      }
    }
    else {
      alert(EmptyInputErrorMsg);
    }
  }

  isEmptyInput() {
    let isEmpty = false;
    let keys = this.layout.map(x => x.name);
    keys.forEach(k => {
      if (!this.state[k]) isEmpty = true;
    });

    return isEmpty;
  }

  sendData() {
    let params = {};
    let keys = this.layout.map(x => x.name);
    keys.forEach(k => {
      params[k] = this.state[k];
    }); 

    params.userId = this.passport;
    this.props.onCreateLec(params);
  }

  getRows() {
    let res = [];
    this.layout.forEach(e => {
      res.push(<Row name={e.name} label={e.label} onChange={this.handleChange} key={e.name} />);
      res.push(<br key={e.name + "br"}/>);
    });

    return res;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create Election:</legend>
          {this.getRows()}
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    );
}
}

export default CreateVoteView;
