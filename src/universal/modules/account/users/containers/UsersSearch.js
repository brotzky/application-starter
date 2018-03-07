import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Select, Text } from '../../../forms/fields/';
import { MagnifyGlass } from '../../../ui/icons/';
import { theme } from '../../../../themes';

export const searchTheme = {
  ...theme,
  fields: {
    flexDirection: 'column',
    marginBottom: '0rem',
  },
  labels: {
    color: '#262626',
    fontSize: '1.4rem',
    width: '100%',
    textTransform: 'initial',
  },
  inputs: {
    border: {
      color: {
        default: 'transparent',
        focus: 'transparent',
      },
      radius: '0',
      style: 'solid',
      width: '0px',
    },
    boxShadow: 'inset 0 1px 0 0 rgba(63,63,68,0.05)',
    color: {
      placeholder: '#969696',
      value: '#262626',
    },
    fontSize: '1.5rem',
    height: '4rem',
    width: '100%',
    padding: '1.2rem',
  },
  select: {
    background: 'linear-gradient(to bottom, #fff, #f9fafb)',
    border: {
      width: '0px',
      style: 'transparent',
    },
    width: '144px',
    svg: {
      height: '1.2rem',
      top: '1.4rem',
    },
  },
};

const UsersSearch = props => {
  const { searchBy } = props;
  const fieldProps = {
    className: 'UsersSearchForm',
  };

  const searchByOptions = [
    { name: 'All categories', value: 'all' },
    { name: 'Name', value: 'name' },
    { name: 'Email', value: 'email' },
    { name: 'Role', value: 'role' },
  ];

  return (
    <ThemeProvider theme={searchTheme}>
      <form className={fieldProps.className} id="search-form">
        <div className={`${fieldProps.className}__bar`}>
          <div className={`${fieldProps.className}__selector`}>
            <Field
              name="searchBy"
              component={Select}
              options={searchByOptions}
              {...fieldProps}
            />
          </div>
          <div
            className={`${fieldProps.className}__input`}
            style={{
              borderTopLeftRadius: '2px',
              borderBottomLeftRadius: '2px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MagnifyGlass className={`${fieldProps.className}__icon`} />
            {searchBy === 'all' && (
              <Field
                {...fieldProps}
                name="all"
                component={Text}
                type="text"
                label={false}
                placeholder="Search users"
              />
            )}
            {searchBy === 'name' && (
              <div className={`${fieldProps.className}__split`}>
                <Field
                  {...fieldProps}
                  name="firstName"
                  component={Text}
                  type="text"
                  label={false}
                  placeholder="First Name"
                />
                <Field
                  {...fieldProps}
                  name="lastName"
                  component={Text}
                  type="text"
                  label={false}
                  placeholder="Last Name"
                />
              </div>
            )}
            {searchBy === 'email' && (
              <Field
                {...fieldProps}
                name="email"
                component={Text}
                type="email"
                label={false}
                placeholder="example@email.com"
              />
            )}
            {searchBy === 'role' && (
              <Field
                {...fieldProps}
                name="role"
                component={Text}
                placeholder="Search role"
                label={false}
              />
            )}
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

const selector = formValueSelector('search-users');

const mapStateToProps = state => ({
  searchValues: state.form['search-users'] && state.form['search-users'].values,
  searchBy: selector(state, 'searchBy'),
});

const UsersSearchForm = reduxForm({
  form: 'search-users',
  initialValues: {
    all: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    searchBy: 'all',
  },
})(UsersSearch);

export default connect(mapStateToProps)(UsersSearchForm);
