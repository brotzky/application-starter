// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, initialize } from 'redux-form';
import StatusTextLoading from '../components/StatusTextLoading';
import styled from 'styled-components';
import { Button } from '../../../ui/components';
import { permissionSelector } from 'gac-utils/selectors';
import { getApprovalDeclineOnHoldNote } from 'grow-actions/status/status';

import {
  UPDATE_LAST_DECLINED_TRANSITIONS,
  UPDATE_LAST_ON_HOLD_TRANSITIONS,
  UPDATE_LAST_FRAUD_TRANSITIONS,
  UPDATE_LAST_ACTIVE_TRANSITIONS,
  UPDATE_LAST_CANCELLED_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import { EDIT_UNDERWRITING_NOTE } from '../constants';
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;
const TextareaField = styled(Field)`
  border: none;
  overflow: auto;
  outline: none;
  width: 100%;
  min-height: 145px;
  padding: 1.5rem;
  border: 1px solid #dee4e7;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  resize: none;
  line-height: 1.5;
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
`;
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
          case 'CANCELLED': //TODO add reasons for cancelled.
          case 'ACTIVE':
            break;
          default:
            break;
        }
      }
    });
  }

  canEdit = () => this.state.sameAdmin && this.props.hasPermission;

  render() {
    const { onSubmit, status, workbench } = this.props;
    const { changeToStatus } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <div>
          <StatusTextLoading isFetching={status.isFetching} />

          <TextareaField
            name="note"
            component="textarea"
            disabled={!this.canEdit()}
            placeholder={
              status.isFetching
                ? ''
                : 'Write your general notes here (Optional)'
            }
          />
        </div>
        <ButtonContainer>
          <Button
            text="Update Notes"
            disabled={!this.canEdit()}
            size="large"
            permission={EDIT_UNDERWRITING_NOTE}
            appearance="primary"
          />
        </ButtonContainer>
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
  hasPermission: PropTypes.bool.isRequired,
};

const StatusOverrideFormWrapper = reduxForm({
  form: 'overrideForm',
  destroyOnUnmount: false,
})(StatusOverrideForm);

const mapStateToProps = state => ({
  workbench: state.workbench,
  status: state.status,
  user: state.user,
  hasPermission: permissionSelector(state, EDIT_UNDERWRITING_NOTE),
});

export default connect(mapStateToProps)(StatusOverrideFormWrapper);
