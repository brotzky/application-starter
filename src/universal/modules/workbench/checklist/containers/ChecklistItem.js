import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ease } from 'gac-utils/sc';
import { getChecklistItem } from 'grow-actions/checklist/checklist';
import {
  showChecklistBackground,
  updateChecklistState,
  SHOW_CHECKLIST_ITEM_DETAILS,
  HIDE_CHECKLIST_ITEM_DETAILS,
} from '../actions/actions-update-checklist-state';
import { CheckCircleFilled } from '../../../ui/icons';
import { FadeIn, Transition } from '../../../ui/transitions/';
import { showModal, hideModal } from '../../../ui/modal/actions/actions-modal';

class ChecklistItem extends Component {
  /**
   * Show the resolution modal.
   */
  handleActionMenuClick = event => {
    const {
      dispatch,
      checklistItem,
      isFetchingDetails,
      params,
      showChecklistDetails,
    } = this.props;
    dispatch(
      showModal('CHECKLIST_RESOLUTION_MODAL', {
        checklistItem,
        params,
        handleCloseActionMenu: () => dispatch(hideModal()),
      }),
    );
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
    const isVerified =
      checklistItem.verificationResult === 'PASS' ||
      checklistItem.verificationResult === 'OVERRIDE_PASS';
    const isInquiry = currentStep === 'inquiry';

    return (
      <ChecklistItemContainer
        key={checklistItem.id}
        innerRef={li => {
          this.checklistItemRef = li;
        }}
      >
        <Overview>
          <ItemStatus isInquiry={isInquiry}>
            {isVerified ? (
              <StatusIcon onClick={this.handleActionMenuClick} hoverable>
                <StyledCheckedCircleFilled
                  height="24"
                  width="24"
                  id={`${checklistItem.name}_COMPLETE`}
                />
              </StatusIcon>
            ) : (
              <StatusUnchecked
                hoverable
                id={checklistItem.name}
                onClick={this.handleActionMenuClick}
              />
            )}
          </ItemStatus>
          <ChecklistItemLinkName
            to={`/members/${params.memberId}/workbench/${params.workbenchId}/${
              params.workbenchProduct
            }/${this.renderLinkTo(checklistItem.category)}`}
          >
            <span>{checklistItem.prettyName}</span>
          </ChecklistItemLinkName>
        </Overview>
      </ChecklistItemContainer>
    );
  }
}

ChecklistItem.defaultProps = {
  checklistDetails: [],
  currentStep: '',
};

ChecklistItem.propTypes = {
  checklistDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.objectOf(PropTypes.array),
  ]),
  checklistItem: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  ).isRequired,
  isFetchingDetails: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
  isUserClaimer: PropTypes.bool.isRequired,
  currentStep: PropTypes.string,
};

const mapStateToProps = state => ({
  currentStep: state.workbench.currentStep,
});

export default connect(mapStateToProps)(ChecklistItem);

const ChecklistItemContainer = styled.li`
  border-bottom: 1px solid #efefef;
`;

export const StyledCheckedCircleFilled = styled(CheckCircleFilled)`
  width: ${props => (props.size ? props.size : 26)}px;
  height: ${props => (props.size ? props.size : 26)}px;
  path {
    fill: ${props => props.theme.colors.grey};
  }
  rect {
    fill: ${props => props.theme.colors.greyMidLight};
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
  ${props => (props.isInquiry ? statusInquiryDisabled : '')};
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

export const StatusIcon = styled.div`
  position: relative;
  ${ease('out')};
  ${props =>
    props.hoverable &&
    css`
      cursor: pointer;

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
    `};
`;

export const StatusUnchecked = styled.div`
  position: relative;
  height: ${props => (props.size ? props.size : '26')}px;
  width: ${props => (props.size ? props.size : '26')}px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.blue};
  ${ease('out')};
  ${props =>
    props.hoverable &&
    css`
      cursor: pointer;

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
    `};
`;
