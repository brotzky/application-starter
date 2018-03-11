import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Text } from '../../../forms/fields/';
import { required } from '../../../forms/validation/';
import { capitalizeString } from 'grow-utils/stringFormatting';

class RolesCreateNameForm extends React.PureComponent {
  render() {
    const isCreateRolePage = this.props.pathname === '/account/roles/create';

    return (
      <form>
        <Field
          name="name"
          component={Text}
          label="Role Name"
          validate={required}
          disabled={!isCreateRolePage}
          format={value => capitalizeString(value, ' ', ' ')}
        />
        <Field
          name="description"
          label="Role Description"
          component={Text}
          validate={required}
        />
      </form>
    );
  }
}

RolesCreateNameForm = reduxForm({
  form: 'create-role',
})(RolesCreateNameForm);

RolesCreateNameForm = connect(state => ({
  creatingRole: state.users.creatingRole,
  pathname: state.router.location.pathname,
}))(RolesCreateNameForm);

export default RolesCreateNameForm;
