// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field, change } from 'redux-form';

const FormRow = styled.div`
  display: flex;
  justifycontent: space-between;
  margin-bottom: 1.5rem;
  color: #585858;
  font-size: 1.4rem;
  padding: 0 2.4rem;
`;

const FormRowHeader = FormRow.extend`
  font-weight: 500;
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;
  color: #262626;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem 2.4rem 1.4rem 2.4rem;
`;

const FormDescription = styled.div`
  display: flex;
  align-items: center;
  flex: 0.75;
  padding-right: 2.25rem;
`;

const FormViewEdit = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.25;
`;

const RoleCheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + label::before {
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMCkiPgo8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNiwxMiAxMCwxNiAxOCw4IAoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KPC9nPjwvc3ZnPg==');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #448aff;
    border-color: #448aff;
  }
}`;

const RoleCheckBoxLabel = styled.label`
  position: relative;
  cursor: pointer;
  color: #262626;

  &::before {
    display: inline-block;
    width: 24px;
    height: 24px;
    content: '';
    vertical-align: middle;
    border-radius: 50%;
    border: 1px solid #adadad;
    transition: all 200ms ease;
  }
`;

const RolesCreateFormLeftEmpty = styled.div`
  margin-left: 11px;
  color: #adadad;
`;

const RolesCreateFormRightEmpty = styled.div`
  margin-right: 11px;
  color: #adadad;
`;

const RoleCheckBox = props => (
  <div>
    <RoleCheckBoxInput
      {...props.input}
      type="checkbox"
      id={props.input.name}
      required={props.required}
      disabled={props.disabled}
      checked={props.input.value}
    />
    <RoleCheckBoxLabel htmlFor={props.input.name}>
      {props.label}
    </RoleCheckBoxLabel>
  </div>
);

class RolesCreateForm extends Component {
  autofillView = (event, newValue) => {
    const { dispatch, permissions } = this.props;

    // If it's not a new value don't do anything.
    if (!newValue) return null;

    // vewPermission variable looks like "permission.VIEW_USER_DEATILS"
    const viewPermission: string = event.target.name.replace('EDIT', 'VIEW');

    // vewPermission variable looks like "VIEW_USER_DEATILS"
    const viewPermissionEnum = viewPermission.split('.')[1];

    /**
     * Check to see if the viewPermission exists so we don't create something
     * that doesn't exist on the backend.
     */
    const viewPermissionExists: boolean = permissions.some(
      permission =>
        permission.view && permission.view.name === viewPermissionEnum,
    );

    if (viewPermissionExists) {
      dispatch(change('create-role', viewPermission, newValue));
    }
  };

  render() {
    const { permissions } = this.props;

    permissions.sort((a, b) => {
      const descA = a.description.toUpperCase();
      const descB = b.description.toUpperCase();
      if (descA < descB) return -1;
      if (descA > descB) return 1;
      return 0;
    });

    return (
      <form>
        <FormRowHeader>
          <FormDescription>Description</FormDescription>
          <FormViewEdit>
            <div>View</div>
            <div>Edit</div>
          </FormViewEdit>
        </FormRowHeader>

        {permissions.map(permission => (
          <FormRow key={permission.description}>
            <FormDescription>{permission.description}</FormDescription>
            <FormViewEdit>
              {permission.view.name ? (
                <Field
                  name={`permissions.${permission.view.name}`}
                  component={RoleCheckBox}
                  parse={value => !!value}
                />
              ) : (
                <RolesCreateFormLeftEmpty>–</RolesCreateFormLeftEmpty>
              )}
              {permission.edit.name ? (
                <Field
                  name={`permissions.${permission.edit.name}`}
                  component={RoleCheckBox}
                  parse={value => !!value}
                  onChange={this.autofillView}
                />
              ) : (
                <RolesCreateFormRightEmpty>–</RolesCreateFormRightEmpty>
              )}
            </FormViewEdit>
          </FormRow>
        ))}
      </form>
    );
  }
}

RolesCreateForm.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RolesCreateForm = reduxForm({
  form: 'create-role',
})(RolesCreateForm);

RolesCreateForm = connect(state => ({
  creatingRole: state.users.creatingRole,
}))(RolesCreateForm);

export default RolesCreateForm;
