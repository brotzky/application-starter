/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import * as parse from '../parse/';
import * as validation from '../validation/';
import * as format from '../format/'; // used for static text view
import masks from '../masks/'; // used for dynamic input editing
import {
  accountPurposeOptions,
  countryOptions,
  defaultOccupationOptions,
  educationLevelOptions,
  employmentStatusOptions,
  genderOptions,
  housingLengthOptions,
  housingStatusOptions,
  incomeOtherSourceOptions,
  industryOptions,
  interestTransferOptions,
  loanPurposeOptions,
  maritalStatusOptions,
  payoutFrequencyOptions,
  pepPositionOptions,
  pepSelfRelativeOptions,
  provinceOptions,
  relationshipOptions,
  termLengthOptions,
  titleOptions,
  zagEmploymentLengthOptions,
} from '../options/';

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
  type: 'select',
  option: accountPurposeOptions,
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

const agree_to_terms_service = {
  label: 'Agreed to Terms of Service',
  name: 'agreeToTermsOfService',
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
  options: relationshipOptions,
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
  options: educationLevelOptions,
  type: 'select',
  validate: [validation.required],
};

const email = {
  label: 'Email Address',
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
  options: industryOptions,
  type: 'select',
};

const employment_length = {
  label: 'Employment Length',
  name: 'timeRange',
  options: housingLengthOptions,
  type: 'select-easy',
};

const employment_status = {
  label: 'Employment Status',
  name: 'employmentStatus',
  options: employmentStatusOptions,
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
  name: 'firstDepositAmount',
  mask: masks.currency(true),
  parse: parse.currency,
  format: format.currency,
  type: 'tel',
};

const first_deposit_account_id = {
  label: 'Account ID',
  name: 'firstDepositAccountId',
  type: 'text',
};

const first_deposit_account_name = {
  label: 'Account Name',
  name: 'firstDepositAccountName',
  type: 'text',
};

const first_deposit_account_number = {
  label: 'Account Number',
  name: 'firstDepositAccountNumber',
  type: 'text',
};

const first_deposit_institution_name = {
  label: 'Institution Name',
  name: 'firstDepositInstitutionName',
  type: 'text',
};

const first_deposit_institution_number = {
  label: 'Institution Number',
  name: 'firstDepositInstitutionNumber',
  type: 'text',
};

const first_deposit_institution_transit = {
  label: 'Institution Transit Number',
  name: 'firstDepositInstitutionTransit',
  type: 'text',
};

const first_deposit_transfer_from_tfsa_rrsp = {
  label: 'Transfer from TFSA/RRSP',
  name: 'firstDepositTransferFromTFSARRSP',
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
  options: genderOptions,
  type: 'select-easy',
  validate: [validation.required],
};

const has_different_mailing_address = {
  label: 'Different Mailing Address',
  name: 'hasDifferentMailingAddress',
  options: radioYesNo,
  type: 'radio',
};

const mailing_city = {
  label: 'City',
  name: 'mailingCity',
  type: 'text',
};
const mailing_postal = {
  label: 'Postal Code',
  name: 'mailingPostal',
  type: 'text',
};
const mailing_province = {
  label: 'Province',
  name: 'mailingProvince',
  type: 'select',
  options: provinceOptions,
};
const mailing_street = {
  label: 'Street',
  name: 'mailingStreet',
  type: 'text',
};
const mailing_unit = {
  label: 'Unit',
  name: 'mailingUnit',
  type: 'text',
};

const housing_length = {
  label: 'Housing Length',
  name: 'yearsAtResidency',
  options: housingLengthOptions,
  type: 'select-easy',
};

const housing_status = {
  label: 'Housing Status',
  name: 'housingStatus',
  options: housingStatusOptions,
  type: 'select-easy',
};

