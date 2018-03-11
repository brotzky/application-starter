import React, { Component } from 'react';
import styled from 'styled-components';
import { notificationDismiss } from '../actions/';

const ErrorNotificationWrapper = styled.div`
  position: relative;
  background: ${props => props.theme.colors.errorPink};
  box-shadow: 0 8px 30px rgba(27, 39, 51, 0.08);
  border: 1px solid rgba(245, 77, 61, 0.24);
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ErrorDismissButton = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.errorRed};
  cursor: pointer;
`;

const ErrorTitle = styled.h3`
  color: ${props => props.theme.colors.errorRed};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const ErrorReason = styled.span`
  color: ${props => props.theme.colors.errorRed};
  margin-bottom: 0.5rem;
`;

const SuggestedActions = styled.ul`
  margin-left: 2rem;
  font-size: 1.4rem;
`;

const SuggestedAction = styled.li`
  color: ${props => props.theme.colors.errorRed};
`;

class Notification extends Component {
  dismissError = () => {
    this.props.dispatch(notificationDismiss(this.props.notification.id));
  };

  renderErrorNotification(notification) {
    const { kind, message, suggestedActions, reason } = notification;

    return (
      kind === 'error' && (
        <ErrorNotificationWrapper>
          <ErrorDismissButton onClick={this.dismissError}>×</ErrorDismissButton>
          <ErrorTitle>{message}</ErrorTitle>
          {reason && <ErrorReason>{reason}</ErrorReason>}
          {suggestedActions && (
            <SuggestedActions>
              {suggestedActions.map(action => (
                <SuggestedAction key={action}>{action}</SuggestedAction>
              ))}
            </SuggestedActions>
          )}
        </ErrorNotificationWrapper>
      )
    );
  }

  render() {
    return this.renderErrorNotification(this.props.notification);
  }
}

export default Notification;
