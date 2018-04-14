/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeIn = ({ children, component, className }) => {
  <ReactCSSTransitionGroup
    transitionName="FadeIn"
    className={className}
    component={component}
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {children}
  </ReactCSSTransitionGroup>;
};

export const Transition = ({ children, transitionName }) => (
  <ReactCSSTransitionGroup
    transitionName={transitionName}
    transitionAppear={true}
    transitionAppearTimeout={400}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={250}
  >
    {children}
  </ReactCSSTransitionGroup>
);
