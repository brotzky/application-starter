import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, reduxForm, stopSubmit } from 'redux-form';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { createLoanBookPaymentSchedule } from 'grow-actions/loan-book/loan-book-payment-schedule';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { capitalizeString } from 'grow-utils/stringFormatting';
import Spinner from '../../../ui/spinner/spinner';
import { FadeIn } from '../../../ui/transitions/';

const paymentFrequencies = new Map();
paymentFrequencies.set('Daily', 1);
paymentFrequencies.set('Weekly', 7);
paymentFrequencies.set('Bi-Weekly', 14);
paymentFrequencies.set('Semi-Monthly', 15);
paymentFrequencies.set('Monthly', 30);

const validate = values => {
  const errors = {};
  if (!values.paymentFrequency) {
    errors.paymentFrequency = 'Please select a valid payment schedule.';
  }

  if (!values.firstPaymentDate) {
    errors.firstPaymentDate = 'Please select a valid starting date.';
  }
  return errors;
};

class LoanBookEditPaymentScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, date: null, submitError: false };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.props.dispatch(change('edit-payment', 'firstPaymentDate', moment(date).toISOString()));
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  getLastPaymentDate(dates) {
    const pastDates = dates.filter(d => new Date(d.expectedPaymentDateTimeInUtc).valueOf() < new Date().valueOf());
    return pastDates.length > 0 && moment(new Date(pastDates[pastDates.length - 1].expectedPaymentDateTimeInUtc));
  }

  getMaxPaymentDate(prevDate, freq, amt = 1.5) {
    if (freq === 'daily') { amt = 3 }  // eslint-disable-line
    const f = paymentFrequencies.get(freq);
    return moment(prevDate).subtract(1, 'd').add((f * amt), 'd');
  }

  handleSubmit(data) {
    const { dispatch, productId } = this.props;
    if (!data.firstPaymentDate) {
      this.setState({ submitError: true });
      return dispatch(stopSubmit('edit-payment', { firstPaymentDate: 'need one' }));
    } else {
      const body = Object.assign({}, data, {
        firstPaymentDate: data.firstPaymentDate.replace(/(\.000)/g, ''),
      });
      return dispatch(createLoanBookPaymentSchedule(productId, body));
    }
  }

  render() {
    const { focused, date, submitError } = this.state;
    const { firstPaymentDate, dispatch, handleSubmit, paymentFrequency, submitFailed, submitting } = this.props;
    const { payments, createdNewPaymentSchedule } = this.props.paymentSchedule;

    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}>
        <h3 className="u-heading-5">Edit Payment Schedule</h3>
        {
          createdNewPaymentSchedule
          ? <div style={{ width: '763px', height: '280px' }}>
              <p>{paymentFrequency} payment schedule will take effect on {moment(firstPaymentDate).format('MMM Do, YYYY')}.</p>
              <button type="button" className="c-button c-button--pri" onClick={() => dispatch(hideModal())}><span>Ok</span></button>
            </div>
          : <div>
              <p>Select which type of payment schedule you would like to switch to.</p>
              <form className="LoanBookEditPaymentScheduleForm" onSubmit={handleSubmit(data => this.handleSubmit(data))}>
                <div className="LoanBookEditPaymentScheduleForm__group">
                  <Field component="input" id="monthly" type="radio" name="paymentFrequency" value="Monthly" />
                  <label htmlFor="monthly">Monthly</label>
                  <Field component="input" id="semi-monthly" type="radio" name="paymentFrequency" value="Semi-Monthly" />
                  <label htmlFor="semi-monthly">Semi-monthly</label>
                  <Field component="input" id="bi-weekly" type="radio" name="paymentFrequency" value="Bi-Weekly" />
                  <label htmlFor="bi-weekly">Bi-weekly</label>
                  <Field component="input" id="weekly" type="radio" name="paymentFrequency" value="Weekly" />
                  <label htmlFor="weekly">Weekly</label>
                  <Field component="input" id="daily" type="radio" name="paymentFrequency" value="Daily" />
                  <label htmlFor="daily">Daily</label>
                </div>
                {paymentFrequency && <FadeIn><div className="LoanBookEditPaymentScheduleForm__preview">I would like to change the payment schedule from <span>{payments[0].scheduleType}</span> to <span className="LoanBookEditPaymentScheduleForm__preview-frequency">{capitalizeString(paymentFrequency, '_', '-')}</span> starting on
                  <SingleDatePicker
                    id="dateinput"
                    date={date}
                    focused={focused}
                    isDayBlocked={day => {
                      const today = moment();
                      if (day.isBefore(today.subtract('d', 1))) { return true; }
                    }}
                    numberOfMonths={1}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange} />.
                </div></FadeIn>}
                {submitFailed || submitError ? <p className="LoanBookEditPaymentScheduleForm__error">Please select a valid payment option and starting date.</p> : null}
                <p><em>Payment changes will take effect the following business day.</em></p>
                <div>
                  <button type="submit" className="c-button c-button--pri"><span>{submitting ? <Spinner /> : 'Confirm'}</span></button>
                  <button type="button" className="c-button c-button--sec" onClick={() => dispatch(hideModal())}><span>Cancel</span></button>
                </div>
              </form>
            </div>
        }
      </ModalContent>
    );
  }
}

const selector = formValueSelector('edit-payment');

const mapStateToProps = state => ({
  paymentSchedule: state.product.loanBookPayments,
  firstPaymentDate: selector(state, 'firstPaymentDate'),
  paymentFrequency: selector(state, 'paymentFrequency'),
});

LoanBookEditPaymentScheduleModal = reduxForm({
  form: 'edit-payment',
  initialValues: {
    firstPaymentDate: '',
    paymentFrequency: '',
  },
  validate,
})(LoanBookEditPaymentScheduleModal);

export default connect(mapStateToProps)(LoanBookEditPaymentScheduleModal);
