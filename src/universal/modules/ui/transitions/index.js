/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeIn = ({ children, component, className }) => {
  // IE doesn't like fancy CSS transitions so we need to wrap it in div
  const isIE =
    !!navigator.userAgent.match(/Trident/g) ||
    !!navigator.userAgent.match(/MSIE/g);

  return isIE ? (
    <div>{children}</div>
  ) : (
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
    </ReactCSSTransitionGroup>
  );
};

export const FadeInFast = ({ children, component, className }) => (
  <ReactCSSTransitionGroup
    transitionName="FadeInFast"
    className={className}
    component={component}
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {children}
  </ReactCSSTransitionGroup>
);

export const FadeDown = ({ children, component, className }) => (
  <ReactCSSTransitionGroup
    transitionName="FadeDown"
    className={className}
    component={component}
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {children}
  </ReactCSSTransitionGroup>
);

export const FadeDownSlow = ({ children, component, className }) => (
  <ReactCSSTransitionGroup
    transitionName="FadeDownSlow"
    className={className}
    component={component}
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {children}
  </ReactCSSTransitionGroup>
);

export const FadeInAndSlideUp = ({ children }) => (
  <ReactCSSTransitionGroup
    transitionName="FadeInAndSlideUp"
    transitionAppear={true}
    transitionAppearTimeout={20000}
    transitionEnterTimeout={800}
    transitionLeaveTimeout={1000}
  >
    {children}
  </ReactCSSTransitionGroup>
);

export const Transition = ({ children, transitionName }) => (
  <ReactCSSTransitionGroup
    transitionName={transitionName}
    transitionAppear={true}
    transitionAppearTimeout={450}
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
  >
    {children}
  </ReactCSSTransitionGroup>
);
