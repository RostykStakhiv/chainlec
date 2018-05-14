import React, { Component } from 'react';
import Row from './CreateVoteView/Row'

const EmptyInputErrorMsg = 'You should fill in all the fields';
const InvalidInputErrorMsg = 
`List of candidates should be in formar \"cand1,cand2,cand3\"
 Dates should be in format dd/mm/yyyy`;

const StartDateKey = 'startDate';
const EndDateKey = 'endDate';
const TitleKey = 'title';
const CandidatesKey = 'candidates';

class CreateVoteView extends Component {
  constructor(props) {
    super(props);

    this.layout = [
      {
        name: StartDateKey,
        label: 'Start Date'
      },
      {
        name: EndDateKey,
        label: 'End Date'
      },
      {
        name: TitleKey,
        label: 'Title'
      },
      {
        name: CandidatesKey,
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

  validateInput() {
    return this.validateDate(this.state[StartDateKey]) &&
           this.validateDate(this.state[EndDateKey]) &&
           this.validateCandidates(this.state[CandidatesKey]);
  }

  validateDate(date) {
    return date.match(`^\\d{1,2}\/\\d{1,2}\/\\d{2,4}$`);
  }

  validateCandidates(date) {
    return date.match('^(\\w{2}\\d{6},)*\\w{2}\\d{6}$');
  }

  sendData() {
    if (!this.validateInput()) {
      alert(InvalidInputErrorMsg);
      return;
    }

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
      <form onSubmit={this.handleSubmit} style={{paddingTop: "1rem", display: "flex", justifyContent: "center"}}>
        <fieldset style={{width: "31%", backgroundColor: "#f0f8ff"}}>
          <legend style={{fontSize: "24px"}}>Create Election:</legend>
          {this.getRows()}
          <button type="submit" value="Submit" style={{fontSize: "16px"}} children={"Submit"} />
        </fieldset>
      </form>
    );
}
}

export default CreateVoteView;
