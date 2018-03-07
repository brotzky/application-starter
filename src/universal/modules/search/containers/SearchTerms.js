import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class SearchTerms extends Component {
  static propTypes = {
    className: PropTypes.string,
    updateData: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { updateData } = this.props;

    const body = Object.assign({}, formData, {
      start: 0,
      end: 10,
    });

    switch (body.searchBy) {
      case 'name':
        body.email = '';
        body.phone = '';
        body.id = '';
        break;
      case 'email':
        body.firstName = '';
        body.lastName = '';
        body.phone = '';
        body.id = '';
        break;
      case 'phone':
        body.email = '';
        body.firstName = '';
        body.lastName = '';
        body.phone = formData.phone && formData.phone.replace(/[()-\s]/g, '');
        body.id = '';
        break;
      case 'id':
        body.firstName = '';
        body.lastName = '';
        body.phone = '';
        body.email = '';
        break;
      default:
        body.email = '';
        body.phone = '';
        body.id = '';
    }

    if (body.hasOwnProperty('searchBy')) {
      delete body.searchBy;
    }

    const someQueryExists = Object.keys(body).some(
      k => body[k] && body[k].length > 0,
    );

    if (!someQueryExists) {
      return false;
    }

    return updateData({
      page: 1,
      queryParams: body,
    });
  };

  render() {
    return (
      <div className={`SearchTerms ${this.props.className || ''}`}>
        <div className="SearchTerms__wrapper">
          <SearchForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default SearchTerms;
