import moment from 'moment';

export default function(value) {
  if (value.length < 8) {
    return {
      defaultMessage: 'must match YYYY/MM/DD',
      id: 'form.errors.dob',
      values: {},
    };
  }

  const momentValue = moment(value);

  if (momentValue.isValid() === false) {
    return {
      defaultMessage: 'must be a valid date',
      id: 'form.errors.dobInvalid',
      values: {},
    };
  }

  // Check if the person is 18 or older
  if (momentValue.isAfter(moment().subtract(18, 'y'))) {
    return {
      defaultMessage: 'must be at least 18 years old',
      id: 'form.errors.dobToYoung',
      values: {},
    };
  }

  // Check if value is older than 125 years.
  if (momentValue.isBefore(moment().subtract(125, 'y'))) {
    return {
      defaultMessage: 'must not be over 125 years ago',
      id: 'form.errors.dobToOld',
      values: {},
    };
  }
  return undefined;
}
