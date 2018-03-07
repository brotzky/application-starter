import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, reduxForm } from 'redux-form';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { createLoanBookPaymentCollections } from 'grow-actions/loan-book/loan-book-payments-collections';
import { Checkbox, FormButton } from '../../../forms/fields/';
import { FadeIn } from '../../../ui/transitions/';

const subOptionStyle = {
  borderLeft: '1px solid #e3e3e3',
  marginLeft: '3.5rem',
  paddingLeft: '1.5rem',
};

const choosePaymentDateStyle = {
  borderLeft: '1px solid #e3e3e3',
  marginLeft: '3.5rem',
  paddingLeft: '1.5rem',
  position: 'relative',
  top: '-1.5rem',
};

class LoanBookCollectionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedDelayPayment: false,
      focusedRepresentPayment: false,
      dateDelayPayment: moment(),
      dateRepresentPayment: moment(),
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date, dateKey, field) {
    this.props.dispatch(
      change('loan-book-collections', field, date.toISOString()),
    );
    this.setState({
      [dateKey]: date,
    });
  }

  onFocusChange({ focused }, focusKey) {
    this.setState({
      [focusKey]: focused,
    });
  }

  handleSubmit(data) {
    const { dispatch, email, paymentId } = this.props;
    const keysToRemoveInActions = [
      'comment',
      'MARK_PAYMENT_AS_RETURNED',
      'OTHER',
    ];
    const body = {
      actions: Object.keys(data).filter(
        node => data[node] && !keysToRemoveInActions.includes(node),
      ),
      comment: data.comment || null,
      email,
    };

    if (data.DELAY_PAYMENT && this.state.dateDelayPayment) {
      body.delayPaymentDate = this.state.dateDelayPayment
        .toISOString()
        .replace(/.000z/, '');
    }

    if (data.REPRESENT_PAYMENT && this.state.dateRepresentPayment) {
      body.representPaymentDate = this.state.dateRepresentPayment
        .toISOString()
        .replace(/.000z/, '');
    }

    return dispatch(createLoanBookPaymentCollections(paymentId, body));
  }

  render() {
    const {
      dateDelayPayment,
      dateRepresentPayment,
      focusedDelayPayment,
      focusedRepresentPayment,
    } = this.state;
    const {
      delayPayment,
      handleSubmit,
      markPaymentAsReturned,
      other,
      representPayment,
      submitting,
    } = this.props;

    return (
      <form
        style={{ marginBottom: '1.5rem' }}
        onSubmit={handleSubmit(data => this.handleSubmit(data))}
        id="loan-book-collections-form"
      >
        <Field
          name="SKIP_PAYMENT"
          component={Checkbox}
          label="Skip Payment"
          disabled={submitting}
        />
        <Field
          name="INTEREST_ONLY_PAYMENT"
          component={Checkbox}
          label="Interest Only Payment"
          disabled={submitting}
        />
        <Field
          name="DELAY_PAYMENT"
          component={Checkbox}
          label="Delay Payment"
          disabled={submitting}
        />
        <FadeIn>
          {delayPayment && (
            <div style={choosePaymentDateStyle}>
              <span>Choose new payment date:</span>
              <SingleDatePicker
                id="dateinput"
                date={dateDelayPayment}
                focused={focusedDelayPayment}
                numberOfMonths={1}
                onDateChange={d =>
                  this.onDateChange(d, 'dateDelayPayment', 'DELAY_PAYMENT')}
                onFocusChange={f =>
                  this.onFocusChange(f, 'focusedDelayPayment')}
              />
            </div>
          )}
        </FadeIn>
        <Field
          name="MARK_PAYMENT_AS_RETURNED"
          component={Checkbox}
          label="Mark Payment as Returned"
          disabled={submitting}
        />
        <FadeIn>
          {markPaymentAsReturned && (
            <div style={subOptionStyle}>
              <Field
                name="CHARGE_50_DOLLARS_RETURNED_ITEM_FEE"
                component={Checkbox}
                label="Charge $50 returned item fee"
                disabled={submitting}
              />
              <Field
                name="REPRESENT_PAYMENT"
                component={Checkbox}
                label="Represent payment"
                disabled={submitting}
              />
              <FadeIn>
                {representPayment && (
                  <div style={choosePaymentDateStyle}>
                    <span>Represent payment on:</span>
                    <SingleDatePicker
                      id="dateinput2"
                      date={dateRepresentPayment}
                      focused={focusedRepresentPayment}
                      numberOfMonths={1}
                      onDateChange={d =>
                        this.onDateChange(
                          d,
                          'dateRepresentPayment',
                          'REPRESENT_PAYMENT',
                        )}
                      onFocusChange={f =>
                        this.onFocusChange(f, 'focusedRepresentPayment')}
                    />
                  </div>
                )}
              </FadeIn>
            </div>
          )}
        </FadeIn>
        <Field
          name="OTHER"
          component={Checkbox}
          label="Other"
          disabled={submitting}
        />
        {other && (
          <Field
            className="ProfileFormTextarea"
            placeholder="Please enter the other thing you want..."
            component="textarea"
            name="comment"
          />
        )}
        <FormButton
          buttonText="Send Request"
          isSubmitting={submitting}
          disabled={submitting}
        />
      </form>
    );
  }
}

const selector = formValueSelector('loan-book-collections');

const mapStateToProps = state => ({
  delayPayment: selector(state, 'DELAY_PAYMENT'),
  markPaymentAsReturned: selector(state, 'MARK_PAYMENT_AS_RETURNED'),
  other: selector(state, 'OTHER'),
  representPayment: selector(state, 'REPRESENT_PAYMENT'),
});

LoanBookCollectionsForm = reduxForm({
  form: 'loan-book-collections',
})(LoanBookCollectionsForm);

export default connect(mapStateToProps)(LoanBookCollectionsForm);
