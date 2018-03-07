import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { theme } from '../../../themes';
import { FormButton, Phone, Select, Text } from '../../forms/fields/';
import { MagnifyGlass } from '../../ui/icons/';

const SearchBarTheme = {
  ...theme,
  inputs: {
    border: {
      color: {
        default: 'transparent',
        focus: 'transparent',
      },
      radius: '0',
    },
    boxShadow: 'none',
    color: {
      placeholder: '#969696',
      value: '#262626',
    },
    fontSize: '1.4rem',
    height: '3.2rem',
    width: '100%',
    padding: '1.2rem',
  },
  select: {
    background: 'linear-gradient(to bottom, #fff, #f9fafb)',
    border: {
      width: '1px',
      style: 'solid',
      radius: '2px',
    },
    svg: {
      height: '1.2rem',
      top: '1.1rem',
    },
  },
};

let SearchBar = props => {
  const { handleSubmit, searchBy, submitting } = props;
  const fieldProps = {
    className: 'SearchForm',
  };

  const searchByOptions = [
    { name: 'Name', value: 'name' },
    { name: 'Email', value: 'email' },
    { name: 'Phone', value: 'phone' },
    { name: 'App ID', value: 'id' },
  ];

  return (
    <ThemeProvider theme={SearchBarTheme}>
      <form
        onSubmit={handleSubmit}
        className={fieldProps.className}
        id="search-form"
      >
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
            }}
          >
            {(searchBy === 'name' || searchBy === undefined) && (
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

            {searchBy === 'phone' && (
              <Field
                {...fieldProps}
                name="phone"
                component={Phone}
                label={false}
              />
            )}

            {searchBy === 'id' && (
              <Field
                {...fieldProps}
                name="id"
                component={Text}
                label={false}
                placeholder="application id"
              />
            )}
          </div>

          <div className={`${fieldProps.className}__submit-button`}>
            <Field
              {...fieldProps}
              name="submit"
              component={FormButton}
              buttonText={
                <MagnifyGlass className="Topbar__search-trigger-icon" />
              }
              type="submit"
            />
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

const selector = formValueSelector('search');

const mapStateToProps = state => ({
  search: state.search,
  searchBy: selector(state, 'searchBy'),
});

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  searchBy: PropTypes.string,
};

SearchBar.defaultProps = {
  searchBy: 'name',
};

SearchBar = reduxForm({
  form: 'search',
  initialValues: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    appId: '',
    searchBy: 'name',
  },
})(SearchBar);

export default connect(mapStateToProps)(SearchBar);
