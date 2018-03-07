import fields from '../../../../../modules/forms/utils/fieldDefinitions';
import adminSteps from '../../../../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
import sidebarLinks from '../../../../navigation/workbench-sidebar.js';

const accountPurpose = [
  {
    name: 'Inheritance',
    value: 'INHERITANCE',
  },
  {
    name: 'Manage home renovation expenses',
    value: 'MANAGE_HOME_RENOVATION',
  },
  {
    name: 'Manage household expenses and bills',
    value: 'MANAGE_HOUSEHOLD',
  },
  {
    name: 'Manage education expenses',
    value: 'MANAGE_EDUCATION',
  },
  {
    name: 'Retirement',
    value: 'RETIREMENT',
  },
  {
    name: 'Save for a rainy day',
    value: 'SAVE_RAINY_DAY',
  },
  {
    name: 'Save for car purchase',
    value: 'SAVE_CAR_PURCHASE',
  },
  {
    name: 'Save for home purchase',
    value: 'SAVE_HOME_PURCHASE',
  },
  {
    name: 'Save for education',
    value: 'SAVE_EDUCATION',
  },
  {
    name: 'Save for vacation/leisure',
    value: 'SAVE_VACATION',
  },
  {
    name: 'Savings',
    value: 'SAVINGS',
  },
  {
    name: 'Taxation',
    value: 'TAXATION',
  },
];

export default {
  'contact-and-basic-info': {
    groups: [
      {
        header: 'General Information',
        fields: [
          fields.user_id,
          fields.first_name,
          fields.last_name,
          fields.gender,
          fields.date_of_birth,
          fields.email,
          fields.phone_number,
          fields.social_insurance_number,
          fields.unit,
          fields.street,
          fields.city,
          fields.province,
          fields.postal_code,
        ],
      },
      {
        header: 'Third Party',
        fields: [fields.third_party],
      },
      {
        header: 'Account Purpose',
        fields: [
          {
            ...fields.account_purpose,
            options: accountPurpose,
            type: 'select',
          },
        ],
      },
      {
        header: 'Contact Agreements',
        fields: [
          fields.can_contact_for_marketing,
          fields.agree_to_credit_check,
        ],
      },
      {
        header: 'Tax Information',
        fields: [
          fields.is_canadian_tax_payer,
          fields.is_international_tax_payer,
          fields.is_united_states_tax_payer,
        ],
      },

      {
        header: 'Politically Exposed Person',
        fields: [
          fields.politically_exposed,
          fields.politically_exposed_self_relative,
          fields.politically_exposed_position_held,
          fields.politically_exposed_country_position_held,
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
        header: 'Compliance Documents',
        fields: [fields.compliance_document],
        type: 'upload',
      },
      {
        header: 'First Deposit Information',
        fields: [
          fields.first_deposit_amount,
          fields.first_deposit_account_id,
          fields.first_deposit_account_name,
          fields.first_deposit_account_number,
          fields.first_deposit_institution_name,
          fields.first_deposit_institution_number,
          fields.first_deposit_institution_transit,
        ],
      },
      {
        header: 'First Deposit Cheque',
        fields: [fields.void_cheque],
        type: 'upload',
      },
      {
        header: 'Employment',
        fields: [
          fields.employment_status,
          fields.educational_institution,
          fields.stated_income,
          {
            name: 'jobs',
            label: 'Current Employer Info',
            fields: [
              fields.employer_name,
              fields.employment_length,
              fields.employer_phone_number,
              {
                ...fields.street,
                label: 'Employer Street',
                name: 'employerStreet',
                addressCompletePrefix: 'employer',
              },
              {
                ...fields.unit,
                name: 'employerUnit',
                label: 'Employer Unit',
              },
              {
                ...fields.city,
                label: 'Employer City',
                name: 'employerCity',
              },
              {
                ...fields.province,
                label: 'Employer Province',
                name: 'employerProvince',
              },
              {
                ...fields.postal_code,
                label: 'Employer Postal Code',
                name: 'employerPostal',
              },
            ],
            type: 'list',
          },
          {
            name: 'previousJobs',
            label: 'Previous Employer Info',
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
        header: 'Financial Information',
        fields: [
          fields.income_other,
          fields.income_other_source,
          fields.income_other_description,
        ],
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
          fields.unit,
          fields.street,
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
        steps: [
          adminSteps.create_account,
          adminSteps.first_deposit,
          adminSteps.final_review,
        ],
      },
    ],
  },
  checklist: {
    primaryFilters: [
      {
        primary: 'Compliance',
      },
      {
        primary: 'Fraud',
      },
    ],
  },
  progress: {
    steps: ['inquiry', 'verification', 'admin-review', 'serving'],
  },
  navigation: {
    sidebar: [
      sidebarLinks.contactAndBasic,
      sidebarLinks.identityDocs,
      sidebarLinks.employmentAndFinancials,
      sidebarLinks.addressAndHousing,
      sidebarLinks.creditBureau,
      sidebarLinks.cashFlowTransactions,
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
