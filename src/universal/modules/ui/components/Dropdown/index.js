import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';

const DropdownToggle = styled.button`
  border-radius: 2px;
  color: #262626;
  border: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  min-width: 11rem;
  padding: 0.2rem 2rem;
  height: 34px;
  font-size: 1.4rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;
  transition: background ease-in-out 0.3s;
  background: ${props => (props.open ? '#fff' : 'none')};
  &:hover {
    transition: background ease-in-out 0.3s;
    background-color: #fff;
  }
`;

const DropdownCard = styled.div`
  display: flex;
  border-radius: 2px;
  background-color: #fff;
  color: #262626;
  border: 0;
  font-weight: 400;
  min-width: 11rem;
  height: auto;
  font-size: 1.4rem;
  box-sizing: border-box;
  max-height: 240px;
  overflow: scroll;
  width: 100%;
  flex-direction: column;
  position: absolute;
  z-index: 9999;
  top: 40px;
  left: 0;
  right: 0;
`;

const DropdownOption = styled.span`
  width: 100%;
  padding: 0.6rem 1rem;
  background: ${props => (props.selected ? '#448aff' : 'none')};
  color: ${props => (props.selected ? '#ffffff' : '#262626')};
  &:hover {
    color: #448aff;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.055);
  }
`;

const DropdownInput = styled.input`
  background: none;
  border: 0;
  height: 100%;
  width: 100%;
`;

const Dropdown = ({
  items,
  onChange,
  placeholder,
  itemToString,
  onInputValueChange,
  style,
}) => (
  <Downshift
    onChange={onChange}
    itemToString={itemToString}
    onInputValueChange={onInputValueChange}
    render={({
      getInputProps,
      getItemProps,
      isOpen,
      selectedItem,
      getButtonProps,
      highlightedIndex,
    }) => (
      <div style={style}>
        <DropdownToggle open={isOpen} {...getButtonProps()}>
          <DropdownInput {...getInputProps({ placeholder })} />
          {isOpen && (
            <DropdownCard>
              {items.map((item, index) => (
                <DropdownOption
                  key={item.value}
                  {...getItemProps({
                    item,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                  selected={selectedItem === item}
                >
                  {item.display}
                </DropdownOption>
              ))}
            </DropdownCard>
          )}
        </DropdownToggle>
      </div>
    )}
  />
);

export default Dropdown;
