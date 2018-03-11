import {
  contactBasicInfoItems,
  idDocuments,
  financialInfoItems,
  appLegalItems,
  creditBureauItems,
  cashflowTransactionsItems,
} from './checklist-constants';

export const getGroupedChecklists = checklists => {
  const APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO = checklists.filter(
    checklist => contactBasicInfoItems.includes(checklist.name),
  );
  const APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS = checklists.filter(
    checklist => idDocuments.includes(checklist.name),
  );
  // Leave it here just in case
  // const APPLICANT_PROFILE_INCOME_DOCUMENTS = checklists.filter(checklist =>
  //   incomeItems.includes(checklist.name),
  // );
  const APPLICANT_PROFILE_FINANCIAL_INFORMATION = checklists.filter(checklist =>
    financialInfoItems.includes(checklist.name),
  );
  const APPLICANT_PROFILE_APPLICATION_AND_LEGAL_INFO = checklists.filter(
    checklist => appLegalItems.includes(checklist.name),
  );
  const CREDIT_BUREAU = checklists.filter(checklist =>
    creditBureauItems.includes(checklist.name),
  );
  const CASH_FLOW_TRANSACTIONS = checklists.filter(checklist =>
    cashflowTransactionsItems.includes(checklist.name),
  );
  const AFFORDABILITY_CALCULATOR = checklists.filter(
    checklist => checklist.category === 'AFFORDABILITY_CALCULATOR',
  );

  return [
    APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS,
    // APPLICANT_PROFILE_INCOME_DOCUMENTS,
    APPLICANT_PROFILE_FINANCIAL_INFORMATION,
    APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO,
    APPLICANT_PROFILE_APPLICATION_AND_LEGAL_INFO,
    CASH_FLOW_TRANSACTIONS,
    CREDIT_BUREAU,
    AFFORDABILITY_CALCULATOR,
  ].filter(item => item.length);
};
