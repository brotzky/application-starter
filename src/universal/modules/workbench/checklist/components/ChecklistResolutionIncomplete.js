import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'gac-ui/components';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions';

const Text = styled.p`
  margin: 1.37rem 0 2.4rem;

  &:first-child {
    margin-bottom: 1.2rem;
  }
`;

const ChecklistResolutionIncomplete = props => (
  <FadeIn component="div">
    <Text>
      {props.member.firstName} has not completed the required steps to be able
      to resolve the {props.checklistItem.prettyName} checklist item.
    </Text>
    <Text>
      Please wait for {props.member.firstName} to complete the required steps
      before resolving this item.
    </Text>
    <Button
      onClick={event => props.handleCloseActionMenu(event)}
      size="large"
      text="Close"
    />
  </FadeIn>
);

const mapStateToProps = state => ({
  member: state.member.member,
});

export default connect(mapStateToProps)(ChecklistResolutionIncomplete);
