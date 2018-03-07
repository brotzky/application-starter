export const getGroupedChecklists = checklists => {
  const APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS = checklists.filter(
    checklist =>
      checklist.category === 'APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS',
  );
  const APPLICANT_PROFILE_INCOME_DOCUMENTS = checklists.filter(
    checklist => checklist.category === 'APPLICANT_PROFILE_INCOME_DOCUMENTS',
  );
  const APPLICANT_PROFILE_FINANCIAL_INFORMATION = checklists.filter(
    checklist =>
      checklist.category === 'APPLICANT_PROFILE_FINANCIAL_INFORMATION',
  );
  const APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO = checklists.filter(
    checklist =>
      checklist.category === 'APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO',
  );
  const APPLICANT_PROFILE_ADDRESS_AND_HOUSING = checklists.filter(
    checklist => checklist.category === 'APPLICANT_PROFILE_ADDRESS_AND_HOUSING',
  );
  const CREDIT_BUREAU = checklists.filter(
    checklist => checklist.category === 'CREDIT_BUREAU',
  );
  const CASH_FLOW_TRANSACTIONS = checklists.filter(
    checklist => checklist.category === 'CASH_FLOW_TRANSACTIONS',
  );
  const AFFORDABILITY_CALCULATOR = checklists.filter(
    checklist => checklist.category === 'AFFORDABILITY_CALCULATOR',
  );

  return [
    APPLICANT_PROFILE_IDENTIFICATION_DOCUMENTS,
    APPLICANT_PROFILE_INCOME_DOCUMENTS,
    APPLICANT_PROFILE_FINANCIAL_INFORMATION,
    APPLICANT_PROFILE_CONTACT_AND_BASIC_INFO,
    APPLICANT_PROFILE_ADDRESS_AND_HOUSING,
    CASH_FLOW_TRANSACTIONS,
    CREDIT_BUREAU,
    AFFORDABILITY_CALCULATOR,
  ].filter(item => item.length);
};
