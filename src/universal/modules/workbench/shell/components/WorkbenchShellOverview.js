import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { getMaskedFreq, getMaskedTerms } from 'grow-utils/accountOpening';
import { getQuote } from 'grow-actions/quote/quote';
import {
  dispatchPropType,
  workbenchPropType,
  paramsPropType,
  orgPropType,
} from 'gac-utils/proptypes';
import { UPDATE_QUOTE } from 'grow-actions/quote/constants';
import Loading from '../../../ui/loading';

const OverviewContainer = styled.div`
  padding: 0.7rem 2.8125rem 2.7rem;
  border-bottom: 1px solid #eee;
  position: relative;
  top: -1px;
  background: white;
  display: flex;
  justify-content: space-between;
`;

const OverviewTitle = styled.div`
  display: flex;
  text-transform: uppercase;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #9a9a9a;
`;

const OverviewLabel = styled.div`
  display: inline-block;
  min-width: 188px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #9a9a9a;
  line-height: 1.8;
`;

const OverviewItemRow = styled.div`
  display: flex;
`;

const OverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const OverviewItemDetails = styled.div`
  display: inline-block;
  line-height: 1.8;
  font-size: 1.3rem;
  font-weight: 400;
  overflow-wrap: break-word;
  max-width: ${props => (props.hasInvitee ? '220px' : '380px')};
  color: ${props => props.theme.colors.greyMidDark};
`;

const OverrideLink = styled.div`
  display: inline-block;
  width: 180px;
  margin-left: auto;
`;

const PrimaryColumn = styled.div`
  width: 100%;
`;
const InviteeColumn = styled.div`
  width: 100%;
`;

const Override = styled(Link)`
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  border: 1px solid;
  font-size: 1.3rem;
  padding: 0.4rem 1.2rem;
  border-color: ${props => props.theme.colors.blue};
  background: ${props => props.theme.colors.blue};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  color: white;
  transition: all 0.2s ease-out;
  transition-property: background, border, box-shadow, color;
  &:hover {
    background: #5293ff;
    border-color: #5293ff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
`;

// deep check if any changes between two objects in redux store
const checkObjectEquality = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Loader = () => <Loading width="80px" height="26px" borderWidth="10px" />;

const loanQuoteStepsList = [
  'verification',
  'admin-review',
  'underwriting',
  'approved',
  'pre-closing',
  'closing',
  'serving',
];
// to build all the items in Overview section
const OverviewBuilder = props => (
  <OverviewItemRow key={props.label}>
    <OverviewLabel>{props.label}</OverviewLabel>
    <OverviewItem>
      <OverviewItemDetails>{props.item || <Loader />}</OverviewItemDetails>
    </OverviewItem>
  </OverviewItemRow>
);
class WorkbenchShellOverview extends Component {
  constructor(props) {
    super(props);
    const orgLoanQuoteWhiteList = ['MERIDIAN']; // list of partners that have loan quote API setup
    const orgAcctOpenWhiteList = ['ZAG']; // list of partners that have loan quote API setup

    /**
     * To check if the current partner has corresponding items to show
     * E.g. Loan Quote items vs. Account Opening items
     */
    const orgLoanQuoteAPIReady = orgLoanQuoteWhiteList.includes(this.props.org);
    const orgAcctOpenAPIReady = orgAcctOpenWhiteList.includes(this.props.org);

    this.state = {
      orgLoanQuoteAPIReady,
      orgAcctOpenAPIReady,
    };
  }

