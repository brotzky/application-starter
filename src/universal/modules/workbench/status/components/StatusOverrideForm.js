// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, initialize } from 'redux-form';
import StatusTextLoading from '../components/StatusTextLoading';
import {
  UPDATE_LAST_DECLINED_TRANSITIONS,
  UPDATE_LAST_ON_HOLD_TRANSITIONS,
  UPDATE_LAST_FRAUD_TRANSITIONS,
  UPDATE_LAST_ACTIVE_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import {
  EDIT_STATE_ACTIVE_TO_CANCELLED,
  EDIT_STATE_ACTIVE_TO_DECLINED,
  EDIT_STATE_ACTIVE_TO_FRAUD,
  EDIT_STATE_ACTIVE_TO_ON_HOLD,
  EDIT_STATE_CANCELLED_TO_ACTIVE,
  EDIT_STATE_CANCELLED_TO_FRAUD,
  EDIT_STATE_CANCELLED_TO_ON_HOLD,
  EDIT_STATE_DECLINED_TO_ACTIVE,
  EDIT_STATE_DECLINED_TO_FRAUD,
  EDIT_STATE_DECLINED_TO_ON_HOLD,
  EDIT_STATE_FRAUD_TO_ACTIVE,
  EDIT_STATE_FRAUD_TO_DECLINED,
  EDIT_STATE_FRAUD_TO_ON_HOLD,
  EDIT_STATE_ON_HOLD_TO_ACTIVE,
  EDIT_STATE_ON_HOLD_TO_CANCELLED,
  EDIT_STATE_ON_HOLD_TO_DECLINED,
  EDIT_STATE_ON_HOLD_TO_FRAUD,
  EDIT_STATE_EXPIRED_TO_ACTIVE,
  EDIT_STATE_EXPIRED_TO_DECLINED,
  EDIT_STATE_EXPIRED_TO_ON_HOLD,
  EDIT_STATE_EXPIRED_TO_FRAUD,
  EDIT_UNDERWRITING_NOTE,
} from '../constants';
import { getApprovalDeclineOnHoldNote } from 'grow-actions/status/status';

const fieldProps = { className: 'RecommendationForm' };
const permissionList = [
  EDIT_STATE_ACTIVE_TO_CANCELLED,
  EDIT_STATE_ACTIVE_TO_DECLINED,
  EDIT_STATE_ACTIVE_TO_FRAUD,
  EDIT_STATE_ACTIVE_TO_ON_HOLD,
  EDIT_STATE_CANCELLED_TO_ACTIVE,
  EDIT_STATE_CANCELLED_TO_FRAUD,
  EDIT_STATE_CANCELLED_TO_ON_HOLD,
  EDIT_STATE_DECLINED_TO_ACTIVE,
  EDIT_STATE_DECLINED_TO_FRAUD,
  EDIT_STATE_DECLINED_TO_ON_HOLD,
  EDIT_STATE_FRAUD_TO_ACTIVE,
  EDIT_STATE_FRAUD_TO_DECLINED,
  EDIT_STATE_FRAUD_TO_ON_HOLD,
  EDIT_STATE_ON_HOLD_TO_ACTIVE,
  EDIT_STATE_ON_HOLD_TO_CANCELLED,
  EDIT_STATE_ON_HOLD_TO_DECLINED,
  EDIT_STATE_ON_HOLD_TO_FRAUD,
  EDIT_STATE_EXPIRED_TO_ACTIVE,
  EDIT_STATE_EXPIRED_TO_DECLINED,
  EDIT_STATE_EXPIRED_TO_ON_HOLD,
  EDIT_STATE_EXPIRED_TO_FRAUD,
  EDIT_UNDERWRITING_NOTE,
];

class StatusOverrideForm extends Component {
  constructor(props) {
    super(props);
    const { workbench, user } = props;
    const sameAdmin = workbench.primaryRep.email === user.email;

    this.state = { sameAdmin };
  }
  componentDidMount() {
    const { dispatch, workbench } = this.props;

    dispatch(
      getApprovalDeclineOnHoldNote(workbench.creator.id, workbench.id),
    ).then(response => {
      const { transitions } = response.payload.data;
      if (response.payload.data.transitions.length !== 0) {
        dispatch(
          initialize('overrideForm', {
            note: transitions[0].note,
          }),
        );
        switch (transitions[0].to) {
          case 'DECLINED':
            dispatch({
              type: UPDATE_LAST_DECLINED_TRANSITIONS,
              payload: transitions[0],
            });
            break;
          case 'ON_HOLD':
            dispatch({
              type: UPDATE_LAST_ON_HOLD_TRANSITIONS,
              payload: transitions[0],
            });
            break;
          case 'FRAUD':
            dispatch({
              type: UPDATE_LAST_FRAUD_TRANSITIONS,
              payload: transitions[0],
            });
            break;
          case 'ACTIVE':
            break;
          default:
            break;
        }
      }
    });
  }

  // test permission of editing state changes. Return boolean
  hasPermission = () =>
    permissionList.some(perm => this.props.permissions[perm]);

  canEdit = () => this.state.sameAdmin && this.hasPermission();

  render() {
    const { onSubmit, status } = this.props;

    return (
      <form className="RecommendationApprovalForm" onSubmit={onSubmit}>
        <header className="RecommendationFormHeader">
          <h2 className="RecommendationFormHeader__heading">
            Manual Override Application Status
          </h2>
        </header>
        <div className="RecommendationSubHeader">
          <p>
            This is the place where you override the application status. Use the
            space below to write a supplementary note. Then choose click one of
            the buttons below to change the application status. If you are
            declining, putting the application on hold or to fraud, a pop up
            list of reasons will appear. Select one of these to complete the
            application. By clicking the "Active" button, you will change the
            application state to "Active".
          </p>
          <p>
            The latest note on record, if any, will be pre-populated for your
            convenience.
          </p>
        </div>
        <div className="RecommendationFormContent">
          <StatusTextLoading isFetching={status.isFetching} />
          <Field
            {...fieldProps}
            name="note"
            component="textarea"
            disabled={!this.canEdit()}
            placeholder={
              status.isFetching ? (
                ''
              ) : (
                'Write your general notes here (Optional)'
              )
            }
            className="RecommendationFormTextarea"
          />
        </div>
      </form>
    );
  }
}

StatusOverrideForm.defaultProps = {
  status: { errors: [] },
};

StatusOverrideForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.array]),
  ),
  workbench: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
};

const StatusOverrideFormWrapper = reduxForm({
  form: 'overrideForm',
  destroyOnUnmount: false,
})(StatusOverrideForm);

const mapStateToProps = state => ({
  workbench: state.workbench,
  status: state.status,
  user: state.user,
  permissions: state.permissions.permissions,
});

export default connect(mapStateToProps)(StatusOverrideFormWrapper);
