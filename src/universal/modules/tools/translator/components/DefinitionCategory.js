import React, { Component } from 'react';
import styled from 'styled-components';

const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.depth > 1 ? '100%' : '97.5%')};
  color: ${props => (props.depth > 1 ? '#fafafa' : '#262626')};
  background-color: ${props => (props.depth > 1 ? '#448aff' : '#eeeeee')};
  margin: ${props => (props.depth > 1 ? '0 0 1rem' : '0.43rem auto')};
  border-radius: 3px;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  color: ${props => (props.depth > 1 ? '#fafafa' : '#262626')};
  padding: 0 0 0 8cpx;
  cursor: pointer;
  border-radius: 3px;
  margin: 1rem auto 1rem 0;
`;

class DefinitionCategory extends Component {
  state = { isOpen: false };
  toggle = evt => {
    evt.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { children, title, depth } = this.props;
    return (
      <Category depth={depth}>
        <Title onClick={this.toggle} depth={depth} isOpen={this.state.isOpen}>
          {title}
        </Title>
        {this.state.isOpen ? children : null}
      </Category>
    );
  }
}

export default DefinitionCategory;
