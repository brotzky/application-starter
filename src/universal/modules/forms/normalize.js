import { change } from 'redux-form';
import numeral from 'numeral';
import validator from 'validator';
import { insertIntoArray } from 'grow-utils/arrayFormatting';

/**
 * sin
 * Formats xxxxxxxxx into xxx xxx xxx.
 *
 * @param {Event} event The event object from the <input>.
 * @param {Function} dispatch Redux dispatch function that dispatches changes to the store.
 * @param {String} form The name of the form that the field belongs to.
 * @param {String} field The name of the field that the value comes from.
 */
export function sin(event, dispatch, form, field) {
  const value = event.target.value;
  const len = value.length;
  const { keyCode } = event;
  const isArrowKey = keyCode === 37 || keyCode === 39 || keyCode === 13;

  // If backspace is pressed we dispatch the value as normal.
  if (keyCode === 8 || keyCode === 9) {
    return dispatch(change(form, field, value));
  }

  // If something other than a number is pressed we don't dispatch it (unless they hit the arrow keys).
  if (keyCode < 47 && !isArrowKey || keyCode > 57 && !isArrowKey) {
    event.preventDefault();
  }

  // If we have reached 11 characters do not dispatch anything now (unless they hit the arrow keys).
  if (len === 11 && !isArrowKey) {
    event.preventDefault();
  }

  // Add a space after the 3rd char.
  if (len === 3) {
    return dispatch(change(form, field, `${value} `));
  }

  // Add a space after the 7th char.
  if (len === 7) {
    return dispatch(change(form, field, `${value} `));
  }

  // Dispatch value to form.
  return dispatch(change(form, field, value));
}

/**
 * phoneNumber
 * Formats numbers into YYYY/MM/DD.
 *
 * @param {Event} event The event object from the <input>.
 * @param {Function} dispatch Redux dispatch function that dispatches changes to the store.
 * @param {String} form The name of the form that the field belongs to.
 * @param {String} field The name of the field that the value comes from.
 */
export function phoneNumber(event, dispatch, form, field) {
  const value = event.target.value;
  const len = value.length;
  const { keyCode } = event;
  const isArrowKey = keyCode === 37 || keyCode === 39 || keyCode === 13;

  // If backspace is pressed we dispatch the value as normal.
  if (keyCode === 8 || keyCode === 9) {
    return dispatch(change(form, field, value));
  }

  // If something other than a number is pressed we don't dispatch it (unless they hit the arrow keys).
  if (keyCode < 47 && !isArrowKey || keyCode > 57 && !isArrowKey) {
    return event.preventDefault();
  }

  // If we have reached 12 characters do not dispatch anything now (unless they hit the arrow keys).
  if (len === 14 && !isArrowKey) {
    return event.preventDefault();
  }

  if (len === 1 && !value.includes('(')) {
    return dispatch(change(form, field, `(${value}`));
  }

  if (len === 4) {
    return dispatch(change(form, field, `${value}) `));
  }

  // Add the dash after the 7th char.
  if (len === 9) {
    return dispatch(change(form, field, `${value}-`));
  }

  // Dispatch value to form.
  return dispatch(change(form, field, value));
}

/**
 * digitGroupSeparator
 * Takes a number and inserts commas after every thousanth place.
 *
 * @param {String} value The value of the input field.
 * @param {Function} dispatch Redux dispatch function that dispatches changes to the store.
 * @param {String} form The name of the form that the field belongs to.
 * @param {String} field The name of the field that the value comes from.
 * @param {Number} max The maximum character length of the value.
 */
