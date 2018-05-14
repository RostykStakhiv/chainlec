import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'
const ElectionsHasntStartedMsg = 'Election would take place soon';

class FutureElectionDetails extends Component {
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

    return (
      <tr>
        <td colSpan={"2"}>
          {ElectionsHasntStartedMsg}
        </td>
        <td/>
      </tr>
    );
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

export default FutureElectionDetails;
