import fields from '../../../../../modules/forms/utils/fieldDefinitions';
import adminSteps from '../../../../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
import zagOccupationsList from '../options/zagOccupations';
import { industryList } from '../../../../../modules/forms/options/industry';
import sidebarLinks from '../../../../navigation/workbench-sidebar.js';

export default {
  'contact-and-basic-info': {
    groups: [
      {
        header: 'About',
        fields: [
          fields.first_name,
          fields.last_name,
          fields.title,
          fields.marital_status,
          fields.date_of_birth,
          fields.phone_number,
          fields.email,
          fields.social_insurance_number,
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
        header: 'Compliance Document',
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
          fields.first_deposit_transfer_from_tfsa_rrsp,
        ],
      },
      {
        header: 'First Deposit Cheque',
        fields: [fields.void_cheque],
        type: 'upload',
      },
      {
        header: 'Financial Information',
        fields: [
          fields.income_other,
          fields.income_other_source,
          fields.income_other_description,
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
            ...fields.occupation,
            options: zagOccupationsList,
          },
          fields.zag_employment_length,
          fields.stated_income,
          fields.verified_income,
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
    ],
    slug: 'financial-information',
  },
  'address-and-housing': {
    enum: 'ADDRESS_AND_HOUSING',
    groups: [
      {
        header: 'Address',
        fields: [
          fields.province,
          fields.city,
          fields.street,
          fields.unit,
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
      // Commented out for bolt for now
      // {
      //   primary: 'Deposit Admin ',
      // },
      // {
      //   primary: 'Compliance Analyst',
      // },
      // {
      //   primary: 'Financial Advisor',
      // },
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