const interest_transfer = {
  label: 'Interest Transfer from',
  name: 'interestTransfer',
  options: interestTransferOptions,
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
  options: incomeOtherSourceOptions,
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
  label: 'International Tax Resident',
  name: 'internationalTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

/**
 * Bolt-HISA specific
 */
const is_united_states_tax_resident = {
  label: 'U.S. Tax Resident/Citizen',
  name: 'americanTaxPayer',
  options: radioYesNo,
  type: 'radio',
};

const is_international_tax_resident = {
  label: 'International Tax Resident',
  name: 'isInternationalTaxResident',
  options: radioYesNo,
  tooltip:
    'Canadian FIs are required under Part XVIII and Part XIX of the Income Tax Act to collect information to determine if your account is reportable to CRA. The CRA may share this information with the government of a foreign country that you are resident of for tax purposes. Each account holder must complete this information. Further help with tax residency is available on CRA website “Determining an Individual’s Residence Status” or by calling 1-800-959-8281.',
  type: 'radio',
};

const is_united_states_citizen = {
  label: 'U.S. Citizen',
  name: 'isUnitedStatesCitizen',
  options: radioYesNo,
  tooltip:
    'In March 2010, the Foreign Account Tax Compliance Act (FATCA) was signed into U.S. law.  The purpose of the Act is to identify individuals who may evade US taxes by holding accounts outside of the U.S. On February 5, 2014, Canada signed an intergovernmental agreement with the U.S. regarding FATCA. Under this agreement, Canada agreed to pass laws requiring financial institutions to report annually (in some cases) to the Canada Revenue Agency (CRA) on specified accounts held in Canada by U.S. persons. The CRA may forward this reporting to the IRS under the provisions and safeguards of the Canada-U.S. Tax Convention.',
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
  options: maritalStatusOptions,
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
  options: defaultOccupationOptions,
  type: 'select',
};

const payout_frequency = {
  label: 'Payout Frequency',
  name: 'payoutFrequency',
  options: payoutFrequencyOptions,
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
  label: 'Mobile Phone Number',
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
  options: pepSelfRelativeOptions,
  type: 'select',
};

const politically_exposed_position_held = {
  label: 'Position',
  name: 'politicallyExposedPositionHeld',
  options: pepPositionOptions,
  type: 'select',
};

const politically_exposed_country_position_held = {
  label: 'Country of Position or Office',
  name: 'politicallyExposedCountryPositionHeld',
  options: countryOptions,
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
  options: provinceOptions,
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
  label: 'U.S. TIN',
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
  options: termLengthOptions,
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

const third_party_instructing = {
  label: 'Application for Third Party',
  name: 'isThirdParty',
  options: radioYesNo,
  tooltip:
    "A third party is an individual or entity, other than the account holder or those authorized to give instructions about the account, who directs what happens with the account. It is not about who “owns” the money, but rather about who gives the instructions to deal with the money. If you are acting on someone else's instructions then that individual is considered a third party.",
  type: 'radio',
};

const third_party_firstname = {
  label: 'First Name',
  name: 'thirdPartyFirstName',
  type: 'text',
};

const third_party_lastname = {
  label: 'Last Name',
  name: 'thirdPartyLastName',
  type: 'text',
};

const third_party_dob = {
  label: 'Date of Birth',
  name: 'thirdPartyDOB',
  mask: masks.dateOfBirth,
  format: format.date,
  parse: parse.replace(/\//g, ''),
  type: 'tel',
  validate: [validation.required, validation.dob],
};

const third_party_employment_status = {
  label: 'Employment Status',
  name: 'thirdPartyEmploymentStatus',
  options: employmentStatusOptions,
  type: 'select',
};

const third_party_occupation = {
  label: 'Occupation',
  name: 'thirdPartyOccupation',
  options: defaultOccupationOptions,
  type: 'select',
};

const third_party_industry = {
  label: 'Industry',
  name: 'thirdPartyIndustry',
  options: industryOptions,
  type: 'select',
};

const third_party_unit = {
  label: 'Unit',
  name: 'thirdPartyUnit',
  type: 'text',
};

const third_party_street = {
  label: 'Street',
  name: 'thirdPartyStreet',
  type: 'text',
};

const third_party_city = {
  label: 'City',
  name: 'thirdPartyCity',
  type: 'text',
};

const third_party_province = {
  label: 'Province',
  name: 'thirdPartyProvince',
  type: 'select',
  options: provinceOptions,
};

const third_party_postal = {
  label: 'Postal Code',
  name: 'thirdPartyPostal',
  type: 'text',
};

const third_party_relationship = {
  label: 'Relationship',
  name: 'thirdPartyRelationship',
  options: relationshipOptions,
  type: 'select',
};

const title = {
  label: 'Title',
  name: 'title',
  options: titleOptions,
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
  type: 'select',
  label: 'Country',
  options: countryOptions,
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
  options: zagEmploymentLengthOptions,
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
  agree_to_terms_service,
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
  is_canadian_tax_resident,
  is_international_tax_resident,
  is_international_tax_payer,
  is_united_states_citizen,
  is_united_states_tax_resident,
  is_joint,
  is_loyal_bank,
  last_name,
  loan_amount,
  loan_insurance,
  loan_joint,
  loan_purpose,
  marital_status,
  mailing_city,
  mailing_postal,
  mailing_province,
  mailing_street,
  mailing_unit,
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
  third_party_firstname,
  third_party_lastname,
  third_party_dob,
  third_party_occupation,
  third_party_postal,
  third_party_unit,
  third_party_street,
  third_party_city,
  third_party_province,
  third_party_industry,
  third_party_employment_status,
  third_party_relationship,
  third_party_instructing,
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
