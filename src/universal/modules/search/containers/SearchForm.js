import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { theme } from '../../../themes';
import { FormButton, Phone, Select, Text } from '../../forms/fields/';
import { MagnifyGlass } from '../../ui/icons/';

const SearchForm = styled.form`
  max-width: 740px;
  width: 100%;
  margin: 0 auto;
`;
const SearchFormBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const SearchFormSplit = styled.div`
  display: flex;
  flex: 1;
`;
const SearchFormSelector = styled.div`
  width: 108px;
  position: relative;
  right: -3px;
`;
const SearchFormInput = styled.div`
  flex: 1;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  overflow: hidden;
`;
const StyledMagGlass = styled(MagnifyGlass)`
  position: relative;
  top: -2px;
  fill: #717070;
`;

const StyledFormButton = styled.div`
  background: #f0f0f0;
  box-shadow: 0 1px 0 rgba(black, 0.1);
  border-radius: 0;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  height: 32px;
  padding: 0;
  min-height: auto;
  min-width: 70px;
  margin: 0;
  overflow: hidden;
`;

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
  const { handleSubmit, searchBy } = props;

  const searchByOptions = [
    { name: 'Name', value: 'name' },
    { name: 'Email', value: 'email' },
    { name: 'Phone', value: 'phone' },
    { name: 'App ID', value: 'id' },
  ];

  return (
    <ThemeProvider theme={SearchBarTheme}>
      <SearchForm onSubmit={handleSubmit} id="search-form">
        <SearchFormBar>
          <SearchFormSelector>
            <Field
              name="searchBy"
              component={Select}
              options={searchByOptions}
            />
          </SearchFormSelector>
          <SearchFormInput
            style={{
              borderTopLeftRadius: '2px',
              borderBottomLeftRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {(searchBy === 'name' || searchBy === undefined) && (
              <SearchFormSplit>
                <Field
                  name="firstName"
                  component={Text}
                  type="text"
                  label={false}
                  placeholder="First Name"
                />
                <Field
                  name="lastName"
                  component={Text}
                  type="text"
                  label={false}
                  placeholder="Last Name"
                />
              </SearchFormSplit>
            )}

            {searchBy === 'email' && (
              <Field
                name="email"
                component={Text}
                type="email"
                label={false}
                placeholder="example@email.com"
              />
            )}

            {searchBy === 'phone' && (
              <Field name="phone" component={Phone} label={false} />
            )}

            {searchBy === 'id' && (
              <Field
                name="id"
                component={Text}
                label={false}
                placeholder="application id"
              />
            )}
          </SearchFormInput>

          <StyledFormButton>
            <Field
              name="submit"
              component={FormButton}
              buttonText={<StyledMagGlass />}
              type="submit"
              appearance="transparent"
            />
          </StyledFormButton>
        </SearchFormBar>
      </SearchForm>
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
  destroyOnUnmount: false,
})(SearchBar);

export default connect(mapStateToProps)(SearchBar);
