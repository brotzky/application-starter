import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DateItem = styled.li`
  font-size: 12px;
  ${props => props.selected === true && 'color: #647f8c; font-weight: 600;'};
  display: flex;
  flex-direction: row;
  label {
    flex: 1;
    font-weight: 500;
  }
  span {
    flex: 2;
  }
`;
class DateRange extends Component {
  state = {
    value: {
      from: undefined,
      to: undefined,
    },
    current: 'from',
  };
  handleDateType = type => {
    const { current } = this.state;
    if (type !== current) {
      this.setState({ current: type });
    }
  };

  handleDateChange = selectedDay => {
    const { current, value } = this.state;
    const newValue = Object.assign({}, value, {
      [current]: selectedDay,
    });
    if (
      !newValue.to ||
      !newValue.from ||
      (newValue.to && newValue.from && newValue.to >= newValue.from)
    ) {
      this.setState({
        value: newValue,
        current: current === 'to' ? 'from' : 'to',
      });
      this.props.onChange(newValue);
    } else {
      alert('Date must be in sequence)');
    }
  };
  render() {
    const { value, current } = this.state;
    const highlighted = {
      from: value.from,
      to: value.to,
    };
    const selectedStyle = `.DayPicker-Day--highlighted {
      background-color: #647f8c;
      color: white;
    }`;
    return (
      <ul style={{ listStyleType: 'none' }}>
        <DateItem
          onClick={() => this.handleDateType('from')}
          selected={current === 'from'}
        >
          <label>From</label>
          <span>
            {value.from ? (
              value.from.toDateString()
            ) : current === 'from' ? (
              'Select a date'
            ) : (
              'Click here to set a date'
            )}
          </span>
        </DateItem>
        <DateItem
          onClick={() => this.handleDateType('to')}
          selected={current === 'to'}
        >
          <label>To</label>
          <span>
            {value.to ? (
              value.to.toDateString()
            ) : current === 'to' ? (
              'Select a date'
            ) : (
              'Click here to set a date'
            )}
          </span>
        </DateItem>
        <li>
          <style>{selectedStyle}</style>
          <DayPicker
            onDayClick={this.handleDateChange}
            value={value[current]}
            modifiers={{ highlighted }}
          />
        </li>
      </ul>
    );
  }
}
DateRange.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default DateRange;
