import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ModalContent from '../../../ui/modal/components/ModalContent';
import ChecklistModalPlaceholder from './ChecklistModalPlaceholder';
import { permissionSelector } from 'gac-utils/selectors';
import ChecklistResolutionIncomplete from './ChecklistResolutionIncomplete';
import ChecklistCorrectForm from '../containers/ChecklistCorrectForm';
import ChecklistItemDetails from './ChecklistItemDetails';
import { FadeIn } from '../../../ui/transitions';
import {
  StatusIcon,
  StatusUnchecked,
  StyledCheckedCircleFilled,
} from '../containers/ChecklistItem';

const ChecklistResolutionModal = ({
  checklistDetails,
  checklistItem,
  handleCloseActionMenu,
  hasPermission,
  params,
  isFetchingDetails,
}) => {
  const detailsExist = checklistDetails.hasOwnProperty(checklistItem.name);
  const isVerified =
    checklistItem.verificationResult === 'PASS' ||
    checklistItem.verificationResult === 'OVERRIDE_PASS';

  return (
    <ModalContent modalFullscreen={false} modalAction={handleCloseActionMenu}>
      {isFetchingDetails ? (
        <ChecklistModalPlaceholder />
      ) : (
        <ChecklistResolutionWrapper>
          <ChecklistResolutionHeader>
            {isVerified ? (
              <StatusIcon>
                <StyledCheckedCircleFilled size={32} height="30" width="30" />
              </StatusIcon>
            ) : (
              <StatusUnchecked size={32} />
            )}
            <h4>{checklistItem.prettyName}</h4>
          </ChecklistResolutionHeader>

          <div style={{ marginBottom: '25px' }}>
            {detailsExist ? (
              <FadeIn>
                <ContentHeading>Override</ContentHeading>
                <ChecklistCorrectForm
                  hasPermission={hasPermission}
                  isVerified={isVerified}
                  checklistItemDetails={checklistDetails[checklistItem.name]}
                  checklistItem={checklistItem}
                  handleCloseActionMenu={handleCloseActionMenu}
                  params={params}
                />
              </FadeIn>
            ) : (
              <ChecklistResolutionIncomplete
                checklistItem={checklistItem}
                handleCloseActionMenu={handleCloseActionMenu}
              />
            )}
          </div>

          {/*detailsExist && (
            <FadeIn component="div">
              <ContentHeading>Status</ContentHeading>
              <ChecklistItemDetails
                checklistItem={checklistItem}
                checklistDetails={checklistDetails}
                isVerified={isVerified}
              />
            </FadeIn>
          )*/}
        </ChecklistResolutionWrapper>
      )}
    </ModalContent>
  );
};

const mapStateToProps = (state, ownProps) => ({
  checklistDetails: state.checklist.checklistDetails,
  isFetchingDetails: state.checklist.isFetchingDetails,
  hasPermission: permissionSelector(
    state,
    ownProps.checklistItem.permissions.edit,
  ),
});

export default connect(mapStateToProps)(ChecklistResolutionModal);

const ChecklistResolutionWrapper = styled.div`
  max-width: 720px;
  min-height: 400px;
  padding: ${props => Number(props.theme.space) / 2}rem
    ${props => Number(props.theme.space) * 1.5}rem;
`;

const ChecklistResolutionHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  h4 {
    font-size: 23px;
    font-weight: 600;
    margin-left: 15px;
    color: ${props => props.theme.colors.blueStone};
  }
`;

export const ContentHeading = styled.h5`
  margin: 1rem 0 1.75rem;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.blueStone};
`;
