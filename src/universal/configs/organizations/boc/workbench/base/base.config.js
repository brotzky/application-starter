import fields from '../../../../../modules/forms/utils/fieldDefinitions';
import accountPurpose from '../../../../../modules/forms/options/accountPurpose';
import adminSteps from '../../../../../modules/workbench/application-status/admin-steps/adminStepDefinitions';
import sidebarLinks from '../../../../navigation/workbench-sidebar.js';

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
        ],
      },
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
        header: 'Mailing Address',
        fields: [
          fields.mailing_unit,
          fields.mailing_street,
          fields.mailing_city,
          fields.mailing_province,
          fields.mailing_postal,
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
        header: 'Membership Share',
        fields: [fields.membership_share],
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
          fields.employment_industry,
          fields.occupation,
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
  'application-and-legal-info': {
    groups: [
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
        header: 'General Tax Information',
        fields: [
          fields.is_canadian_tax_resident,
          fields.is_united_states_tax_resident,
          fields.american_tax_identification_number,
        ],
      },
      {
        header: 'International Tax Information',
        fields: [
          fields.is_international_tax_payer,
          {
            name: 'taxForms',
            label: 'International Tax Info',
            fields: [
              {
                ...fields.international_tax_form_country,
                label: 'Country',
                name: 'countryName',
              },
              {
                ...fields.international_tax_form_id,
                label: 'TIN',
                name: 'idNumber',
              },
              {
                ...fields.international_tax_form_reason,
                label: 'Reason for No TIN',
                name: 'noIdNumberReason',
              },
            ],
            type: 'list',
          },
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
      {
        header: 'Third Party Info',
        fields: [
          fields.third_party,
          fields.third_party_firstname,
          fields.third_party_lastname,
          fields.third_party_relationship,
          fields.third_party_dob,
          fields.third_party_unit,
          fields.third_party_street,
          fields.third_party_city,
          fields.third_party_province,
          fields.third_party_postal,
          fields.third_party_employment_status,
          fields.third_party_industry,
          fields.third_party_occupation,
        ],
      },
      {
        header: 'Agreements',
        fields: [
          fields.can_contact_for_marketing,
          fields.agree_to_credit_check,
          fields.agree_to_terms_service,
        ],
      },
    ],
    enum: 'LEGAL',
    slug: 'application-and-legal-info',
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
      sidebarLinks.legalStuff,
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
