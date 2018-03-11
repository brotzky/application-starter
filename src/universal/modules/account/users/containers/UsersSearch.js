import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
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

const UsersSearchFormWrapper = styled.form`
  width: 100%;
  margin-bottom: $base-space;
`;

const UsersSearchFormBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
  color: #262626;
  box-shadow: inset 0 1px 0 0 rgba(63, 63, 68, 0.05);
  width: 100%;
  color: #585858;
  overflow: hidden;
`;

const UsersSearchFormSelector = styled.div`
  border-right: 1px solid #c4c4c4;
`;

const UsersSearchFormInput = styled.div`
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  overflow: hidden;
  display: flex;
  alignitems: center;
  flex: 1;
`;

const StyledMagnifyingGlass = styled(MagnifyGlass)`
  position: relative;
  top: 6px;
  left: 8px;
  fill: #b2b2b2;
  width: 30px;
  height: 30px;
  margin-right: 1rem;
`;

const UsersSearchFormSplit = styled.div`
  display: flex;
  flex: 1;
`;

const UsersSearch = props => {
  const { searchBy } = props;

  const searchByOptions = [
    { name: 'All categories', value: 'all' },
    { name: 'Name', value: 'name' },
    { name: 'Email', value: 'email' },
    { name: 'Role', value: 'role' },
  ];

  return (
    <ThemeProvider theme={searchTheme}>
      <UsersSearchFormWrapper id="search-form">
        <UsersSearchFormBar>
          <UsersSearchFormSelector>
            <Field
              name="searchBy"
              component={Select}
              options={searchByOptions}
            />
          </UsersSearchFormSelector>
          <UsersSearchFormInput>
            <StyledMagnifyingGlass />
            {searchBy === 'all' && (
              <Field
                name="all"
                component={Text}
                type="text"
                label={false}
                placeholder="Search users"
              />
            )}
            {searchBy === 'name' && (
              <UsersSearchFormSplit>
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
              </UsersSearchFormSplit>
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
            {searchBy === 'role' && (
              <Field
                name="role"
                component={Text}
                placeholder="Search role"
                label={false}
              />
            )}
          </UsersSearchFormInput>
        </UsersSearchFormBar>
      </UsersSearchFormWrapper>
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
