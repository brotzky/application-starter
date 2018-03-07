/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import * as parse from '../parse/';
import * as validation from '../validation/';
import * as format from '../format/'; // used for static text view
import masks from '../masks/'; // used for dynamic input editing
import { industryList } from '../options/industries';
import { occupationList } from '../options/occupations';
import { countryList } from '../options/countries';

const relationship = [
  { name: 'Aunt', value: 'AUNT' },
  { name: 'Brother', value: 'BROTHER' },
  {
    name: 'Common Law Spouse',
    value: 'COMMON_LAW_SPOUSE',
  },
  { name: 'Cousin', value: 'COUSIN' },
  {
    name: 'Daughter',
    value: 'DAUGHTER',
  },
  {
    name: 'Daughter in Law',
    value: 'DAUGHTER_IN_LAW',
  },
  { name: 'Father', value: 'FATHER' },
  {
    name: 'Father in Law',
    value: 'FATHER_IN_LAW',
  },
  {
    name: 'Granddaughter',
    value: 'GRANDDAUGHTER',
  },
  {
    name: 'Grandfather',
    value: 'GRANDFATHER',
  },
  {
    name: 'Grandmother',
    value: 'GRANDMOTHER',
  },
  {
    name: 'Grandson',
    value: 'GRANDSON',
  },
  {
    name: 'Guardian',
    value: 'GUARDIAN',
  },
  {
    name: 'Mother',
    value: 'MOTHER',
  },
  {
    name: 'Mother in Law',
    value: 'MOTHER_IN_LAW',
  },
  {
    name: 'Nephew',
    value: 'NEPHEW',
  },
  {
    name: 'Niece',
    value: 'NIECE',
  },
  {
    name: 'Other',
    value: 'OTHER',
  },
  {
    name: 'Sister',
    value: 'SISTER',
  },
  {
    name: 'Son',
    value: 'SON',
  },
  {
    name: 'Son in Law',
    value: 'SON_IN_LAW',
  },
  {
    name: 'Spouse',
    value: 'SPOUSE',
  },
  {
    name: 'Step Daughter',
    value: 'STEP_DAUGHTER',
  },
  {
    name: 'Step Son',
    value: 'STEP_SON',
  },
  {
    name: 'Uncle',
    value: 'UNCLE',
  },
];

const stringifyRange = obj =>
  JSON.stringify({
    min: typeof obj.min === 'number' ? obj.min.toFixed(1) : null,
    max: typeof obj.max === 'number' ? obj.max.toFixed(1) : null,
  });

const radioYesNo = [
  {
    name: 'Yes',
    value: 'y',
  },
  {
    name: 'No',
    value: 'n',
  },
];

const loanPurposeOptions = [
  {
    value: 'DEBT_CONSOLIDATION',
    name: 'Debt Consolidation',
  },
  {
    value: 'VEHICLE_PURCHASE',
    name: 'Vehicle Purchase',
  },
  {
    value: 'BOAT_PURCHASE',
    name: 'Boat Purchase',
  },
  {
    value: 'RECREATIONAL_VEHICLE_PURCHASE',
    name: 'Recreational Vehicle Purchase',
  },
  {
    value: 'HOME_REPAIRS_RENOVATIONS',
    name: 'Home Repairs / Renovations',
  },
  {
    value: 'INVESTMENT',
    name: 'Investment',
  },
  {
    value: 'VACATION',
    name: 'Vacation',
  },
  {
    value: 'OTHER',
    name: 'Other',
  },
];

const account_number = {
  label: 'Account Number',
  name: 'accountNumber',
  type: 'text',
};

const account_full_name = {
  label: 'Name on Account',
  name: 'fullName',
  type: 'text',
};

const account_institution_name = {
  label: 'Institution Name',
  name: 'institutionName',
  type: 'text',
};

const account_institution_number = {
  label: 'Institution Number',
  name: 'institutionNumber',
  type: 'text',
};

const account_institution_transit_number = {
  label: 'Institution Transit Number',
  name: 'transitNumber',
  type: 'text',
};

const account_purpose = {
  label: 'Account Purpose',
  name: 'accountPurpose',
  type: 'text',
};

const agree_info_correct = {
  label: 'fields.agreeInfoCorrect.label',
  name: 'agreeInfoCorrect',
  options: radioYesNo,
  type: 'radio',
};

