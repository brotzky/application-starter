// Tax-Free GIC

import baseAccountConfig from './base/base.config';
import fields from '../../../../modules/forms/utils/fieldDefinitions';

const config = {
  ...baseAccountConfig,
  'contact-and-basic-info': {
    groups: [
      ...baseAccountConfig['contact-and-basic-info'].groups,
      {
        header: 'Term and Interest Frequency',
        fields: [
          fields.term_length,
          fields.payout_frequency,
          fields.interest_transfer,
        ],
      },
    ],
  },
};

export default config;
