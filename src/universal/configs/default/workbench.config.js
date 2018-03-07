import fields from '../../modules/forms/utils/fieldDefinitions';
import adminSteps from '../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
import sidebarLinks from '../navigation/workbench-sidebar';

export default {
  'contact-and-basic-info': {
    groups: [
      {
        header: 'About',
        fields: [
          fields.title,
          fields.first_name,
          fields.last_name,
          fields.marital_status,
          fields.date_of_birth,
          fields.phone_number,
          fields.email,
          fields.social_insurance_number,
        ],
      },
      {
        header: 'Politically Exposed',
        fields: [
          fields.politically_exposed,
          fields.politically_exposed_self_relative,
          fields.politically_exposed_position_held,
          fields.politically_exposed_country_position_held,
        ],
      },
      {
        header: 'Contact agreements',
        fields: [fields.can_contact_for_marketing, fields.loan_insurance],
      },
      {
        header: 'Taxes',
        fields: [
          fields.is_canadian_resident,
          fields.is_canadian_tax_payer,
          fields.is_international_tax_resident,
          fields.is_united_states_citizen,
          fields.is_united_states_tax_payer,
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
      },
      {
        header: 'Primary ID',
        fields: [fields.primary_id_front, fields.primary_id_back],
      },
      {
        header: 'Secondary ID',
        fields: [fields.secondary_id],
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
          fields.occupation,
          fields.income_other,
          fields.income_other_source,
          fields.income_other_description,
        ],
      },
      {
        header: 'Employment',
        fields: [
          fields.employment_status,
          fields.employment_industry,
          fields.employment_length,
          fields.employment_income,
        ],
      },
      {
        header: 'Employer',
        fields: [
          fields.employer_name,
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
      },
      {
        header: 'Pay Stub',
        fields: [fields.paystub],
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
      {
        header: 'Housing information',
        fields: [
          fields.housing_status,
          fields.housing_length,
          fields.monthly_housing_cost,
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
          'Lorem Khaled Ipsum is a major key to success. They don’t want us to win. Hammock talk come soon. Celebrate success right, the only way, apple.',
        steps: [adminSteps.fraud, adminSteps.fsr, adminSteps.fsa],
      },
      {
        type: 'LOAN_APPROVAL',
        header: 'Loan approval',
        subheader:
          'Lorem Khaled Ipsum is a major key to success. They don’t want us to win. Hammock talk come soon. Celebrate success right, the only way, apple.',
      },
      {
        type: 'LOAN_AGREEMENT',
        header: 'Legal documents',
        subheader:
          'Lorem Khaled Ipsum is a major key to success. They don’t want us to win. Hammock talk come soon. Celebrate success right, the only way, apple.',
      },
      {
        type: 'LOAN_FUND',
        header: 'Fund loan',
        subheader:
          'Lorem Khaled Ipsum is a major key to success. They don’t want us to win. Hammock talk come soon. Celebrate success right, the only way, apple.',
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
      sidebarLinks.affordabilityCalculator,
      sidebarLinks.notes,
      sidebarLinks.applicationStatus,
    ],
  },
  notes: {
    heading: ['All', 'General', 'Applications', 'Products'],
  },
};
