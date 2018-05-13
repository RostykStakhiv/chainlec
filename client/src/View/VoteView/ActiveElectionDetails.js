import React, { Component } from 'react';
import ElectionHeader from './ElectionHeader'
import ActiveElectionRow from './ActiveElectionRow'
import Button from './Button'

class ActiveElectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: 0,
      isCollapsed: true,
    }
  }

  onCollapseToggle() {
    this.setState(prevState => {
      return { isCollapsed: !prevState.isCollapsed };
    });
  }

  onCheckChanged(i) {
    this.setState({
      checkedIndex : i
    });
  }

  onVote() {
    let selectedCandidate = this.props.candidates[this.state.checkedIndex];
    alert(`You have voted for ${selectedCandidate.name}`);
  }

  getFooter() {
    if (this.state.isCollapsed) {
      return null;
    }

    return (
      <tr>
        <td>
          <Button 
            label="Vote"
            onClick={() => this.onVote()}
          />
        </td>
      </tr>
    );
  }

  getRows() {
    if (this.state.isCollapsed) {
      return null;
    }

    let rows = [];
    this.props.candidates.forEach((e, i) => {
      rows.push(
      <ActiveElectionRow 
        key={e.id}
        candidate={e.name}
        isChecked={i === this.state.checkedIndex}
        onCheck={() => this.onCheckChanged(i)}
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
        <tfoot>
          {this.getFooter()}
        </tfoot>
      </table>
    );
  }
}

export default ActiveElectionDetails;
