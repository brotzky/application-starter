/**
 * Contains the links to buid the sidebar navigation
 * in the workbench
 */

const sidebarLinks = {
  overview: {
    text: 'Checklist Overview',
    path: '/',
  },
  contactAndBasic: {
    text: 'Contact and Basic Info',
    path: 'applicant-profile/contact-and-basic-info/',
    badge: 'APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO',
  },
  identityDocs: {
    text: 'Identity Documents',
    path: 'applicant-profile/identification-documents/',
    badge: 'APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS',
  },
  employmentAndFinancials: {
    text: 'Employment and Financials',
    path: 'applicant-profile/financial-information/',
    badge: 'APPLICANT_PROFILE_FINANCIAL_INFORMATION',
  },
  addressAndHousing: {
    text: 'Address and Housing',
    path: 'applicant-profile/address-and-housing/',
    badge: 'APPLICANT_PROFILE_ADDRESS_AND_HOUSING',
  },
  legalStuff: {
    text: 'Application and Legal Info',
    path: 'applicant-profile/application-and-legal-info/',
    badge: 'APPLICANT_PROFILE_APPLICATION_AND_LEGAL_INFO',
  },
  creditBureau: {
    text: 'Credit Bureau',
    path: 'credit-bureau/',
    badge: 'CREDIT_BUREAU',
  },
  cashFlowTransactions: {
    text: 'Bank Accounts',
    path: 'cash-flow-transactions/',
    badge: 'CASH_FLOW_TRANSACTIONS',
  },
  affordabilityCalculator: {
    text: 'Affordability Calculator',
    path: 'affordability-calculator/',
    badge: 'AFFORDABILITY_CALCULATOR',
  },
  notes: {
    text: 'Notes',
    path: 'notes/',
  },
  recommendation: {
    text: 'Recommendation',
    path: 'recommendation/',
  },
  applicationStatus: {
    text: 'Application Status',
    path: 'application-status/',
  },
};

export default sidebarLinks;
