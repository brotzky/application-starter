import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, formValueSelector } from 'redux-form';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { Button } from '../../../ui/components';
import { updateOverrideNote } from 'grow-actions/status/status';
import {
  UPDATE_APPLICATION_STATE,
  UPDATE_LAST_ACTIVE_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import { dispatchPropType, workbenchPropType } from 'gac-utils/proptypes';
import { QUEUE_IS_STALE } from '../../shell/actions/actions-update-queue-state';
const Container = styled.div`
  text-align: center;
`;
class StatusActiveForm extends Component {
  getSelectedQuote = (offers, selectedTerm) =>
    offers.filter(offer => offer.term === selectedTerm)[0];

  handleActiveClick = () => {
    const { dispatch, workbench, note } = this.props;
    const apiBody = { to: 'ACTIVE', note };

    dispatch(
      notificationPush({
        id: workbench.id,
        message: `Changing to Active state`,
        kind: 'loading',
      }),
    );

    dispatch(
      updateOverrideNote(workbench.creator.id, workbench.id, apiBody),
    ).then(response => {
      dispatch(hideModal());
      dispatch(
        notificationEdit({
          id: workbench.id,
          message: response.error
            ? `Could not change to Active state`
            : `Changed to Active state`,
          kind: response.error ? 'error' : 'success',
          dismissAfter: 5000,
        }),
      );

      if (!response.error) {
        dispatch({
          type: UPDATE_APPLICATION_STATE,
          payload: {
            state: response.payload.data.to
              .toLowerCase()
              .split('_')
              .join('-'),
          },
        });
        dispatch({
          type: UPDATE_LAST_ACTIVE_TRANSITIONS,
        });
        dispatch({
          type: QUEUE_IS_STALE,
        });
      }
    });
  };

  render() {
    return (
      <Container>
        <Button
          type="button"
          text="Confirm Active"
          onClick={this.handleActiveClick}
        />
      </Container>
    );
  }
}

const overrideFormSelector = formValueSelector('overrideForm');

const StatusActiveFormWrapper = reduxForm({
  form: 'statusActive',
})(StatusActiveForm);

const mapStateToProps = state => ({
  note: overrideFormSelector(state, 'note'),
});

StatusActiveForm.propTypes = {
  dispatch: dispatchPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  note: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(StatusActiveFormWrapper);
