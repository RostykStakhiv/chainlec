import axios from 'axios';

export default class ElectionModel {
  constructor() {
    this.host = 'localhost';
    this.port = 3003;
  }

 getElections(callback) {
    let req = `http://${this.host}:${this.port}/chainlec/v1/elections`;
    axios.get(req).then(e => callback(e.data));
  }
}