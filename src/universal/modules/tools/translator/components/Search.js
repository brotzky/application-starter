import React, { PureComponent } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  background-color: #f2f2f2;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  width: 100%;
  ::placeholder {
    color: #959595;
  }
  font-size: 1.6rem;
  border-radius: 3px;
`;

class Search extends PureComponent {
  state = { value: this.props.value };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = evt => {
    const value = evt.target.value;
    this.props.onSearch(value);
  };

  render() {
    const value = this.state.value;
    return (
      <SearchWrapper>
        <SearchInput
          type="text"
          name="searchTranslations"
          value={value}
          onChange={this.handleChange}
          placeholder="Search"
        />
      </SearchWrapper>
    );
  }
}

export default Search;
