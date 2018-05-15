import axios from 'axios';

export default class ElectionModel {
  constructor() {
    this.host = 'localhost';
    this.port = 3140;
  }

 getElections(callback) {
    let req = `http://${this.host}:${this.port}/chainlec/v1/elections`;
    axios.get(req)
      .then(e => callback(e.data))
      .catch(e => alert(`Can not query elections data. Error: ${e.message}`));
  }

  createElection(body) {
    let req = `http://${this.host}:${this.port}/chainlec/v1/elections`;
    axios.post(req, body)
      .then(alert("Election was created successfully"))
      .catch(e => alert(`Can not create an election. Error: ${e.message}`));
  }

  vote(body) {
    let req = `http://${this.host}:${this.port}/chainlec/v1/votes`;
    axios.post(req, body)
      .then(alert("Your vote transaction was completed successfully"))
      .catch(e => alert(`Can not create an election. Error: ${e.message}`));
  }
}