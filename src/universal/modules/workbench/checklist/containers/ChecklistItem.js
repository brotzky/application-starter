import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getChecklistItem } from 'grow-actions/checklist/checklist';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
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
      case 'APPLICANT_PROFILE_ADDRESS_AND_HOUSING':
        return 'applicant-profile/address-and-housing';
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
            <h3 className="ChecklistItem__details-heading">
              {mostRecentDetails.contextualizedLabel}
            </h3>
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
              <div className="ChecklistItem__details-copy">
                <h6 className="ChecklistItem__details-subheading">
                  Resolution comment:
                </h6>
                <p className="ChecklistItem__details-copy">
                  {mostRecentDetails.overrideComment}
                </p>
              </div>
            ) : (
              (mostRecentDetails.overrideComment && (
                <div className="ChecklistItem__details-copy">
                  <h6 className="ChecklistItem__details-subheading">
                    Resolution comment:
                  </h6>
                  <p className="ChecklistItem__details-copy">
                    {mostRecentDetails.overrideComment}
                  </p>
                </div>
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
    const isInquiryClass = isInquiry
      ? 'ChecklistItem__status--inquirydisabled'
      : '';
    const bodyHeight = document.getElementsByTagName('body')[0].offsetHeight;

    return (
      <li
        key={checklistItem.id}
        ref={li => {
          this.checklistItemRef = li;
        }}
        className={`
          ChecklistItem
          ${addClassNameIf(isVerified, 'ChecklistItem--success')}
          ${addClassNameIf(showDetails, 'ChecklistItem--expanded')}
        `}
      >
        <FadeIn>
          {this.state.showChecklistItem ? (
            <div
              style={{ height: bodyHeight }}
              className="ChecklistResolution__bg"
              onClick={event => this.handleCloseActionMenu(event)}
            />
          ) : null}
        </FadeIn>
        <div className="ChecklistItem__overview">
          <div
            className={`ChecklistItem__status ${
              isUserClaimer
                ? isInquiryClass
                : 'ChecklistItem__status--unclaimed'
            }`}
          >
            {isVerified ? (
              <div
                className="ChecklistItem__status-icon"
                onClick={event => this.handleActionMenuClick(event)}
              >
                <CheckCircleFilled
                  height="24"
                  width="24"
                  id={`${checklistItem.name}_COMPLETE`}
                  className="ChecklistItem__status-icon--success"
                />
              </div>
            ) : (
              <div
                id={checklistItem.name}
                onClick={event => this.handleActionMenuClick(event)}
                className="ChecklistItem__status--unchecked"
              />
            )}
          </div>
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
          <Link
            to={`/members/${params.memberId}/workbench/${params.workbenchId}/${
              params.workbenchProduct
            }/${this.renderLinkTo(checklistItem.category)}`}
            className="ChecklistItem__name"
          >
            <span>{checklistItem.prettyName}</span>
          </Link>
          <button
            type="button"
            onClick={() => this.handleInfoClick(checklistItem)}
            className="ChecklistItem__info"
            title="See details"
          >
            <InfoCircle className="ChecklistItem__info-icon" />
            {}
            <div className="ChecklistItem__info-content">
              {checklistItem.resultReasons[0] ||
                'Cannot get checklist reults reasons at this moment'}
            </div>
          </button>
        </div>
        <div
          style={{ display: `${showDetails ? 'block' : 'none'}` }}
          className="ChecklistItem__details"
        >
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
        </div>
      </li>
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