const agree_to_credit_check = {
  label: 'Agreed to Credit Check',
  name: 'agreedToCreditCheck',
  options: radioYesNo,
  type: 'radio',
};

const agree_to_terms_use = {
  label: 'Agreed to Terms of Use',
  name: 'agreeToTermsOfUse',
  options: radioYesNo,
  type: 'radio',
};

const beneficiary_firstname = {
  label: 'Beneficiary First Name',
  name: 'beneFirstName',
  type: 'text',
  validate: [validation.required],
};

const beneficiary_lastname = {
  label: 'Beneficiary Last Name',
  name: 'beneLastName',
  type: 'text',
  validate: [validation.required],
};

const beneficiary_allocation = {
  label: 'Beneficiary Allocation',
  name: 'beneAllocation',
  type: 'tel',
  validate: [validation.required],
};

const beneficiary_relationship = {
  label: 'Beneficiary Relatioship',
  name: 'beneRelationship',
  type: 'select',
  options: relationship,
  validate: [validation.required],
};

const beneficiary_dob = {
  label: 'Beneficiary Date of Birth',
  mask: masks.dateOfBirth,
  format: format.date,
  name: 'beneDateOfBirth',
  parse: parse.replace(/\//g, ''),
  type: 'tel',
  validate: [validation.required, validation.dob],
};

const business_owner_operator = {
  label: 'Business Owner Operator',
  name: 'isBusinessOwnerOperator',
  options: radioYesNo,
  type: 'radio',
};

const can_contact_for_marketing = {
  label: 'Can Contact for Marketing',
  name: 'canContactForMarketing',
  options: radioYesNo,
  type: 'radio',
};

const city = {
  label: 'City',
  name: 'city',
  type: 'text',
};

const date_of_birth = {
  label: 'Date of Birth',
  mask: masks.dateOfBirth,
  name: 'dateOfBirth',
  format: format.date,
  parse: parse.replace(/\//g, ''),
  type: 'text',
};

const educational_institution = {
  label: 'Education Level',
  name: 'educationLevel',
  options: [
    {
      disabled: true,
      name: 'Select education level',
      value: 'Select Education Level',
    },
    {
      name: 'Some high school, no diploma',
      value: 'SOME_HIGHSCHOOL_NO_DIPLOMA',
    },
    {
      name: 'High school graduate or equivalent',
      value: 'HIGH_SCHOOL_GRADUATE_OR_EQUIVALENT',
    },
    {
      name: 'Some college, no degree',
      value: 'SOME_COLLEGE_NO_DEGREE',
    },
    {
      name: 'Trade/technical/vocational degree',
      value: 'TRADE_TECHNICAL_VOCATIONAL_DEGREE',
    },
    { name: 'Associate degree', value: 'ASSOCIATE_DEGREE' },
    { name: "Bachelor's degree", value: 'BACHELORS_DEGREE' },
    { name: "Master's Degree", value: 'MASTERS_DEGREE' },
    { name: "Doctor's Degree", value: 'DOCTORS_DEGREE' },
  ],
  type: 'select',
  validate: [validation.required],
};

const email = {
  label: 'Email',
  name: 'email',
  type: 'email',
  validate: [validation.required, validation.email],
};

const email_verification_code = Object.assign({}, verification_code, {
  label: 'Email verification code',
  name: 'emailVerificationCode',
});

const employer_name = {
  label: 'Employer Name',
  name: 'employerName',
  type: 'text',
};

const employer_phone_number = {
  label: 'Employer Phone Number',
  name: 'employerPhone',
  type: 'tel',
  mask: masks.phone,
  format: format.phone,
  parse: parse.replace(/\D/g, ''),
};

const employment_industry = {
  label: 'Employment Industry',
  name: 'industry',
  options: industryList,
  type: 'select',
};

const employment_length = {
  label: 'Employment Length',
  name: 'timeRange',
  options: [
    {
      name: '0-2 years',
      value: stringifyRange({ min: 0.0, max: 2.0 }),
    },
    {
      name: '3-4 years',
      value: stringifyRange({ min: 3.0, max: 4.0 }),
    },
    {
      name: '5+ years',
      value: stringifyRange({ min: 5.0, max: null }),
    },
  ],
  type: 'select-easy',
};

const employment_status = {
  label: 'Employment Status',
  name: 'employmentStatus',
  options: [
    {
      name: 'Full time',
      value: 'FULL_TIME_EMPLOYMENT',
    },
    {
      name: 'Part time',
      value: 'PART_TIME_EMPLOYMENT',
    },
    {
      name: 'Self employed',
      value: 'SELF_EMPLOYED',
    },
    {
      name: 'Retired',
      value: 'RETIRED',
    },
    {
      name: 'Contract',
      value: 'CONTRACT',
    },
    {
      name: 'Commission',
      value: 'COMMISSION',
    },
    {
      name: 'Seasonal',
      value: 'SEASONAL',
    },
    {
      name: 'Student',
      value: 'STUDENT',
    },
    {
      name: 'Not employed',
      value: 'UNEMPLOYED',
    },
    {
      name: 'Homemaker',
      value: 'HOMEMAKER',
    },
  ],
  type: 'select',
};

const face_photo = {
  documentType: 'portrait',
  label: 'Portrait',
  name: 'facePhoto',
  type: 'file',
};

const finsnap = {
  name: 'finsnap',
  type: 'finsnap',
};

const finsnap_accounts = {
  name: 'finsnapAccounts',
  type: 'finsnap-accounts',
};

const first_name = {
  label: 'First Name',
  name: 'firstName',
  type: 'text',
  validate: [validation.required],
};

const first_deposit_amount = {
  label: 'Deposit Amount',
  name: 'firstDeposit.amount',
  mask: masks.currency(true),
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

const first_deposit_account_id = {
  label: 'Account ID',
  name: 'firstDeposit.accountId',
  type: 'text',
};

const first_deposit_account_name = {
  label: 'Account Name',
  name: 'firstDeposit.accountName',
  type: 'text',
};

const first_deposit_account_number = {
  label: 'Account Number',
  name: 'firstDeposit.accountNumber',
  type: 'text',
};

const first_deposit_institution_name = {
  label: 'Institution Name',
  name: 'firstDeposit.institutionName',
  type: 'text',
};

const first_deposit_institution_number = {
  label: 'Institution Number',
  name: 'firstDeposit.institutionNumber',
  type: 'text',
};

const first_deposit_institution_transit = {
  label: 'Institution Transit Number',
  name: 'firstDeposit.institutionTransit',
  type: 'text',
};

const first_deposit_transfer_from_tfsa_rrsp = {
  label: 'Transfer from TFSA/RRSP',
  name: 'firstDeposit.transferFromTFSARRSP',
  options: radioYesNo,
  type: 'radio',
};

const flex_quote = {
  name: 'flexQuote',
  type: 'flex-quote',
};

const gender = {
  label: 'Gender',
  name: 'gender',
  options: [
    {
      name: 'Female',
      value: 'FEMALE',
    },
    {
      name: 'Male',
      value: 'MALE',
    },
    {
      name: 'Unspecified',
      value: 'UNSPECIFIED',
    },
  ],
  type: 'select-easy',
  validate: [validation.required],
};

const has_different_mailing_address = {
  label: 'Has different mailing address',
  name: 'hasDifferentMailingAddress',
  options: radioYesNo,
  type: 'radio',
};

const housing_length = {
  label: 'Housing Length',
  name: 'yearsAtResidency',
  options: [
    {
      name: '0-2 years',
      value: stringifyRange({ min: 0.0, max: 2.0 }),
    },
    {
      name: '3-4 years',
      value: stringifyRange({ min: 3.0, max: 4.0 }),
    },
    {
      name: '5+ years',
      value: stringifyRange({ min: 5.0, max: null }),
    },
  ],
  type: 'select-easy',
};

const housing_status = {
  label: 'Housing Status',
  name: 'housingStatus',
  options: [
    { name: 'Rent', value: 'RENT' },
    { name: 'Own', value: 'OWN' },
    { name: 'Lives with parents', value: 'WITH_PARENTS' },
  ],
  type: 'select-easy',
};

const interest_transfer = {
  label: 'Interest Transfer from',
  name: 'interestTransfer',
  options: [
    {
      name: 'Existing Bank Account',
      value: 'CURRENT_FI_ACCOUNT',
    },
    {
      name: 'Account from Another Financial Institution',
      value: 'OTHER_FI_ACCOUNT',
    },
    {
      name: 'Rollover',
      value: 'ROLLOVER',
    },
  ],
  type: 'select',
  validate: [validation.required],
};

const income_other = {
  label: 'Other Income',
  mask: masks.currency(false),
  name: 'incomeSourceGrossIncome',
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

const income_other_source = {
  label: 'Other Income Source',
  name: 'incomeSource',
  options: [
    { name: 'Rental', value: 'RENTAL' },
    { name: 'Investment', value: 'INVESTMENT' },
    { name: 'Other', value: 'OTHER' },
  ],
  type: 'select-easy',
};

const income_other_description = {
  label: 'Other Income Description',
  name: 'incomeSourceOtherDescription',
  type: 'text',
};

const is_canadian_resident = {
  label: 'Canadian Resident',
  name: 'isCanadianResident',
  options: radioYesNo,
  tooltip:
    'Canadian FIs are required under Part XVIII and Part XIX of the Income Tax Act to collect information to determine if your account is reportable to CRA. The CRA may share this information with the government of a foreign country that you are resident of for tax purposes. Each account holder must complete this information. Further help with tax residency is available on CRA website “Determining an Individual’s Residence Status” or by calling 1-800-959-8281.',
  type: 'radio',
};

const is_canadian_tax_payer = {
  label: 'Canadian Tax Payer',
  name: 'canadianTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

/**
 * Bolt-HISA specific
 */
const is_canadian_tax_resident = {
  label: 'Canadian Tax Resident',
  name: 'canadianTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

/**
 * Bolt-HISA specific
 */
const is_international_tax_payer = {
  label: 'International Tax Payer',
  name: 'internationalTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

/**
 * Bolt-HISA specific
 */
const is_united_states_tax_resident = {
  label: 'United States Tax Resident',
  name: 'americanTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

const is_international_tax_resident = {
  label: 'International Tax Payer',
  name: 'internationalTaxPayer',
  options: radioYesNo,
  tooltip:
    'Canadian FIs are required under Part XVIII and Part XIX of the Income Tax Act to collect information to determine if your account is reportable to CRA. The CRA may share this information with the government of a foreign country that you are resident of for tax purposes. Each account holder must complete this information. Further help with tax residency is available on CRA website “Determining an Individual’s Residence Status” or by calling 1-800-959-8281.',
  type: 'radio',
};

const is_united_states_citizen = {
  label: 'United States Citizen',
  name: 'isUnitedStatesCitizen',
  options: radioYesNo,
  tooltip:
    'In March 2010, the Foreign Account Tax Compliance Act (FATCA) was signed into U.S. law.  The purpose of the Act is to identify individuals who may evade US taxes by holding accounts outside of the U.S. On February 5, 2014, Canada signed an intergovernmental agreement with the U.S. regarding FATCA. Under this agreement, Canada agreed to pass laws requiring financial institutions to report annually (in some cases) to the Canada Revenue Agency (CRA) on specified accounts held in Canada by U.S. persons. The CRA may forward this reporting to the IRS under the provisions and safeguards of the Canada-U.S. Tax Convention.',
  type: 'radio',
};

const is_united_states_tax_payer = {
  label: 'United States Tax Payer',
  name: 'americanTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

const is_joint = {
  label: 'Is joint',
  name: 'isJoint',
  options: radioYesNo,
  type: 'radio',
};

const is_loyal_bank = {
  label: 'Meridian is only institution',
  name: 'isLoyalBank',
  options: radioYesNo,
  type: 'radio',
};

const last_name = {
  label: 'Last Name',
  name: 'lastName',
  type: 'text',
};

const loan_amount = {
  label: 'Requested Loan Amount',
  mask: masks.currency(true),
  max: 35000,
  min: 5000,
  name: 'loanAmount',
  parse: parse.currency,
  format: format.currency,
  type: 'text',
  disabled: true,
  validate: [
    validation.required,
    validation.minDollarAmount(5000),
    validation.maxDollarAmount(35000),
  ],
};

const loan_joint = Object.assign({}, is_joint, {
  label: 'Loan joint',
});

const loan_purpose = {
  label: 'Loan Purpose',
  name: 'loanPurpose',
  options: loanPurposeOptions,
  type: 'text',
  disabled: true,
  validate: [validation.required],
};

const loan_insurance = {
  label: 'Wants Loan Insurance',
  name: 'wantsLoanInsurance',
  options: radioYesNo,
  type: 'radio',
};

const marital_status = {
  label: 'Marital Status',
  name: 'maritalStatus',
  options: [
    { name: 'Select marital status', value: 'Select marital status' },
    { name: 'Single', value: 'SINGLE' },
    { name: 'Common law', value: 'COMMONLAW' },
    { name: 'Married', value: 'MARRIED' },
    { name: 'Divorced', value: 'DIVORCED' },
    { name: 'Separated', value: 'SEPARATED' },
    { name: 'Widow', value: 'WIDOW(ER)' },
  ],
  type: 'select',
};

const monthly_housing_cost = {
  label: 'Monthly Housing Cost',
  mask: masks.currency(true),
  name: 'monthlyHousingCost',
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

// Options added in workflow config because they are usually partner specific.
const occupation = {
  label: 'Occupation',
  name: 'occupation',
  options: occupationList,
  type: 'select',
};

const payout_frequency = {
  label: 'Payout Frequency',
  name: 'payoutFrequency',
  options: [
    {
      name: 'Monthly',
      value: 'MONTHLY',
    },
    {
      name: 'Semi-annually',
      value: 'SEMI_ANNUALLY',
    },
    {
      name: 'Annually',
      value: 'ANNUALLY',
    },
    {
      name: 'At maturity',
      value: 'AT_MATURITY',
    },
  ],
  type: 'select',
  validate: [validation.required],
};

const paystub = {
  documentType: 'ps_noa',
  label: 'Paystub',
  name: 'paystub',
  type: 'file',
};

const phone_number = {
  label: 'Phone Number',
  mask: masks.phone,
  format: format.phone,
  name: 'phone',
  parse: parse.replace(/\D/g, ''),
  type: 'tel',
};

const phone_verification_code = {
  label: 'Phone verification code',
  name: 'phoneVerificationCode',
  parse: parse.number,
  type: 'tel',
  validate: [validation.required, validation.numeric, validation.length(6)],
};

const politically_exposed = {
  label: 'Politically Exposed',
  name: 'isPoliticallyExposed',
  options: radioYesNo,
  tooltip:
    'Meridian is required by law to identify accounts held by or on behalf of Politically Exposed Persons and/or their family members. A politically exposed person is one who is or has formerly been entrusted with a prominent public function, in Canada or internationally. Some examples include: Heads of state or heads of government; elected officials (municipal, regional, provincial, federal); members of a senate or legislature (including unelected); diplomatic or consular staff; judicial or senior military officials; senior government officials; senior political party officials; senior executives of a state-owned corporation or bank; senior executives of a government agency; senior executives of an international organization (including those in Canada).',
  type: 'radio',
};

const politically_exposed_self_relative = {
  label: 'Relative Politically Exposed',
  name: 'politicallyExposedSelfOrRelative',
  options: [
    {
      name: 'Select realtive politically exposed',
      value: 'Select realtive politically exposed',
    },
    {
      name: 'Self',
      value: 'SELF',
    },
    {
      name: 'Relative',
      value: 'RELATIVE',
    },
  ],
  type: 'select',
};

const politically_exposed_position_held = {
  label: 'Politically Exposed',
  name: 'politicallyExposedPositionHeld',
  options: [
    {
      name: 'Select politically exposed',
      value: 'Select politically exposed',
    },
    {
      name: 'Any elected official at any level of government',
      value: 'GOVERNMENT_ELECTED_OFFICIAL',
    },
    {
      name: 'Senior Executive of a state-owned corporation or bank',
      value: 'SENIOR_EXECUTIVE_OF_BANK_OR_STATE_CORPORATION',
    },
    {
      name: 'Senior Government Bureaucrat for any level of government',
      value: 'SENIOR_GOVERNMENT_BUREAUCRAT',
    },
    {
      name: 'Diplomatic or Consular Staff',
      value: 'DIPLOMATIC_OR_CONSULAR_STAFF',
    },
    {
      name: 'Judge - any level of court',
      value: 'JUDGE',
    },
    {
      name: 'Senior Executive of an international organization',
      value: 'SENIOR_EXECUTIVE_OF_INTERNATIONAL_CORPORATION',
    },
    {
      name: 'Head of any level of government',
      value: 'HEAD_OF_GOVERNMENT',
    },
  ],
  type: 'select',
};

const politically_exposed_country_position_held = {
  label: 'Country of Position or Office',
  name: 'politicallyExposedCountryPositionHeld',
  options: countryList,
  type: 'select',
};

const postal_code = {
  label: 'Postal Code',
  mask: masks.postalCode,
  name: 'postal',
  parse: parse.replace(/\s/g, ''),
  type: 'text',
};

const primary_id_back = {
  documentType: 'dl_pid_back',
  label: 'Primary ID Back',
  name: 'primaryIdBack',
  type: 'file',
};

const primary_id_front = {
  documentType: 'dl_pid_front',
  label: 'Primary ID Front',
  name: 'primaryIdFront',
  type: 'file',
};

const compliance_document = {
  documentType: 'comp_doc',
  label: 'Compliance Document',
  name: 'compDoc',
  type: 'file',
};

const province = {
  label: 'Province',
  name: 'province',
  options: [
    { name: 'Select province', value: 'Select province' },
    { name: 'Alberta', value: 'AB' },
    { name: 'British Columbia', value: 'BC' },
    { name: 'Manitoba', value: 'MB' },
    { name: 'New Brunswick', value: 'NB' },
    { name: 'Newfoundland and Labrador', value: 'NL' },
    { name: 'Nova Scotia', value: 'NS' },
    { name: 'Northwest Territories', value: 'NT' },
    { name: 'Nunavut', value: 'NU' },
    { name: 'Ontario', value: 'ON' },
    { name: 'Prince Edward Island', value: 'PE' },
    { name: 'Quebec', value: 'QC' },
    { name: 'Saskatchewan', value: 'SK' },
    { name: 'Yukon', value: 'YT' },
  ],
  type: 'select',
};

const secondary_id = {
  documentType: 'sec_id',
  label: 'Secondary ID',
  name: 'secondaryId',
  type: 'file',
};

const social_insurance_number = {
  label: 'Social Insurance Number',
  mask: masks.sin,
  name: 'sin',
  format: format.sin,
  parse: parse.replace(/\s/g, ''),
  tooltip:
    'This is needed to help us identify you. If you do not wish to provide this, you will need to visit a branch to proceed.',
  type: 'text',
  validate: [validation.sin],
};

const stated_income = {
  label: 'Stated Income',
  name: 'statedIncome',
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

const street = {
  label: 'Street',
  name: 'street',
  type: 'text',
};

const tax_identification_number = {
  label: 'Tax ID Number',
  name: 'taxIdentificationNumber',
  type: 'text',
};

const american_tax_identification_number = {
  label: 'United States TIN',
  name: 'americanTaxId',
  type: 'tel',
};

const american_tax_identification_number_applied = {
  label: 'Has Applied for US TIN',
  name: 'hasAppliedForAmericanTIN',
  options: radioYesNo,
  type: 'radio',
};

const term_length = {
  label: 'Term Length',
  name: 'termLength',
  type: 'select',
  options: [
    {
      name: 'No Term',
      value: 'NO_TERM',
    },
    {
      name: 'Six Months',
      value: 'SIX_MONTHS',
    },
    {
      name: 'Nine Months',
      value: 'NINE_MONTHS',
    },
    {
      name: 'One Year',
      value: 'ONE_YEAR',
    },
    {
      name: 'Two Years',
      value: 'TWO_YEARS',
    },
    {
      name: 'Three Years',
      value: 'THREE_YEARS',
    },
    {
      name: 'Four Years',
      value: 'FOUR_YEARS',
    },
    {
      name: 'Five Years',
      value: 'FIVE_YEARS',
    },
  ],
  validate: [validation.required],
};

const third_party = {
  label: 'Application for Third Party',
  name: 'hasThirdParty',
  options: radioYesNo,
  tooltip:
    "A third party is an individual or entity, other than the account holder or those authorized to give instructions about the account, who directs what happens with the account. It is not about who “owns” the money, but rather about who gives the instructions to deal with the money. If you are acting on someone else's instructions then that individual is considered a third party.",
  type: 'radio',
};

const title = {
  label: 'Title',
  name: 'title',
  options: [
    { name: 'Select title', value: 'Select title' },
    { name: 'Mrs', value: 'MRS' },
    { name: 'Mr', value: 'MR' },
    { name: 'Miss', value: 'MISS' },
    { name: 'Ms', value: 'MS' },
  ],
  type: 'select',
};

const unit = {
  label: 'Unit',
  name: 'unit',
  type: 'text',
};

const user_id = {
  label: 'User ID',
  name: 'username',
  type: 'text',
  validate: [validation.required],
};

const verification_code = {
  label: 'Verification code',
  name: 'verificationCode',
  parse: parse.number,
  type: 'tel',
  validate: [validation.numeric, validation.length(6)],
};

const verified_income = {
  label: 'Verified income',
  mask: masks.currency(true),
  name: 'verifiedIncome',
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

const void_cheque = {
  documentType: 'vc_ddf',
  label: 'Void Cheque',
  name: 'voidCheque',
  type: 'file',
};

const international_tax_form_country = {
  name: 'countryName',
  type: 'text',
  label: 'Country',
};

const international_tax_form_id = {
  name: 'idNumber',
  type: 'tel',
  label: 'TIN',
};

const international_tax_form_reason = {
  name: 'noIdNumberReason',
  type: 'text',
  label: 'No TIN Reason',
};

const zag_employment_length = {
  label: 'Employment Length',
  name: 'yearsAtJob',
  options: [
    {
      name: '0-2 years',
      value: stringifyRange({ min: 0.0, max: 2.0 }),
    },
    {
      name: '3-4 years',
      value: stringifyRange({ min: 3.0, max: 4.0 }),
    },
    {
      name: '5+ years',
      value: stringifyRange({ min: 5.0, max: null }),
    },
  ],
  type: 'select-easy',
};

export default {
  account_number,
  account_full_name,
  account_institution_name,
  account_institution_number,
  account_institution_transit_number,
  account_purpose,
  agree_info_correct,
  agree_to_credit_check,
  agree_to_terms_use,
  beneficiary_firstname,
  beneficiary_lastname,
  beneficiary_relationship,
  beneficiary_dob,
  beneficiary_allocation,
  business_owner_operator,
  can_contact_for_marketing,
  city,
  date_of_birth,
  educational_institution,
  email,
  email_verification_code,
  employer_name,
  employer_phone_number,
  employment_industry,
  employment_length,
  employment_status,
  face_photo,
  finsnap,
  finsnap_accounts,
  first_name,
  first_deposit_account_id,
  first_deposit_account_name,
  first_deposit_account_number,
  first_deposit_amount,
  first_deposit_institution_name,
  first_deposit_institution_number,
  first_deposit_institution_transit,
  first_deposit_transfer_from_tfsa_rrsp,
  flex_quote,
  gender,
  has_different_mailing_address,
  housing_length,
  housing_status,
  income_other,
  income_other_source,
  income_other_description,
  interest_transfer,
  is_canadian_resident,
  is_canadian_tax_payer,
  is_canadian_tax_resident,
  is_international_tax_resident,
  is_international_tax_payer,
  is_united_states_citizen,
  is_united_states_tax_payer,
  is_united_states_tax_resident,
  is_joint,
  is_loyal_bank,
  last_name,
  loan_amount,
  loan_insurance,
  loan_joint,
  loan_purpose,
  marital_status,
  monthly_housing_cost,
  occupation,
  paystub,
  payout_frequency,
  phone_number,
  phone_verification_code,
  politically_exposed,
  politically_exposed_country_position_held,
  politically_exposed_position_held,
  politically_exposed_self_relative,
  postal_code,
  primary_id_back,
  primary_id_front,
  province,
  secondary_id,
  social_insurance_number,
  stated_income,
  street,
  tax_identification_number,
  term_length,
  third_party,
  title,
  unit,
  verification_code,
  verified_income,
  void_cheque,
  compliance_document,
  american_tax_identification_number,
  american_tax_identification_number_applied,
  international_tax_form_country,
  international_tax_form_id,
  international_tax_form_reason,
  user_id,
  zag_employment_length,
};
