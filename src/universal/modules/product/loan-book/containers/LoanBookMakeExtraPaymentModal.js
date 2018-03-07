import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, reduxForm } from 'redux-form';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import numeral from 'numeral';
import { createLoanBookPayment } from 'grow-actions/loan-book/loan-book-payments';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { Text } from '../../../forms/fields/Text';
import Spinner from '../../../ui/spinner/spinner';

const validate = values => {
  const errors = {};
  if (!values.paymentDate) {
    errors.paymentDate = true;
  }

  if (!values.paymentType) {
    errors.paymentType = true;
  }
  return errors;
};

class LoanBookMakeExtraPaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, date: null, submitError: false };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.props.dispatch(
      change('make-payment', 'paymentDate', moment(date).toISOString()),
    );
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  handleSubmit(data) {
    const { dispatch, productId } = this.props;
    const body = Object.assign({}, data, {
      paymentDate: data.paymentDate.replace(/(\.000)/g, ''),
    });
    if (data.paymentAmount) {
      body.paymentAmount = `${numeral(data.paymentAmount)._value}`;
    }
    return dispatch(createLoanBookPayment(productId, body));
  }

  render() {
    const { focused, date, submitError } = this.state;
    const {
      dispatch,
      handleSubmit,
      paymentType,
      submitFailed,
      submitting,
      createdNewPayment,
    } = this.props;

    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <h3 className="u-heading-5">Make Extra Payment</h3>
        {createdNewPayment ? (
          <div style={{ width: '763px', height: '280px' }}>
            <p>
              We have successfully received your request. Please allow up to 24
              hours for us to complete your request. Thank you.
            </p>
            <button
              type="button"
              className="c-button c-button--pri"
              onClick={() => dispatch(hideModal())}
            >
              <span>Ok</span>
            </button>
          </div>
        ) : (
          <div>
            <p>Select what type of payment this is.</p>
            <form
              className="LoanBookEditPaymentScheduleForm"
              onSubmit={handleSubmit(data => this.handleSubmit(data))}
            >
              <div className="LoanBookEditPaymentScheduleForm__group">
                <Field
                  component="input"
                  id="extraPayment"
                  type="radio"
                  name="paymentType"
                  value="Extra Payment"
                />
                <label htmlFor="extraPayment">Extra Payment</label>
                <Field
                  component="input"
                  id="earlyRepayment"
                  type="radio"
                  name="paymentType"
                  value="Early Repayment"
                />
                <label htmlFor="earlyRepayment">Early Repayment</label>
              </div>
              {paymentType === 'Extra Payment' && (
                <div>
                  <span>Payment amount: </span>
                  <Field
                    allowDecimal
                    component={Text}
                    name="paymentAmount"
                    id="paymentAmount"
                    className="LoanBookEditPaymentScheduleForm"
                  />
                </div>
              )}
              <div className="LoanBookEditPaymentScheduleForm__preview">
                <span>Choose payment date:</span>
                <SingleDatePicker
                  id="dateinput"
                  date={date}
                  focused={focused}
                  isDayBlocked={day => {
                    const today = moment();
                    if (day.isBefore(today.subtract('d', 1))) {
                      return true;
                    }
                  }}
                  numberOfMonths={1}
                  onDateChange={this.onDateChange}
                  onFocusChange={this.onFocusChange}
                />
              </div>
              {submitFailed || submitError ? (
                <p className="LoanBookEditPaymentScheduleForm__error">
                  Please select a valid payment type and date.
                </p>
              ) : null}
              <div>
                <button type="submit" className="c-button c-button--pri">
                  <span>{submitting ? <Spinner /> : 'Confirm'}</span>
                </button>
                <button
                  type="button"
                  className="c-button c-button--sec"
                  onClick={() => dispatch(hideModal())}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </ModalContent>
    );
  }
}

const selector = formValueSelector('make-payment');

const mapStateToProps = state => ({
  createdNewPayment: state.product.loanBookPayments.createdNewPayment,
  isCreatingNewPayment: state.product.loanBookPayments.isCreatingNewPayment,
  paymentType: selector(state, 'paymentType'),
});

LoanBookMakeExtraPaymentModal = reduxForm({
  form: 'make-payment',
  initialValues: {
    paymentDate: '',
    paymentType: '',
  },
  validate,
})(LoanBookMakeExtraPaymentModal);

export default connect(mapStateToProps)(LoanBookMakeExtraPaymentModal);
