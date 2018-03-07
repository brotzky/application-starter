import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FadeIn } from '../../../ui/transitions';

const ChecklistResolutionIncomplete = props => {
  return (
    <FadeIn className="ChecklistResolution__not-completed" component="div">
      <p className="ChecklistResolution__not-completed-text">
        {props.member.firstName}
        {' '}
        has not completed the required steps to be able to resolve the
        {' '}
        {props.checklistItem.prettyName}
        {' '}
        checklist item.
      </p>
      <p className="ChecklistResolution__not-completed-text">
        Please wait for
        {' '}
        {props.member.firstName}
        {' '}
        to complete the required steps before resolving this item.
      </p>
      <button
        onClick={event => props.handleCloseActionMenu(event)}
        className="c-button c-button--sec c-button--flush c-button--sm"
      >
        <span>Close</span>
      </button>
    </FadeIn>
  );
};

const mapStateToProps = state => ({
  member: state.member.member
});

export default connect(mapStateToProps)(ChecklistResolutionIncomplete);
