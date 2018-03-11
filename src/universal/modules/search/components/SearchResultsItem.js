import React from 'react';
import styled from 'styled-components';

const SearchResultsItemWrapper = styled.li`
  padding: 0 1.9rem;
  animation: fadeIn 0.25s ease(out) forwards;

  &:nth-child(even) {
    background: #fafafa;
  }
`;

const SearchResultsItemLink = styled.span`
  display: flex;
  cursor: pointer;
`;

const SearchResultsItemCell = styled.span`
  display: inline-block;
  width: 222px;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  color: #262626;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const SearchResultsItem = ({ handleResultClick, item }) => (
  <SearchResultsItemWrapper>
    <SearchResultsItemLink onClick={() => handleResultClick(item.id)}>
      <SearchResultsItemCell>
        {item.firstName || ''} {item.lastName || ''}
      </SearchResultsItemCell>
      <SearchResultsItemCell>{item.email}</SearchResultsItemCell>
    </SearchResultsItemLink>
  </SearchResultsItemWrapper>
);

export default SearchResultsItem;
