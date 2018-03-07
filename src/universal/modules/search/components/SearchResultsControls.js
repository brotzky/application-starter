import React from 'react';
import { ChevronLeft, ChevronRight, Remove } from '../../ui/icons/';

const SearchResultsControls = props => (
  <div className="SearchResultsControls">
    <div
      className="SearchResultsControls__close"
      onClick={props.clearSearchResults}
    >
      <Remove className="SearchResultsControls__close-icon" />
      <span>Close search</span>
    </div>
    <div className="SearchResultsControls__page">Page {props.page}</div>
    <div className="SearchResultsControls__pagination">
      <button
        type="button"
        className="QueuePagination__button"
        onClick={() => props.handlePagination('previous')}
        disabled={props.isFetching || !props.hasMoreResults('previous')}
        style={{ background: '#448aff' }}
      >
        <ChevronLeft className="QueuePagination__button-icon" />
      </button>
      <button
        type="button"
        className="QueuePagination__button"
        onClick={() => props.handlePagination('next')}
        disabled={props.isFetching | !props.hasMoreResults('next')}
        style={{ background: '#448aff' }}
      >
        <ChevronRight className="QueuePagination__button-icon" />
      </button>
    </div>
  </div>
);

export default SearchResultsControls;
