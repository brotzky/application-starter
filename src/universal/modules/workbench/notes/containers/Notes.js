import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberNotes from '../../../member/containers/MemberNotes';

class Notes extends Component {
  componentWillMount() {
    // return this.props.dispatch({ type: 'RESET_CHECKLIST' });
  }

  render() {
    return (
      <div className="Notes">
        <MemberNotes defaultCategory="underwriting" />
      </div>
    );
  }
}

export default connect()(Notes);
