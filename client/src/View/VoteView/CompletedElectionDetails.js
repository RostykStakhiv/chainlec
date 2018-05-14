import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'
import CompletedElectionRow from './CompletedElectionRow'

class CompletedElectionDetails extends Component {
  // TODO: the code with toggle is duplicated throughout all 3 ElectionDetails
  // consider the way to move them in 1 place
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    }
  }

  onCollapseToggle() {
    this.setState(prevState => {
      return { isCollapsed: !prevState.isCollapsed };
    });
  }

  getRows() {
    if (this.state.isCollapsed) {
      return null;
    }

    let rows = [];
    this.props.candidates.forEach(e => {
      let result = this.props.results.find(elem => elem.id === e.id).result;

      rows.push(
        <CompletedElectionRow 
          key={e.id}
          candidate={e.name}
          result={result}
        />);
    });

    return rows;
  }

  render() {
    return (
      <table className="ElectionDetails">
        <thead>
          <ElectionHeader
            title={this.props.title}
            time={this.props.time} 
            onClick={() => this.onCollapseToggle()}
          />
        </thead>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}

export default CompletedElectionDetails;
