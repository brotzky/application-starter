/**
 * This file is to define what checklist items should show on each of
 * the page from the sidebar.
 * We are using the checklist "name" instead of "category" returned by backend
 */
export const appLegalItems = [
  'POLITICAL_EXPOSED_PERSON_VERIFICATION',
  'INTERNATIONAL_CITIZEN',
  'US_CITIZEN',
  'THIRD_PARTY_INFO_VERIFICATION',
  'THIRD_PARTY_STATUS_VERIFICATION',
];

export const contactBasicInfoItems = [
  'EMAIL_RISK',
  'EMAIL',
  'IP_RISK',
  'ADDRESS_VERIFICATION',
  'LENGTH_OF_MERIDIAN_RELATIONSHIP',
];

export const idDocuments = [
  'PRIMARY_ID_VERIFICATION',
  'FACE_PHOTO_VERIFICATION',
  'COMPLIANCE',
];

export const cashflowTransactionsItems = [
  'BANK_ACCOUNT_VERIFICATION',
  'NSF_FEE',
  'LARGE_CASH_TRANSACTION_VERIFICATION',
];

export const creditBureauItems = [
  'MINIMUM_CREDIT_SCORE',
  'CREDIT_BUREAU_FRAUD_VERIFICATION',
  'CREDIT_BUREAU_INQUIRIES_VERIFICATION',
];

export const financialInfoItems = [
  'FIRST_DEPOSIT_VERIFICATION',
  'STATED_INCOME_VERIFICATION',
  'INCOME_DOCUMENTS',
  'MONTHLY_PAYMENT_SOURCE',
  'SELF_EMPLOYED',
  'LOAN_INSURANCE',
];

// this is to grab the corresponding checklist items for each sidebar section
export const mapRouteToConst = {
  'contact-and-basic-info': contactBasicInfoItems,
  'identification-documents': idDocuments,
  'financial-information': financialInfoItems,
  'application-and-legal-info': appLegalItems,
  'credit-bureau': creditBureauItems,
  'cash-flow-transactions': cashflowTransactionsItems,
};
