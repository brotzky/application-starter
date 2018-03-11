import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsers } from 'grow-actions/user/user';
import { QueueItemCell, QueueItem } from 'gac-utils/sc';
import { updateProductApplication } from 'grow-actions/product-applications/product-applications';
import ModalContent from '../../ui/modal/components/ModalContent';
import { hideModal } from '../../ui/modal/actions/actions-modal';
import { FadeIn } from '../../ui/transitions/';
import { Button } from '../../ui/components';
import { Spinner } from 'gac-ui/components/';
import ReactSelect from '../../forms/fields/ReactSelect';
import { notificationPush } from '../../ui/notifications/actions';

const QueueApplicationAssign = styled.ul`
  max-height: 250px;
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 2px;
  list-style-type: none;
`;
const StyledSelectOption = styled.div`
  display: flex;
  vertical-align: middle;
  text-align: left;
  span:first-child {
    font-weight: 600;
    font-size: 12px;
    flex: 1;
  }
  span:last-child {
    font-size: 12px;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
`;

const SubmitButton = styled.div`
  margin: 30px 0 10px;
  max-width: 100px;
`;
const ModalHeading = styled.h5`
  display: block;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 1.5rem;
  font-size: 2.25rem;
`;

class QueueAssignApplicationModal extends Component {
  static propTypes = {
    application: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    primaryRep: PropTypes.object,
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  };
  state = {
    selectedOption: undefined,
  };
  componentWillMount() {
    const { dispatch, users: { isFetching, users } } = this.props;
    if (!users.length && !isFetching) {
      return dispatch(getUsers());
    }
  }

  handleAssignClick = () => {
    const { application, dispatch } = this.props;
    const { selectedOption } = this.state;
    if (selectedOption) {
      const body = { primaryRep: selectedOption.value, currentStep: null };
      return dispatch(updateProductApplication(application.getId(), body)).then(
        () => {
          dispatch(
            notificationPush({
              id: `assign-user-${selectedOption.value}`,
              kind: 'success',
              message: `Successfully assigned ${selectedOption.label}`,
              dismissAfter: 5000,
            }),
          );
          dispatch(hideModal());
        },
      );
    } else {
      dispatch(
        notificationPush({
          id: `assign-user-fail`,
          kind: 'error',
          message: `Please select a user`,
          dismissAfter: 5000,
        }),
      );
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  /**
   * Return users list in a format digestible by react-select.
   * Do not include user and currently assigned user.
   * @param {*} users
   * @param {*} currentUser
   * @param {*} primaryRep
   */
  renderUsersList(users, currentUser, primaryRep) {
    return users
      .filter(
        user => user.email !== currentUser.email && user.email !== primaryRep,
      )
      .sort((a, b) => {
        const firstNameDiff = a.firstName.localeCompare(b.firstName);
        if (firstNameDiff !== 0) {
          return firstNameDiff;
        }
        // if first names are exact match, compare last names
        const lastNameDiff = a.lastName.localeCompare(b.lastName);
        return lastNameDiff;
      })
      .map(user => {
        return {
          value: user.email,
          label: user.firstName + ' ' + user.lastName,
        };
      });
  }

  render() {
    const {
      application,
      dispatch,
      primaryRep,
      user,
      users: { isFetching, users },
    } = this.props;
    const { selectedOption } = this.state;
    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <div>
          <ModalHeading>
            Assign this {application.getPrettyName()} application
          </ModalHeading>
          <p style={{ marginBottom: '4.8rem' }}>
            Select the user you would like to assign this application to.
          </p>
          {isFetching ? (
            <Spinner color="#448AFF" />
          ) : (
            <ReactSelect
              placeholder="Search for a user"
              disabled={isFetching}
              options={this.renderUsersList(users, user, primaryRep)}
              multi={false}
              value={selectedOption}
              onChange={this.handleChange}
              optionRenderer={props => (
                <StyledSelectOption>
                  <span>{props.label}</span>
                  <span>{props.value}</span>
                </StyledSelectOption>
              )}
            />
          )}
          <SubmitButton>
            <Button
              text="Assign"
              size="large"
              onClick={this.handleAssignClick}
              disabled={isFetching || !selectedOption}
            />
          </SubmitButton>
        </div>
      </ModalContent>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  primaryRep: state.workbench.primaryRep,
});

export default connect(mapStateToProps)(QueueAssignApplicationModal);
