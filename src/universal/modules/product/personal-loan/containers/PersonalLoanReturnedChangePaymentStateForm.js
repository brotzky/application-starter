import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { updateLoanBookPaymentsReturned } from 'grow-actions/loan-book/loan-book-payments-returned';
import { Checkbox, FormButton } from '../../../forms/fields/';

class PersonalLoanReturnedChangePaymentStateForm extends Component {
  handleSubmit(data) {
    const { dispatch, email, hideModal, payment } = this.props;
    const body = {
      actions: Object.keys(data).filter(node => node !== 'comment'),
      comment: data.comment,
      email,
      returnedState: 'pending',
    };
    return dispatch(updateLoanBookPaymentsReturned(payment.id, body)).then(() =>
      dispatch(hideModal()),
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
        <Field
          name="CHARGE_50_DOLLARS_RETURNED_ITEM_FEE"
          component={Checkbox}
          label="Charge $50 returned item fee"
          type="submit"
          disabled={submitting}
        />
        <Field
          name="REPRESENT_PAYMENT_TOMORROW"
          component={Checkbox}
          label="Represent payment tommorrow"
          type="submit"
          disabled={submitting}
        />
        <Field
          className="ProfileFormTextarea"
          placeholder="Write your comment (optional)..."
          component="textarea"
          name="comment"
        />
        <FormButton
          buttonText="Change Payment State"
          isSubmitting={submitting}
          disabled={submitting}
        />
      </form>
    );
  }
}

PersonalLoanReturnedChangePaymentStateForm = reduxForm({
  form: 'personal-loan-returned-change-payment-state',
})(PersonalLoanReturnedChangePaymentStateForm);

export default PersonalLoanReturnedChangePaymentStateForm;
