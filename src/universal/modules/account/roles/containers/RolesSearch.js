import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Select, Text } from '../../../forms/fields/';
import { MagnifyGlass } from '../../../ui/icons/';
import { searchTheme } from '../../users/containers/UsersSearch';

const UserSearchForm = styled.form`
  width: 100%;
  margin-bottom: 2.4rem;
`;

const UserSearhFormBar = styled.div`
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

const UserSearchFormSelector = styled.div`
  border-right: 1px solid #c4c4c4;
`;

const UserSearchFormInput = styled.div`
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex: 1;
`;

const MagnifyGlassIcon = styled(MagnifyGlass)`
  position: relative;
  left: 9px;
  fill: #b2b2b2;
  height: 19px;
`;

let UsersSearch = props => {
  const { searchBy } = props;

  const searchByOptions = [
    { name: 'All Categories', value: 'all' },
    { name: 'Role', value: 'role' },
    { name: 'Description', value: 'description' },
  ];

  return (
    <ThemeProvider theme={searchTheme}>
      <UserSearchForm id="search-form">
        <UserSearhFormBar>
          <UserSearchFormSelector>
            <Field
              name="searchBy"
              component={Select}
              placeholder="Search roles"
              options={searchByOptions}
            />
          </UserSearchFormSelector>
          <UserSearchFormInput>
            <MagnifyGlassIcon />
            {searchBy === 'all' && (
              <Field
                name="all"
                component={Text}
                type="text"
                label={false}
                placeholder="Search roles"
              />
            )}
            {searchBy === 'role' && (
              <Field name="role" component={Text} label={false} />
            )}
            {searchBy === 'description' && (
              <Field name="description" component={Text} label={false} />
            )}
          </UserSearchFormInput>
        </UserSearhFormBar>
      </UserSearchForm>
    </ThemeProvider>
  );
};

const selector = formValueSelector('search-roles');

const mapStateToProps = state => ({
  searchValues: state.form['search-roles'] && state.form['search-roles'].values,
  searchBy: selector(state, 'searchBy'),
});

UsersSearch = reduxForm({
  form: 'search-roles',
  initialValues: {
    all: '',
    description: '',
    role: '',
    searchBy: 'all',
  },
})(UsersSearch);

export default connect(mapStateToProps)(UsersSearch);
