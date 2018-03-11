import React, { Component } from 'react';
import { Remove } from '../../ui/icons';
import styled from 'styled-components';
import { Panel } from '../../ui/components';
import Select from 'react-select';
import DateRange from '../../forms/forms/DateRange';

const ListBox = styled.div`
  padding: 3px 8px 3px;
  background-color: #d9edf7;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  position: relative;
  cursor: pointer;
  font-size: 12px;
`;

const ListHeader = styled(ListBox)`
  span.header {
    font-weight: 600;
    display: block;
  }
  opacity: 0.8;
`;

const ListBody = styled(ListBox)`
  border-top: 0;
  background-color: #fff;
  border-color: #d9edf7;
  padding: 5px 8px 5px;
  margin-bottom: 5px;
`;

const CloseButton = styled.span`
  position: absolute;
  right: 10px;
  top: 3px;
  display: block;
`;

const InputWrapper = styled.input`
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
`;

/**
 * Displays filter and provides an input for users to enter values.
 */
class SelectedFilter extends Component {
  state = {
    collapsed: true,
  };

  /**
   * Expand to enter input values.
   */
  handleClick = event => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.setState({ collapsed: true });
    }
  };

  /**
   *
   */
  renderFilterInput = () => {
    const {
      data: { item, key },
      onUpdate,
      value = this.getDefaultValue(),
    } = this.props;
    const { current } = this.state;
    switch (item.type) {
      case 'date':
        return <DateRange onChange={newValue => onUpdate(key, newValue)} />;
      case 'string':
        return (
          <InputWrapper
            type="text"
            onChange={event => onUpdate(key, event.target.value)}
            onKeyDown={this.handleKeyDown}
            value={value}
          />
        );
      case 'select':
        return (
          <Select
            onChange={selectedOption => onUpdate(key, selectedOption)}
            options={item.options}
            multi={item.multiple}
            value={value}
            joinValues={item.multiple}
          />
        );
      case 'bool':
        return (
          <Select
            onChange={selectedOption => onUpdate(key, selectedOption)}
            options={item.options}
            value={value}
          />
        );
    }
  };

  /**
   * @return the default value based on the type of the filter.
   */
  getDefaultValue = () => {
    const { data: { item } } = this.props;
    switch (item.type) {
      case 'date':
        return { from: undefined, to: undefined };
      case 'select':
        return item.multiple ? [] : false;
      case 'bool':
        return '';
      case 'string':
      default:
        return '';
    }
  };

  /**
   * @return Text output for the value of this filter.
   */
  displayValue = () => {
    const { data: { item, key }, value = this.getDefaultValue() } = this.props;

    let str = '';
    switch (item.type) {
      case 'date':
        if (value.to && !value.from) {
          str += 'To: ' + value.to.toDateString();
        } else if (!value.to && value.from) {
          str += 'From: ' + value.from.toDateString();
        } else if (value.to && value.from) {
          str += value.from.toDateString() + ' to ' + value.to.toDateString();
        }
        return str;
      case 'string':
        return value;
      case 'select':
        if (Array.isArray(value) && value.length) {
          for (let index in value) {
            str += value[index].label;
            if (index < value.length - 1) {
              str += ', ';
            }
          }
        } else if (!item.multiple && value) {
          str += value.label;
        }
        return str;
      case 'bool':
        if (value) {
          str += value.label;
        }
        return str;
    }
  };

  render() {
    const { data: { item, key }, onRemove } = this.props;
    const { collapsed } = this.state;
    const display = this.displayValue();
    return (
      <li>
        <ListHeader onClick={this.handleClick}>
          <CloseButton
            onClick={event => {
              event.stopPropagation();
              onRemove(key);
            }}
          >
            <Remove height="10" width="10" />
          </CloseButton>
          <span>{item.label}</span>
          {collapsed && (
            <span>{display ? display : 'Click to apply a filter value.'}</span>
          )}
        </ListHeader>
        {!collapsed && <ListBody>{this.renderFilterInput()}</ListBody>}
      </li>
    );
  }
}

export default SelectedFilter;
