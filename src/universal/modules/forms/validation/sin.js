import SocialInsuranceNumber from 'social-insurance-number';

export default function(value) {
  if (!value) {
    return undefined;
  }
  const sin = new SocialInsuranceNumber(value);

  return sin.isValid()
    ? undefined
    : {
        defaultMessage: 'must be valid',
        id: 'form.errors.invalidSin',
        values: {},
      };
}
