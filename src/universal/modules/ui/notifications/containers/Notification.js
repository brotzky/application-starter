import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../../spinner/spinner';
import { CheckCircle, ExclamationCircle, InfoCircle } from '../../icons/';
import { notificationDismiss } from '../actions/';
import { addClassNameIf } from 'grow-utils/addClassNameIf';

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

  renderUploadNotification = notification => {
    const { className, file, kind, message } = notification;
    return (
      <div
        className={`
        Notification
        Notification--${kind}
        ${addClassNameIf(file.uploaded, 'Notification--upload-success')}
        ${addClassNameIf(
          file.uploaded === false,
          'Notification--upload-failure',
        )}
        ${className || ''}`}
      >
        <div
          className="Notification__img"
          height="100"
          width="100"
          style={{ backgroundImage: `url(${file.preview})` }}
        />
        <div className="Notification__upload-content">
          <span
            className={`Notification__text ${
              className ? `${className}__text` : ''
            }`}
          >
            {message}
          </span>
          <div className="Notification__progress-bar Notification__progress-bar--bg" />
          <div
            className={`
            Notification__progress-bar
            Notification__progress-bar--value
            ${addClassNameIf(
              file.progress === 100,
              'Notification__progress-bar--waiting',
            )}`}
            style={{ width: `${file.progress}%` }}
          />
        </div>
      </div>
    );
  };

  renderIcon = kind => {
    const className = 'Notification__icon-graphic';

    switch (kind) {
      case 'error':
        return <ExclamationCircle className={className} />;
      case 'info':
        return <InfoCircle className={className} />;
      case 'loading':
        return <Spinner size="24" className={className} />;
      case 'success':
        return <CheckCircle className={className} />;
      default:
        return <InfoCircle className={className} />;
    }
  };

  renderBasicNotification(notification) {
    const { className, kind, message, suggestedActions, reason } = notification;
    return kind === 'error' ? (
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
    ) : (
      <div className={`Notification Notification--${kind} ${className || ''}`}>
        <div
          className={`Notification__icon ${
            className ? `${className}__icon` : ''
          }`}
        >
          {this.renderIcon(kind)}
        </div>
        <div
          className={`Notification__message ${
            className ? `${className}__message` : ''
          }`}
        >
          <span
            className={`Notification__text ${
              className ? `${className}__text` : ''
            }`}
          >
            {message}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { notification } = this.props;
    const { kind } = notification;

    if (kind === 'upload') {
      return this.renderUploadNotification(notification);
    }
    return this.renderBasicNotification(notification);
  }
}

export default Notification;
