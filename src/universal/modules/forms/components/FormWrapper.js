// @flow
import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';

class Form extends PureComponent {
  render() {
    const { children, handleSubmit } = this.props;
    return <form onSubmit={handleSubmit}>{children}</form>;
  }
}

Form = reduxForm({
  destroyOnUnmount: false,
})(Form);

export default Form;
