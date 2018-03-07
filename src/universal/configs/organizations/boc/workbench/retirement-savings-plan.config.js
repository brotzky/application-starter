// RRSP Savings Account

import baseAccountConfig from './base/base.config';
import fields from '../../../../modules/forms/utils/fieldDefinitions';

const config = {
  ...baseAccountConfig,
  'contact-and-basic-info': {
    groups: [
      ...baseAccountConfig['contact-and-basic-info'].groups,
      {
        header: 'Beneficiary Info',
        fields: [
          {
            name: 'beneficiaries',
            label: 'Beneficiary Information',
            fields: [
              {
                ...fields.firstName,
                name: 'beneFirstName',
                label: 'Beneficiary First Name',
                type: 'text',
              },
              {
                ...fields.lastName,
                name: 'beneLastName',
                label: 'Beneficiary Last Name',
                type: 'text',
              },
              {
                ...fields.beneficiary_allocation,
                name: 'beneAllocation',
                label: 'Beneficiary Allocation',
              },
              {
                ...fields.beneficiary_relationship,
                name: 'beneRelationship',
                label: 'Beneficiary Relationship',
              },
              {
                ...fields.beneficiary_dob,
                name: 'beneDateOfBirth',
                label: 'Beneficiary Date of Birth',
              },
            ],
            type: 'list',
          },
        ],
      },
    ],
  },
};

export default config;
