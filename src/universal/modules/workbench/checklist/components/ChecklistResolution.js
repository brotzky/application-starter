import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChecklistItem } from 'grow-actions/checklist/checklist';
import styled from 'styled-components';
import ChecklistModalPlaceholder from './ChecklistModalPlaceholder';
import ChecklistResolutionForm from './ChecklistResolutionForm';
import ChecklistResolutionIncomplete from './ChecklistResolutionIncomplete';
import { FadeIn } from '../../../ui/transitions';
import { Ex } from '../../../ui/icons/';

const ChecklistResolutionContainer = styled.div`
  position: absolute;
  right: 3rem;
  padding: 2.4rem;
  top: 7px;
  left: 23px;
  z-index: 2;
  border-radius: 2px;
  background: white;
  width: 405px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.2);

  ${props =>
    props.bottom
      ? `bottom: 9px;
    top: initial;`
      : ''};
`;

const StyledEx = styled(Ex)`
  position: absolute;
  top: -28px;
  padding: 4px;
  right: -3px;
  fill: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

const HeaderHeading = styled.h4`
  font-size: ${props => props.theme.font.size3};
`;

class ChecklistResolution extends Component {
  componentDidMount() {
    const { checklistItem, dispatch, params } = this.props;
    return dispatch(
      getChecklistItem(
        params.workbenchId,
        checklistItem.id,
        checklistItem.name,
      ),
    );
  }

  render() {
    const {
      checklistDetails,
      checklistItem,
      isFetchingDetails,
      handleCloseActionMenu,
      near,
    } = this.props;
    const detailsExist = checklistDetails.hasOwnProperty(checklistItem.name);
    const checklistItemDetails =
      detailsExist && checklistDetails[checklistItem.name];

    return (
      <ChecklistResolutionContainer bottom={near === '--bottom'}>
        <StyledEx />
        <header>
          <HeaderHeading>{checklistItem.prettyName}</HeaderHeading>
        </header>
        {(() => {
          if (isFetchingDetails) {
            return <ChecklistModalPlaceholder />;
          } else if (checklistItemDetails && !isFetchingDetails) {
            return (
              <FadeIn>
                <ChecklistResolutionForm
                  handleCloseActionMenu={handleCloseActionMenu}
                  {...this.props}
                />
              </FadeIn>
            );
          } else if (!checklistItemDetails && !isFetchingDetails) {
            return (
              <ChecklistResolutionIncomplete
                checklistItem={checklistItem}
                handleCloseActionMenu={handleCloseActionMenu}
              />
            );
          }
        })()}
      </ChecklistResolutionContainer>
    );
  }
}

const mapStateToProps = state => ({
  checklistDetails: state.checklist.checklistDetails,
  isFetchingDetails: state.checklist.isFetchingDetails,
  member: state.member.member,
});

export default connect(mapStateToProps)(ChecklistResolution);
