import fields from '../../../../modules/forms/utils/fieldDefinitions';
import adminSteps from '../../../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
import sidebarLinks from '../../../navigation/workbench-sidebar.js';
import { industryList } from '../../../../modules/forms/options/industry';

export default {
  'contact-and-basic-info': {
    groups: [
      {
        header: 'About',
        fields: [
          fields.social_insurance_number,
          fields.first_name,
          fields.last_name,
          fields.title,
          fields.marital_status,
          fields.date_of_birth,
          fields.phone_number,
          fields.email,
          fields.educational_institution,
        ],
      },
      {
        header: 'Legal & CASL',
        fields: [fields.agree_to_terms_use, fields.can_contact_for_marketing],
      },
      {
        header: 'Personal loan details',
        fields: [
          fields.loan_amount,
          fields.loan_purpose,
          fields.agree_to_credit_check,
        ],
      },
      {
        header: 'Third party status',
        fields: [fields.third_party],
      },

      {
        header: 'Politically exposed',
        fields: [
          fields.politically_exposed,
          fields.politically_exposed_self_relative,
          fields.politically_exposed_position_held,
          fields.politically_exposed_country_position_held,
        ],
      },
      {
        header: 'Taxes',
        fields: [
          fields.is_canadian_resident,
          fields.is_international_tax_resident,
          fields.is_united_states_citizen,
        ],
      },
    ],
    enum: 'CONTACT_AND_BASIC_INFO',
    slug: 'contact-and-basic-info',
  },
  'identification-documents': {
    enum: 'IDENTITY_DOCUMENTS',
    groups: [
      {
        header: 'Portrait',
        fields: [fields.face_photo],
        type: 'upload',
      },
      {
        header: 'Primary ID',
        fields: [fields.primary_id_front, fields.primary_id_back],
        type: 'upload',
      },
      {
        header: 'Secondary ID',
        fields: [fields.secondary_id],
        type: 'upload',
      },
    ],
    slug: 'identification-documents',
  },
  'financial-information': {
    enum: 'FINANCIAL_INFORMATION',
    groups: [
      {
        header: 'Financial Information',
        fields: [
          fields.stated_income,
          {
            name: 'otherIncomeSources',
            label: 'Other income sources',
            fields: [
              fields.income_other,
              fields.income_other_source,
              fields.income_other_description,
            ],
            type: 'list',
          },
        ],
      },
      {
        header: 'Employment',
        fields: [
          fields.employment_status,
          {
            ...fields.employment_industry,
            options: industryList,
          },
          {
            name: 'jobs',
            label: 'Current employer info',
            fields: [
              fields.employer_name,
              fields.employment_length,
              fields.employer_phone_number,
              {
                ...fields.street,
                label: 'Employer street',
                name: 'employerStreet',
                addressCompletePrefix: 'employer',
              },
              {
                ...fields.unit,
                name: 'employerUnit',
                label: 'Employer unit',
              },
              {
                ...fields.city,
                label: 'Employer city',
                name: 'employerCity',
              },
              {
                ...fields.province,
                label: 'Employer province',
                name: 'employerProvince',
              },
              {
                ...fields.postal_code,
                label: 'Employer postal code',
                name: 'employerPostal',
              },
            ],
            type: 'list',
          },
          {
            name: 'previousJobs',
            label: 'Previous employer info',
            fields: [
              fields.employer_name,
              fields.employment_length,
              fields.employer_phone_number,
              {
                ...fields.street,
                label: 'Employer street',
                name: 'employerStreet',
                addressCompletePrefix: 'employer',
              },
              {
                ...fields.unit,
                name: 'employerUnit',
                label: 'Employer unit',
              },
              {
                ...fields.city,
                label: 'Employer city',
                name: 'employerCity',
              },
              {
                ...fields.province,
                label: 'Employer province',
                name: 'employerProvince',
              },
              {
                ...fields.postal_code,
                label: 'Employer postal code',
                name: 'employerPostal',
              },
            ],
            type: 'list',
          },
        ],
      },
      {
        header: 'Monthly payment source',
        fields: [
          fields.account_full_name,
          fields.account_institution_name,
          fields.account_institution_number,
          fields.account_institution_transit_number,
          fields.account_number,
        ],
      },
      {
        header: 'Pay stub',
        fields: [fields.paystub],
        type: 'upload',
      },
      {
        header: 'Void cheque',
        fields: [fields.void_cheque],
        type: 'upload',
      },
    ],
    slug: 'financial-information',
  },
  'address-and-housing': {
    enum: 'ADDRESS_AND_HOUSING',
    groups: [
      {
        header: 'Address',
        fields: [
          fields.housing_status,
          fields.housing_length,
          fields.monthly_housing_cost,
          fields.street,
          fields.unit,
          fields.city,
          fields.province,
          fields.postal_code,
        ],
      },
    ],
    slug: 'address-and-housing',
  },
  'application-status': {
    groups: [
      {
        type: 'ADMIN_STEPS',
        header: 'Review steps',
        subheader:
          'To move the application through the process all flags associated with the application must be resolved. The list below indicates the order in which the flags must be resolved.',
        steps: [adminSteps.fraud, adminSteps.fsr],
      },
      {
        type: 'LOAN_APPROVAL',
        header: 'Loan approval',
        subheader:
          'Determine if the loan is to be set to Approve or Decline. If all flags are resolved, the application can be set to Approve which will generate the loan documents. If there are flags that cannot be resolved, the application is set to Decline and no loan documents will be generated.',
      },
      {
        type: 'LOAN_AGREEMENT',
        header: 'Legal documents',
        subheader:
          'When the loan is in Approved status in Step 2, clicking the Send button below will send the legal documents to the Member to sign.',
      },
      {
        type: 'LOAN_FUND',
        header: 'Fund loan',
        subheader:
          'When all requirements to complete the you can Fund the loan',
      },
    ],
  },
  checklist: {
    primaryFilters: [
      {
        primary: 'Fraud',
      },
      {
        primary: 'FSR',
      },
    ],
  },
  progress: {
    steps: [
      'inquiry',
      'pre-approval',
      'verification',
      'admin-review',
      'approved',
      'pre-closing',
      'closing',
      'serving',
    ],
  },
  navigation: {
    sidebar: [
      sidebarLinks.contactAndBasic,
      sidebarLinks.identityDocs,
      sidebarLinks.employmentAndFinancials,
      sidebarLinks.addressAndHousing,
      sidebarLinks.creditBureau,
      sidebarLinks.cashFlowTransactions,
      sidebarLinks.affordabilityCalculator,
      sidebarLinks.notes,
      sidebarLinks.applicationStatus,
    ],
  },
  features: {
    translator: true,
  },
  notes: {
    heading: ['All', 'General', 'Applications', 'Products'],
  },
};
