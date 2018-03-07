import fields from '../../../../../modules/forms/utils/fieldDefinitions';
import adminSteps from '../../../../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
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
          fields.date_of_birth,
          fields.phone_number,
          fields.email,
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
        fields: [fields.primary_id_front],
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
        header: 'Employment',
        fields: [
          fields.employment_status,
          fields.employment_length,
          fields.stated_income,
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
        header: 'Void cheque',
        fields: [fields.void_cheque],
        type: 'upload',
      },
      {
        header: 'Compliance Document',
        fields: [fields.compliance_document],
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
          fields.province,
          fields.city,
          fields.street,
          fields.unit,
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
          'To move the application through the process all flags associated with the application must be resolved.',
        steps: [
          {
            ...adminSteps.final_review,
            header: 'Open Grow Bank chequing account',
            subheader:
              'All checklist items must be verified to open a checking account',
          },
        ],
      },
    ],
  },
  checklist: {
    primaryFilters: [
      {
        primary: 'Fraud',
      },
      {
        primary: 'Compliance',
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
