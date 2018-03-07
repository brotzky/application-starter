import CalculateRevolvingBalance from '../functions/CalculateRevolvingBalance/CalculateRevolvingBalance';
import CalculateInstallmentDebt from '../functions/CalculateInstallmentDebt/CalculateInstallmentDebt';
import CalculateHeloc from '../functions/CalculateHeloc/CalculateHeloc';
import CalculateHousingCost from '../functions/CalculateHousingCost/CalculateHousingCost';

export const fieldProps = {
  form: 'calculator',
  className: 'CalculatorForm',
};

export const fieldData = [
  {
    name: 'revolvingBalances',
    label: 'Revolving Balances',
    calculate: CalculateRevolvingBalance,
    permission: 'EDIT_DSR_CALCULATOR',
    headerLabel: 'Total Balance',
  },
  {
    name: 'installmentDebt',
    label: 'Installment Debt',
    calculate: CalculateInstallmentDebt,
    permission: 'EDIT_DSR_CALCULATOR',
    headerLabel: 'Monthly Payment',
  },
  {
    name: 'housingCost',
    label: 'Housing Cost',
    calculate: CalculateHousingCost,
    permission: 'EDIT_DSR_CALCULATOR',
    headerLabel: 'Monthly Housing',
  },
  {
    name: 'heloc',
    label: 'HELOC',
    calculate: CalculateHeloc,
    permission: 'EDIT_DSR_CALCULATOR',
    headerLabel: 'Total Balance',
  },
];

export const optionsData = [
  {
    revolvingBalances: [
      {
        name: 'Select category',
        value: 0,
        disabled: true,
      },
      {
        name: 'Credit card',
        value: 'CREDIT_CARD',
      },
      {
        name: 'Line of credit',
        value: 'LINE_OF_CREDIT',
      },
      {
        name: 'Overdraft protection',
        value: 'OVERDRAFT_PROTECTION',
      },
      {
        name: 'Other',
        value: 'OTHER',
      },
    ],
  },
  {
    installmentDebt: [
      {
        name: 'Select category',
        value: 0,
        disabled: true,
      },
      {
        name: 'Loan',
        value: 'LOAN',
      },
      {
        name: 'Student Loan',
        value: 'STUDENT_LOAN',
      },
      {
        name: 'Car Loan',
        value: 'AUTO_LOAN',
      },
      {
        name: 'Other',
        value: 'OTHER',
      },
    ],
  },
  {
    housingCost: [
      {
        name: 'Select category',
        value: 0,
        disabled: true,
      },
      {
        name: 'Mortgage',
        value: 'MORTGAGE',
      },
      {
        name: 'Rent',
        value: 'RENT',
      },
      {
        name: 'Strata',
        value: 'STRATA',
      },
      {
        name: 'Property Tax',
        value: 'PROPERTY_TAX',
      },
      {
        name: 'Other',
        value: 'OTHER',
      },
    ],
  },
  {
    heloc: [
      {
        name: 'HELOC',
        value: 'HELOC',
      },
    ],
  },
];

export const sidebarOptionsData = [
  {
    name: 'Daily',
    value: 'DAILY',
  },
  {
    name: 'Weekly',
    value: 'WEEKLY',
  },
  {
    name: 'Bi-Weekly',
    value: 'BI_WEEKLY',
  },
  {
    name: 'Semi-Monthly',
    value: 'SEMI_MONTHLY',
  },
  {
    name: 'Monthly',
    value: 'MONTHLY',
  },
];
