import numeral from 'numeral';
import moment from 'moment';

// from '$1,234.56' to '1234.56'
const normalizeNumber = num => {
  if (num) {
    return numeral(num)
      .value()
      .toString()
      .substring(0, 8);
  }
};

/**
 * fillInTheBlanks
 * @param {Object} data Object of the DSR calculator
 * This will fill in all the blanks and build a new
 * array to be merged into the final API data
 */
const fillInTheBlanks = data => {
  const builtArray = [];
  const dataFilters = [
    'housingCost',
    'revolvingBalances',
    'heloc',
    'installmentDebt',
  ];

  // Go over each key and create duplicate from given object
  dataFilters
    .map(filter => {
      if (data[filter]) {
        return { [filter]: data[filter] };
      }
    })
    .map(filter => {
      for (const key of Object.keys(filter)) {
        const arr = filter[key].map(obj =>
          // eslint-disable-line no-loop-func
          /**
         * Add in amount, category, description for API
         * since it is require to have all the keys for the
         * call to work
         */
          ({
            amount: normalizeNumber(obj.amount) || 0,
            category: obj.category || '',
            description: obj.description || '',
            source: obj.source || 'MANUAL',
          }),
        );

        // push updated values int oa single array
        builtArray.push({ [key]: arr });
      }
    });

  // return array of all properly normalized data
  return builtArray;
};

export const configCalcDataForAPI = (data, dsrData) => {
  let finalData = {};
  const customKeys = fillInTheBlanks(data);

  const calculator = {
    calculator: {
      annualGross: normalizeNumber(data.annualGross) || '0',
      annualNet: normalizeNumber(data.annualNet) || '0',
      dateLastModified: '',
      payFrequency: data.payFrequency || '',
      gdsr: parseFloat(dsrData.GDSR.toFixed(8)).toString() || '0',
      gdsrMax: parseFloat(dsrData.GDSR.toFixed(8)).toString() || '0',
      lastPayDate: data.lastPayDate,
      monthlyGross: normalizeNumber(data.monthlyGross) || '0',
      monthlyIncome: normalizeNumber(data.monthlyIncome) || '0',
      monthlyNet: normalizeNumber(data.monthlyIncome) || '0',
      name:
        `${moment().format('MMM Do YYYY')} - ${data.calculatorName}` ||
        `${moment().format('MMM Do YYYY')}`,
      tdsr: parseFloat(dsrData.TDSR.toFixed(8)).toString() || '0',
      tdsrMax: parseFloat(dsrData.TDSR.toFixed(8)).toString() || '0',
      udsr: parseFloat(dsrData.UDSR.toFixed(8)).toString() || '0',
      udsrMax: parseFloat(dsrData.UDSR.toFixed(8)).toString() || '0',
      yearToDateGross: normalizeNumber(data.yearToDateGross) || '0',
      yearToDateNet: normalizeNumber(data.yearToDateNet) || '0',
    },
  };

  // combine normalized values and regular data
  for (let i = 0; i < customKeys.length; i++) {
    finalData = Object.assign(calculator.calculator, customKeys[i]);
  }

  return finalData;
};
