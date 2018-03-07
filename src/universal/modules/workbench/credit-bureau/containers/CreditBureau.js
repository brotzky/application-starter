import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import {
  getCreditBureau,
  getCreditReport,
} from 'grow-actions/credit-bureau/credit-bureau';
import { ViewPermission } from '../../../ui/components';
import { permissionSelector } from 'gac-utils/selectors';
import CreditBureauContainer from '../componenets/CreditBureauContainer';
import CreditReport from '../componenets/CreditReport';

/**
 * CreditBureau is the highest level component for the
 * credit-bureau tab within the workbench.
 * It is mainly composed of the Controls and Report. The
 * Controls can switch the report and pull a new report.
 * The CreditReport simply renders the report into the view.
 */
class CreditBureau extends Component {
  // get Credit Bureau info if nothing exists in the store
  componentDidMount() {
    const {
      dispatch,
      params: { memberId },
      creditBureau,
      hasPermission,
    } = this.props;
    if (creditBureau.report && !creditBureau.report.report && hasPermission) {
      dispatch(getCreditBureau(memberId));
    }
  }

  /**
   * when user selects a new Credit Report from the select option
   * we must fetch their selected Credit Report based on ID.
   */
  componentWillReceiveProps(nextProps) {
    const { dispatch, params: { memberId }, creditReportId } = this.props;
    if (
      nextProps.creditReportId !== creditReportId &&
      nextProps.creditReportId !== '0'
    ) {
      dispatch(getCreditReport(memberId, nextProps.creditReportId));
    }
  }

  render() {
    const { creditBureau, params, firstName } = this.props;

    return (
      <ViewPermission permission="VIEW_CREDIT_BUREAU">
        <CreditBureauContainer>
          <CreditReport
            creditBureau={creditBureau}
            firstName={firstName}
            memberId={params.memberId}
          />
        </CreditBureauContainer>
      </ViewPermission>
    );
  }
}

const selector = formValueSelector('creditBureau');

const mapStateToProps = state => ({
  creditBureau: state.creditBureau,
  workbench: state.workbench,
  firstName: state.member.member.firstName,
  creditReportId: selector(state, 'creditReportId'),
  hasPermission: permissionSelector(state, 'VIEW_CREDIT_BUREAU'),
});

/**
 * initiating a form, but it's not 100% necessary. This was mostly
 * done for simplicity and consistency of design. There is never a form
 * being submitted. Wanted to be able to use the <Field /> component
 * from redux-form.
 */
CreditBureau = reduxForm({
  form: 'creditBureau',
})(CreditBureau);

export default connect(mapStateToProps)(CreditBureau);
