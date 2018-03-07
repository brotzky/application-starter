import React, { Component } from 'react';
import moment from 'moment';
import { ChevronDown } from '../../../../ui/icons/';

class CreditScoreGraphController extends Component {
  render() {
    const { years, months, handleFilterChange } = this.props;
    return (
      <div className="GraphFilters">
        <div className="GraphFilters__item">
          <label className="GraphFilters__label" htmlFor="GraphScale">Y-axis scale</label>
          <select
            id="GraphScale"
            className="GraphFilters__select"
            onChange={event => handleFilterChange('scale', event.target.value)}>
            <option value="" disabled>Select scale</option>
            <option value="STANDARD">Standard</option>
            <option value="ZOOMED">Zoomed</option>
          </select>
          <ChevronDown className="GraphFilters__arrow" />
        </div>
        <div className="GraphFilters__item">
          <label className="GraphFilters__label" htmlFor="GraphYear">Year</label>
          <select
            id="GraphYear"
            className="GraphFilters__select"
            onChange={event => handleFilterChange('year', event.target.value)}>
            <option value="" disabled>Select year</option>
            <option value="6">Last 6 months</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
          <ChevronDown className="GraphFilters__arrow" />
        </div>
      </div>
    );
  }
}

export default CreditScoreGraphController;
