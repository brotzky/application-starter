import baseDepositAccountConfig from './base/deposit-account.config';
import fields from '../../../../modules/forms/utils/fieldDefinitions';

export default {
  ...baseDepositAccountConfig,
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
      {
        header: 'Taxes',
        fields: [
          fields.is_canadian_tax_resident,
          fields.is_united_states_tax_resident,
          fields.american_tax_identification_number,
          fields.american_tax_identification_number_applied,
          fields.is_international_tax_payer,
          {
            name: 'internationalTaxForms',
            label: 'International tax forms',
            type: 'list',
            fields: [
              fields.international_tax_form_country,
              fields.international_tax_form_id,
              fields.international_tax_form_reason,
            ],
          },
        ],
      },
    ],
    enum: 'CONTACT_AND_BASIC_INFO',
    slug: 'contact-and-basic-info',
  },
};
