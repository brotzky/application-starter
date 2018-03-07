import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './Notification';
import { Transition } from '../../transitions/';

const Notifications = props => {
  const { dispatch, notifications } = props;

  const errors = [];
  const regularNotifications = [];
  notifications.map(notification => {
    notification.kind === 'error'
      ? errors.push(notification)
      : regularNotifications.push(notification);
  });

  return (
    <Transition transitionName="Notification">
      <div className="Notifications">
        <Transition transitionName="Notification">
          {regularNotifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              dispatch={dispatch}
            />
          ))}
        </Transition>
      </div>
      <div className="ErrorNotifications">
        <Transition transitionName="Notification">
          {errors.map(error => (
            <Notification
              key={error.id}
              notification={error}
              dispatch={dispatch}
            />
          ))}
        </Transition>
      </div>
    </Transition>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications || [],
});

export default connect(mapStateToProps)(Notifications);