export function digitGroupSeparator(value, dispatch, form, field, max = 64, prefix) {
  // Remove comma from value in order to use it as an integer.
  const unformattedValue = value.replace(/[,]/g, '');
  const noDollarSign = unformattedValue.replace(/\$/g, '');

  if (!value || value === '$') {
     // If {value} evaluates to false we still dispatch it so user can delete all existing characters in input.
    return dispatch(change(form, field, value));
  } else if (!validator.isNumeric(noDollarSign) || !validator.isLength(noDollarSign, { min: 0, max })) {
    // If {value} is not a number or it is longer than {max} characters we do not dispatch it.
    return false;
  } else {
    // If {value} is a number, we format it with a comma and dispatch it.
    return dispatch(change(form, field, numeral(noDollarSign).format(`${prefix}00,0`)));
  }
}

/**
 * numeric
 * Takes a value and only returns it if it is a number.
 *
 * @param {String} value The value of the input field.
 * @param {Function} dispatch Redux dispatch function that dispatches changes to the store.
 * @param {String} form The name of the form that the field belongs to.
 * @param {String} field The name of the field that the value comes from.
 * @param {Number} max The maximum character length of the value.
 */
export function numeric(value, dispatch, form, field, max = 64) {
  if (!value) {
    // If {value} evaluates to false we still dispatch it so user can delete all existing characters in input.
    return dispatch(change(form, field, value));
  } else if (!validator.isNumeric(value) || !validator.isLength(value, { min: 0, max })) {
    return false;
  } else {
    return dispatch(change(form, field, value));
  }
}

/**
 * formatMoney
 * initial formatting for any money value
 *
 * @param {String} value The value of the input field.
 */
export const formatMoney = value => {
  const valueStr = value.toString();
  const len = valueStr.length;
  const noDollarSign = !valueStr.includes('$');

  if (noDollarSign && len > 1) {
    return numeral(valueStr).format('$0,0[.]00');
  }

  return valueStr;
};

/**
 * formatPostal
 * initial and following formatting for Postal Field
 *
 * @param {String} value The value of the input field.
 */
export const formatPostal = value => {
  const valueUpper = value.toUpperCase();
  const valueArray = valueUpper.split('');
  const len = value.length;

  if (len === 4 && !valueArray.includes(' ')) {
    return `${valueUpper.substr(0, 3)} ${valueUpper.substr(3)}`;
  }

  return valueUpper;
};

/**
 * formatPhone
 * initial formatting for any phone value
 *
 * @param {String} value The value of the input field.
 */
export const formatPhone = value => {
  if (typeof value === 'undefined') {
    return value;
  }

  const valueArray = value.split('');
  const len = value.length;

  if (len === 12 && valueArray.includes('+')) {
    const cleanPhone = valueArray.slice(2, valueArray.length);
    const hasOneBracket = insertIntoArray(cleanPhone, 0, '(');
    const hasTwoBracket = insertIntoArray(hasOneBracket, 4, ')');
    const hasOneDash = insertIntoArray(hasTwoBracket, 8, '-').join('');

    return `${hasOneDash.substr(0, 5)} ${hasOneDash.substr(5)}`;
  }

  return value;
};

/**
 * formatDate
 * initial and regular formatting for any date value
 *
 * @param {String} value The value of the input field.
 */
export const formatDate = value => {
  const valueArray = value.split('');
  const noSlashInArray = !valueArray.includes('/');
  const len = value.length;

  if (len === 8 && noSlashInArray) {
    const hasOneSlash = insertIntoArray(valueArray, 4, '/');
    return insertIntoArray(hasOneSlash, 7, '/').join('');
  }

  if (len === 8 && valueArray.lastIndexOf('/') !== 7) {
    return insertIntoArray(valueArray, 7, '/').join('');
  }

  if (len === 5 && noSlashInArray) {
    return insertIntoArray(valueArray, 4, '/').join('');
  }

  return value;
};

/**
 * formatSin
 * initial formatting for any SIN value
 *
 * @param {String} value The value of the input field.
 */
export const formatSin = value => {
  const len = value.length;

  if (len === 9 && !value.includes(' ')) {
    return `${value.substr(0, 3)} ${value.substr(4, 3)} ${value.substr(6, 3)}`;
  }

  return value;
};