  componentDidMount() {
    const { dispatch, workbench } = this.props;

    if (
      this.state.orgLoanQuoteAPIReady &&
      loanQuoteStepsList.includes(workbench.currentStep) &&
      workbench.id
    ) {
      dispatch(getQuote(workbench.id)).then(response => {
        dispatch({ type: UPDATE_QUOTE, payload: response.payload });
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      !checkObjectEquality(
        nextProps.workbench.quote,
        this.props.workbench.quote,
      ) ||
      nextProps.workbench.state !== this.props.workbench.state ||
      nextProps.workbench.primaryRep !== this.props.workbench.primaryRep ||
      !checkObjectEquality(nextProps.metadata, this.props.metadata)
    )
      return true;
    // means the GET_WORKBENCH_SUCCESS
    if (nextProps.workbench.id === this.props.workbench.id) return false;
    return true;
  }

  componentDidUpdate(prevProps) {
    const { dispatch, workbench } = this.props;
    // wait for workbench id in order to fetch quote data
    if (
      this.state.orgLoanQuoteAPIReady &&
      loanQuoteStepsList.includes(workbench.currentStep) &&
      prevProps.workbench.id !== this.props.workbench.id
    )
      dispatch(getQuote(workbench.id)).then(response => {
        dispatch({ type: UPDATE_QUOTE, payload: response.payload });
      });
  }

  render() {
    const {
      workbench: {
        applicationNumber,
        creator,
        currentStep,
        dateCreated,
        invites,
        metadataIsLoaded,
        primaryRep,
        productName,
        quote,
        state,
        id,
      },
      params,
      metadata: {
        ACCOUNT_DETAILS,
        ACCOUNT_PURPOSE,
        DATE_FUNDED,
        LOAN_PURPOSE,
        MARKETING,
        THIRD_PARTY,
        TAX_FORMS,
        QUOTE,
      },
      org,
    } = this.props;

    const hasInvitee = invites.length > 0;
    const accountDetails = ACCOUNT_DETAILS;
    const accountPurpose = ACCOUNT_PURPOSE && ACCOUNT_PURPOSE.accountPurpose;

    const getMaskedThirdParty = () =>
      THIRD_PARTY && THIRD_PARTY.hasThirdParty === false ? 'None' : 'Yes';

    const getMaskedTaxResidency = () => {
      if (TAX_FORMS && TAX_FORMS[creator.id]) {
        if (TAX_FORMS[creator.id].americanTaxPayer) return 'United States';
        if (TAX_FORMS[creator.id].canadianTaxPayer) return 'Canada';
        if (TAX_FORMS[creator.id].internationalTaxPayer) return 'International';
      }
      return 'Canada'; // default to Canada if no metadata is returned for tax
    };

    const getMaskedMarketing = () => {
      if (MARKETING && MARKETING[creator.id]) {
        return MARKETING[creator.id].canContactForMarketing ? 'Yes' : 'No';
      }
      return 'To be confirmed';
    };

    // "Override" button for state transitions
    const baseUrl = `/members/${params.memberId}/workbench/${
      params.workbenchId
    }/${params.workbenchProduct}`;
    const buildStatusNav = url => (
      <Override id="override" to={`${url}/status`}>
        Override App Status
      </Override>
    );
    const isUnclaimed =
      primaryRep.firstName === null || primaryRep.lastName === null;

    // Basic items for all types of products
    const baseItems = [
      { label: 'ID: ', item: applicationNumber },
      { label: 'Prod Web Safe Key: ', item: id },
      {
        label: 'Manager: ',
        item: isUnclaimed
          ? `Unclaimed`
          : primaryRep.firstName &&
            primaryRep.lastName &&
            `${primaryRep.firstName} ${primaryRep.lastName}`,
      },
      {
        label: 'Application Created: ',
        item: dateCreated && moment(dateCreated).format('MMM D, YYYY, h:mm a'),
      },
    ];

    // Loan Quote items
    const loanQuoteItems = [
      {
        label: 'Quote Created: ',
        item:
          quote.dateLoanUnderwritten &&
          moment(quote.dateLoanUnderwritten).format('MMM D, YYYY, h:mm a'),
      },
      {
        label: 'Loan Purpose: ',
        item:
          LOAN_PURPOSE && capitalizeString(LOAN_PURPOSE.loanPurpose, '_', ' '),
      },
      {
        label: 'Accepted Loan Amount: ',
        item:
          QUOTE && QUOTE.acceptedLoanAmount
            ? numeral(QUOTE.acceptedLoanAmount).format('$0,0.00')
            : 'N/A',
      },
      {
        label: 'Requested Loan Amount: ',
        item:
          quote.requestedLoanAmount &&
          numeral(quote.requestedLoanAmount).format('$0,0.00'),
      },
      {
        label: 'Approved Loan Amount: ',
        item:
          quote.maxiumumLoanAmount &&
          numeral(quote.maxiumumLoanAmount).format('$0,0.00'),
      },
      {
        label: 'Loan Payment: ',
        item:
          quote.loanMonthlyPayment &&
          numeral(quote.loanMonthlyPayment).format('$0,0.00'),
      },
      {
        label: 'Interest Rate: ',
        item:
          quote.loanInterestRate &&
          numeral(quote.loanInterestRate).format('0.00%'),
      },
      {
        label: 'Loan Term: ',
        item: quote && quote.loanTerm && `${quote.loanTerm} months`,
      },
      {
        label: 'Date Funded: ',
        item:
          currentStep === 'serving'
            ? DATE_FUNDED &&
              DATE_FUNDED.dateFunded &&
              moment(DATE_FUNDED.dateFunded).format('MMM D, YYYY, h:mm a')
            : 'N/A',
      },
      {
        label: 'Pricing Decision: ',
        item: quote && capitalizeString(quote.pricingDecision),
      },
    ];

    // Account Opening Items
    const acctOpeningItems = [
      {
        label: 'Account Purpose: ',
        item: accountPurpose && capitalizeString(accountPurpose, '_', ' '),
      },
      {
        label: 'Product Term: ',
        item: accountDetails && getMaskedTerms(org, accountDetails.termLength),
      },
      {
        label: 'Interest Payment Frequency: ',
        item:
          accountDetails && getMaskedFreq(org, accountDetails.payoutFrequency),
      },
      {
        label: 'Interest Payment Options: ',
        item:
          accountDetails &&
          capitalizeString(accountDetails.interestTransfer, '_', ' '),
      },
      { label: 'Third Party: ', item: getMaskedThirdParty() },
      { label: 'Tax: ', item: getMaskedTaxResidency() },
      { label: 'Marketing: ', item: getMaskedMarketing() },
    ];

    return (
      <OverviewContainer>
        <div>
          <OverviewTitle>
            <OverviewLabel>Application</OverviewLabel>
            <OverviewItemDetails>
              <OverrideLink>{buildStatusNav(baseUrl)}</OverrideLink>
            </OverviewItemDetails>
          </OverviewTitle>
          <OverviewItemRow>
            <OverviewLabel>Status: </OverviewLabel>
            <OverviewItem>
              <OverviewItemDetails
                id="OverviewItemStatusValue"
                hasInvitee={hasInvitee}
              >
                {(state && capitalizeString(state, '-', ' ')) || <Loader />}
              </OverviewItemDetails>
            </OverviewItem>
          </OverviewItemRow>

          {baseItems.map(item => (
            <OverviewBuilder label={item.label} item={item.item} />
          ))}

          {/* Loan Quote */}
          {this.state.orgLoanQuoteAPIReady &&
            Object.keys(quote).length > 0 &&
            loanQuoteStepsList.includes(currentStep) &&
            loanQuoteItems.map(item => (
              <OverviewBuilder label={item.label} item={item.item} />
            ))}

          {/* Account Opening */}
          {this.state.orgAcctOpenAPIReady &&
            productName &&
            productName.includes('gic') &&
            metadataIsLoaded &&
            acctOpeningItems.map(item => (
              <OverviewBuilder label={item.label} item={item.item} />
            ))}
        </div>

        <div>
          <PrimaryColumn>
            <OverviewTitle>Primary applicant</OverviewTitle>
            <OverviewItemRow>
              <OverviewItemDetails>
                {(creator.firstName &&
                  creator.lastName &&
                  `${creator.firstName} ${creator.lastName}`) || <Loader />}
              </OverviewItemDetails>
            </OverviewItemRow>

            <OverviewItemRow>
              <OverviewItemDetails>
                {creator.email || <Loader />}
              </OverviewItemDetails>
            </OverviewItemRow>
          </PrimaryColumn>
        </div>

        {invites.map(invite => (
          <div>
            <InviteeColumn key={invite.id}>
              <OverviewTitle>Invitee</OverviewTitle>
              <OverviewItemDetails>
                {(invite.firstName &&
                  invite.lastName &&
                  `${invite.firstName} ${invite.lastName}`) || <Loader />}
              </OverviewItemDetails>
              <OverviewItemDetails>
                {invite.email || <Loader />}
              </OverviewItemDetails>
            </InviteeColumn>
          </div>
        ))}
      </OverviewContainer>
    );
  }
}

WorkbenchShellOverview.propTypes = {
  workbench: workbenchPropType.isRequired,
  dispatch: dispatchPropType.isRequired,
  params: paramsPropType.isRequired,
  org: orgPropType.isRequired,
};

OverviewBuilder.propTypes = {
  label: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  org: state.auth.organization,
  metadata: state.workbench.metadata,
});

export default connect(mapStateToProps)(WorkbenchShellOverview);
