import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '../../auth/containers/AuthWrapper';
import { getCreditScores } from 'grow-actions/credit-score/credit-score';
import '../styles/index.scss';

import AnalyticsTrends from '../components/AnalyticsTrends';

class Analytics extends Component {
  componentDidMount() {
    dispatch(getCreditScores(this.props.params.memberId));
  }

  componentWillUpdate(nextProps) {
    const { params: prevParams } = this.props;
    const { params: nextParams } = nextProps;
    const { memberId: prevMemberId } = prevParams;
    const { memberId: nextMemberId } = nextParams;
    if (prevMemberId !== nextMemberId) {
      return this.fetchData(nextMemberId);
    }
  }

  render() {
    return (
      <div className="Analytics">
        <AnalyticsTrends />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member
});

export default AuthWrapper(connect(mapStateToProps)(Analytics));
