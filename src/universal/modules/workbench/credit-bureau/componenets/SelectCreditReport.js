import React from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import { Select } from '../../../forms/fields/';

const fieldProps = {
  className: 'CalculatorSidebar',
  submissionErrors: [],
};

const formatOptions = reports =>
  reports.map(report => ({
    name: moment(report.dateRetrieved).format('MMM Do, YYYY, h:mma'),
    value: report.id,
  }));

/**
 * SelectCreditReport is a select option that gets its options populated
 * from the credit-bureau returned data. Users can select a different Reprot
 * which will render in the CreditReport component.
 */
const SelectCreditReport = ({ creditBureau }) => (
  <div className="CreditBureauBody__select">
    <h6 className="CreditBureauBody__header">Select Credit Report</h6>
    <Field
      name="creditReportId"
      component={Select}
      options={formatOptions(creditBureau.reports)}
      value={creditBureau.report && creditBureau.report.id}
      {...fieldProps}
    />
  </div>
);

export default SelectCreditReport;
