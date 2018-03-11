import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ease, triangle } from 'gac-utils/sc';
import { getChecklistItem } from 'grow-actions/checklist/checklist';
import {
  showChecklistBackground,
  updateChecklistState,
  SHOW_CHECKLIST_ITEM_DETAILS,
  HIDE_CHECKLIST_ITEM_DETAILS,
} from '../actions/actions-update-checklist-state';
import { CheckCircleFilled, InfoCircle } from '../../../ui/icons';
import { ChecklistItemPlaceholder } from '../components/ChecklistItemPlaceholder';
import ChecklistResolution from '../components/ChecklistResolution';
import { FadeIn, Transition } from '../../../ui/transitions/';

const ChecklistItemContainer = styled.li`
  border-bottom: 1px solid #efefef;
`;

const StyledCheckedCircleFilled = styled(CheckCircleFilled)`
  width: 26px;
  height: 26px;
  * {
    fill: ${props => props.theme.colors.blue};
  }
`;

const detailsCopy = css`
  overflow-wrap: break-word;
  max-width: 540px;
`;

const DetailsHeading = styled.h3`
  max-width: 540px;
  margin-bottom: 1.37rem;
  font-size: ${props => props.theme.font.size3};
`;

const DetailsSubHeading = styled.h6`
  margin-bottom: 0.8rem;
  font-size: ${props => props.theme.font.size2};
`;

const DetailsCopyP = styled.p`
  ${detailsCopy};
`;

const DetailsCopyDiv = styled.div`
  ${detailsCopy};
`;

const StyledInfoButton = styled.button`
  margin-left: 1.6rem;
  position: relative;
  background: none;
`;

const ItemDetails = styled.div`
  display: ${props => (props.showDetails ? 'block' : 'none')};
  padding: 1rem 2.4rem 1.6rem 67px;
`;

const InfoIcon = styled(InfoCircle)`
  cursor: pointer;

  * {
    ${ease('out')};
    stroke: ${props => props.theme.colors.greyMid};
  }

  &:hover {
    * {
      stroke: ${props => props.theme.colors.blue};
    }
  }
`;

const ChecklistItemLinkName = styled(Link)`
  flex: 1;
  display: inline-block;
  margin-left: 1.6rem;
  padding: 1.06rem 0;
  color: $text-color;
  ${ease('out')};
`;

const statusUnclaimed = css`
  position: relative;

  &::before {
    content: 'You must be the manager of this application to edit';
    position: absolute;
    width: 400px;
    left: 38px;
    right: 0;
    margin: 0 auto;
    padding: 0.6rem;
    top: -4px;
    border-radius: 3px;
    background: white;
    color: ${props => props.theme.colors.black};
    cursor: not-allowed;
    z-index: 1;
    opacity: 0;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.15),
      0 2px 3px rgba(27, 39, 51, 0.06);
    transform-origin: bottom;
    text-align: center;
    pointer-events: none;
    ${ease('in-out')};
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  &::after {
    opacity: 0;
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: 50%;
    cursor: not-allowed;
  }
`;

const statusInquiryDisabled = css`
  position: relative;

  &::before {
    content: 'Cannot edit checklist items when application has status Inquiry';
    position: absolute;
    width: 475px;
    left: 38px;
    right: 0;
    margin: 0 auto;
    padding: 0.6rem;
    top: -4px;
    border-radius: 3px;
    background: white;
    color: ${props => props.theme.colors.black};
    cursor: not-allowed;
    z-index: 1;
    opacity: 0;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.15),
      0 2px 3px rgba(27, 39, 51, 0.06);
    transform-origin: bottom;
    text-align: center;
    pointer-events: none;
    ${ease('in-out')};
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  &::after {
    opacity: 0;
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: 50%;
    cursor: not-allowed;
  }
`;

const ItemStatus = styled.div`
  ${props =>
    props.isUserClaimer
      ? props.isInquiry ? statusInquiryDisabled : ''
      : statusUnclaimed};
`;

const InfoContent = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  width: 380px;
  border-radius: 2px;
  padding: 1.2rem;
  right: -1.6rem;
  top: 33px;
  background: ${props => props.theme.colors.blue};
  color: white;
  box-shadow: 0 1px 4px rgba(black, 0.1);
  ${ease('out')};

  &:after {
    ${props => triangle('10px', 'up', props.theme.colors.blue)};
    content: '';
    position: absolute;
    top: -5px;
    right: 22px;
  }
