import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Select, Text } from '../../../forms/fields/';
import { MagnifyGlass } from '../../../ui/icons/';
import { searchTheme } from '../../users/containers/UsersSearch';

let UsersSearch = props => {
  const { handleSubmit, searchBy } = props;
  const fieldProps = {
    className: 'UsersSearchForm',
  };

  const searchByOptions = [
    { name: 'All Categories', value: 'all' },
    { name: 'Role', value: 'role' },
    { name: 'Description', value: 'description' },
  ];

  return (
    <ThemeProvider theme={searchTheme}>
      <form className={fieldProps.className} id="search-form">
        <div className={`${fieldProps.className}__bar`}>
          <div className={`${fieldProps.className}__selector`}>
            <Field
              name="searchBy"
              component={Select}
              placeholder="Search roles"
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
                placeholder="Search roles"
              />
            )}
            {searchBy === 'role' && (
              <Field
                {...fieldProps}
                name="role"
                component={Text}
                label={false}
              />
            )}
            {searchBy === 'description' && (
              <Field
                {...fieldProps}
                name="description"
                component={Text}
                label={false}
              />
            )}
          </div>
        </div>
      </form>
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
