import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import queryString from 'query-string';
import { SingleDatePicker } from 'react-dates';
import { getLoanBookOverview } from 'grow-actions/loan-book/loan-book';
import Spinner from '../../../ui/spinner/spinner';
import { FadeIn } from '../../../ui/transitions/';

class LoanBookBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: null,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.handleDateChange(date);
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  handleDateChange(date) {
    const { dispatch, params } = this.props;
    const jsDateISOFormat = date.toISOString();
    const asOfDate = jsDateISOFormat.replace(/(\.000)/g, '');
    return dispatch(getLoanBookOverview(params.productId, queryString.stringify({
      asOfDate,
    })));
  }

  render() {
    const { asOfDate, asOfBalance, isFetching } = this.props;
    const { focused } = this.state;
    return (
      <div className="LoanBookBalance">
        <span className="LoanBookBalance__label">Balance as of</span>
        <SingleDatePicker
          id="dateinput"
          date={moment(asOfDate)}
          focused={focused}
          numberOfMonths={1}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange} />
        <span className="LoanBookBalance__label">
          is {
            isFetching
            ? <Spinner className="LoanBookBalance__spinner" />
            : <FadeIn><span>{numeral(asOfBalance).format('$0,00.00')}</span></FadeIn>
          }
        </span>
      </div>
    );
  }
}

export default LoanBookBalance;