`;

const Overview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  font-size: 1.5rem;

  &:hover {
    .ChecklistItem__status-unchecked {
      border-color: ${props => props.theme.colors.blue};
    }

    .ChecklistItem__name {
      color: ${props => props.theme.colors.blue};
    }
  }
`;

const ResolutionBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
`;

const StatusIcon = styled.div`
  position: relative;
  cursor: pointer;
  ${ease('out')};

  &::after {
    opacity: 0;
    transform: scale(0.8);
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    right: 3px;
    bottom: 3px;
    left: 3px;
    background: white;
    box-shadow: 0px 1px 1p rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    ${ease('out')};
  }

  &:hover {
    opacity: 0.85;

    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const StatusUnchecked = styled.div`
  position: relative;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 1px solid rgb(173, 173, 173);
  cursor: pointer;
  ${ease('out')};

  &::before {
    opacity: 0;
    transform: scale(0.8);
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    background: ${props => props.theme.colors.blue};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    ${ease('out')};
  }

  &:hover {
    box-shadow: inset 0px -1px 3px rgba(black, 0.1);
    &::before {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

class ChecklistItem extends Component {
  constructor(props) {
    super(props);
    this.state = { showChecklistItem: false, near: '' };
  }

  handleActionMenuClick = event => {
    const rect = this.checklistItemRef.getBoundingClientRect();
    const { currentStep } = this.props;
    if (currentStep !== 'inquiry') {
      window.innerHeight / 1.7 > rect.top
        ? this.setState({ near: '--top' })
        : this.setState({ near: '--bottom' });

      event.nativeEvent.stopImmediatePropagation();
      this.setState({ showChecklistItem: !this.state.showChecklistItem });
      this.props.dispatch(
        showChecklistBackground(!this.state.showChecklistItem),
      );
      document.addEventListener(
        'keydown',
        this.handleCloseActionMenuEsc,
        false,
      );
    }
  };

  handleCloseActionMenu = () => {
    this.setState({ showChecklistItem: !this.state.showChecklistItem });
    this.props.dispatch(showChecklistBackground(!this.state.showChecklistItem));
    document.removeEventListener('click', this.handleCloseActionMenu);
  };

  handleCloseActionMenuEsc(event) {
    if (event.keyCode === 27) {
      this.setState({ showChecklistItem: !this.state.showChecklistItem });
      this.props.dispatch(
        showChecklistBackground(!this.state.showChecklistItem),
      );
      document.removeEventListener('keydown', this.handleCloseActionMenuEsc);
    }
  }

  handleInfoClick = checklistItem => {
    const { dispatch, params, showChecklistDetails } = this.props;
    if (showChecklistDetails.includes(checklistItem.name)) {
      return dispatch(
        updateChecklistState(HIDE_CHECKLIST_ITEM_DETAILS, checklistItem.name),
      );
    }
    dispatch(
      updateChecklistState(SHOW_CHECKLIST_ITEM_DETAILS, checklistItem.name),
    );
    return dispatch(
      getChecklistItem(
        params.workbenchId,
        checklistItem.id,
        checklistItem.name,
      ),
    );
  };

  renderLinkTo = category => {
    switch (category) {
      case 'APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS':
        return 'applicant-profile/identification-documents';
      case 'APPLICANT_PROFILE_INCOME_DOCUMENTS':
        return 'applicant-profile/income-documents';
      case 'APPLICANT_PROFILE_FINANCIAL_INFORMATION':
        return 'applicant-profile/financial-information';
      case 'APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO':
        return 'applicant-profile/contact-and-basic-info';
      case 'APPLICANT_PROFILE_APPLICATION_AND_LEGAL':
        return 'applicant-profile/application-and-legal-info';
      case 'CREDIT_BUREAU':
        return 'credit-bureau';
      case 'CASH_FLOW_TRANSACTIONS':
        return 'cash-flow-transactions';
      case 'AFFORDABILITY_CALCULATOR':
        return 'affordability-calculator';
      default:
        return '';
    }
  };

  renderDetails = (checklistItem, details) => {
    const mostRecentDetails = details[details.length - 1];
    return (
      <FadeIn>
        {mostRecentDetails ? (
          <div>
            <DetailsHeading>
              {mostRecentDetails.contextualizedLabel}
            </DetailsHeading>
            <p>
              {mostRecentDetails.resultReasons.map((reason, i) => (
                <span key={reason}>
                  {`${i === 0 ? '' : ', '}`}
                  {reason}
                </span>
              ))}
            </p>
            {checklistItem.verified === 'VERIFIED' &&
            mostRecentDetails.overrideComment ? (
              <DetailsCopyDiv>
                <DetailsSubHeading>Resolution comment:</DetailsSubHeading>
                <DetailsCopyP>{mostRecentDetails.overrideComment}</DetailsCopyP>
              </DetailsCopyDiv>
            ) : (
              (mostRecentDetails.overrideComment && (
                <DetailsCopyDiv>
                  <DetailsSubHeading>Resolution comment:</DetailsSubHeading>
                  <DetailsCopyP>
                    {mostRecentDetails.overrideComment}
                  </DetailsCopyP>
                </DetailsCopyDiv>
              )) ||
              null
            )}
          </div>
        ) : null}
      </FadeIn>
    );
  };

  render() {
    const {
      checklistItem,
      checklistDetails,
      isFetchingDetails,
      params,
      showChecklistDetails,
      isUserClaimer,
      currentStep,
    } = this.props;

    const isVerified = checklistItem.verified === 'VERIFIED';
    const showDetails = showChecklistDetails.includes(checklistItem.name);
    const isInquiry = currentStep === 'inquiry';
    const bodyHeight = document.getElementsByTagName('body')[0].offsetHeight;

    return (
      <ChecklistItemContainer
        key={checklistItem.id}
        ref={li => {
          this.checklistItemRef = li;
        }}
      >
        <FadeIn>
          {this.state.showChecklistItem ? (
            <ResolutionBg
              style={{ height: bodyHeight }}
              onClick={event => this.handleCloseActionMenu(event)}
            />
          ) : null}
        </FadeIn>
        <Overview>
          <ItemStatus isUserClaimer={isUserClaimer} isInquiry={isInquiry}>
            {isVerified ? (
              <StatusIcon onClick={event => this.handleActionMenuClick(event)}>
                <StyledCheckedCircleFilled
                  height="24"
                  width="24"
                  id={`${checklistItem.name}_COMPLETE`}
                />
              </StatusIcon>
            ) : (
              <StatusUnchecked
                id={checklistItem.name}
                onClick={event => this.handleActionMenuClick(event)}
              />
            )}
          </ItemStatus>
          <Transition
            transitionName={`QueueActions--reverse${this.state.near}`}
          >
            {this.state.showChecklistItem ? (
              <ChecklistResolution
                checklistItem={checklistItem}
                params={params}
                isFetchingDetails={isFetchingDetails}
                isVerified={isVerified}
                handleCloseActionMenu={this.handleCloseActionMenu}
                near={this.state.near}
              />
            ) : null}
          </Transition>
          <ChecklistItemLinkName
            to={`/members/${params.memberId}/workbench/${params.workbenchId}/${
              params.workbenchProduct
            }/${this.renderLinkTo(checklistItem.category)}`}
          >
            <span>{checklistItem.prettyName}</span>
          </ChecklistItemLinkName>
          <StyledInfoButton
            type="button"
            onClick={() => this.handleInfoClick(checklistItem)}
            title="See details"
          >
            <InfoIcon />
            <InfoContent>
              {checklistItem.resultReasons[0] ||
                'Cannot get checklist reults reasons at this moment'}
            </InfoContent>
          </StyledInfoButton>
        </Overview>
        <ItemDetails showDetails={showDetails}>
          {(() => {
            if (isFetchingDetails === checklistItem.name) {
              return <ChecklistItemPlaceholder />;
            } else if (checklistDetails.hasOwnProperty(checklistItem.name)) {
              return (
                <FadeIn>
                  {this.renderDetails(
                    checklistItem,
                    checklistDetails[checklistItem.name],
                  )}
                </FadeIn>
              );
            }
            return (
              <span>
                You do not have permission to view the details for{' '}
                {checklistItem.prettyName}.
              </span>
            );
          })()}
        </ItemDetails>
      </ChecklistItemContainer>
    );
  }
}

ChecklistItem.defaultProps = {
  checklistDetails: [],
  currentStep: '',
};

ChecklistItem.propTypes = {
  checklistDetails: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  ),
  checklistItem: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  ).isRequired,
  isFetchingDetails: PropTypes.PropTypes.bool.isRequired,
  isUserClaimer: PropTypes.bool.isRequired,
  currentStep: PropTypes.string,
};

const mapStateToProps = state => ({
  currentStep: state.workbench.currentStep,
});

export default connect(mapStateToProps)(ChecklistItem);
