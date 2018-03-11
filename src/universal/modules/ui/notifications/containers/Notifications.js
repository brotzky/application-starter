import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Notification from './Notification';
import { Transition } from '../../transitions/';

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 2.4rem;
  left: 2.4rem;
  z-index: 100;

  > span {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ErrorNotifications = styled.div`
  position: fixed;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 100;
  width: 440px;

  > span {
    display: flex;
    flex-direction: column-reverse;
  }
`;
class Notifications extends PureComponent {
  render() {
    const { dispatch, notifications } = this.props;

    const errors = [];
    const regularNotifications = [];
    notifications.map(notification => {
      notification.kind === 'error'
        ? errors.push(notification)
        : regularNotifications.push(notification);
    });

    return (
      <Transition transitionName="Notification">
        <NotificationWrapper>
          <Transition transitionName="Notification">
            {regularNotifications.map(notification => (
              <Notification
                key={notification.id}
                notification={notification}
                dispatch={dispatch}
              />
            ))}
          </Transition>
        </NotificationWrapper>
        <ErrorNotifications>
          <Transition transitionName="Notification">
            {errors.map(error => (
              <Notification
                key={error.id}
                notification={error}
                dispatch={dispatch}
              />
            ))}
          </Transition>
        </ErrorNotifications>
      </Transition>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications || [],
});

export default connect(mapStateToProps)(Notifications);
