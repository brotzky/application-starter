import React from 'react';

const SearchResultsItem = ({ handleResultClick, item }) =>
  <li className="SearchResultsItem">
    <span onClick={() => handleResultClick(item.id)} className="SearchResultsItem__link">
      <span className="SearchResultsItem__cell">
        {item.firstName || ''} {item.lastName || ''}
      </span>
      <span className="SearchResultsItem__cell">
        {item.email}
      </span>
    </span>
  </li>;

export default SearchResultsItem;
