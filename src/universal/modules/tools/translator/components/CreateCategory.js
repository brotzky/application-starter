import React, { Component } from 'react';
import styled from 'styled-components';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';

const ConfirmButton = styled.button`
  border-radius: 3px;
  background: #55ec55;
  border: none;
  display: flex;
  cursor: pointer;
  padding: 0 0.6rem;
  min-height: 24px;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
`;

const EditingCategory = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  align-items: center;
  padding: 0 2rem;
`;

const CategoryName = styled.input`
  text-transform: uppercase;
  font-size: 1.3rem;
  letter-spacing: 0.09rem;
  color: #fff;
  width: 100%;
  height: 36px;
  border: none;
  padding: 0;
  border-bottom: 1px solid #383737;
  outline: none;
  background: none;
`;

class CreateCategory extends Component {
  state = { category: '' };
  onChange = evt => this.setState({ category: evt.target.value });
  render() {
    const { onCategoryAdd } = this.props;
    const { category } = this.state;
    return (
      <ViewPermission permission="GROW_DEV">
        <EditingCategory>
          <CategoryName
            placeholder="Category Name"
            value={category}
            onChange={this.onChange}
          />
          <ConfirmButton onClick={() => onCategoryAdd(category)}>
            Confirm
          </ConfirmButton>
        </EditingCategory>
      </ViewPermission>
    );
  }
}

export default CreateCategory;
