import React, { Component } from 'react';
import styled from 'styled-components';

import DefinitionCategory from '../components/DefinitionCategory';
import Definition from '../components/Definition';
import AddDefinition from '../components/AddDefinition';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 768px;
  width: 75%;
`;

class Editor extends Component {
  createDefinitionList = (definitions, depth = 1, parent) =>
    Object.keys(definitions).map(key => {
      const value = definitions[key];
      const isObject = typeof value === 'object' && value !== null;
      return isObject ? (
        <DefinitionCategory key={key} title={key} depth={depth}>
          {this.createDefinitionList(
            value,
            depth + 1,
            parent ? `${parent}.${key}` : key,
          )}
        </DefinitionCategory>
      ) : (
        <Definition
          key={key}
          category={this.props.category}
          title={key}
          text={value}
          parent={parent}
          onSave={this.props.onSaveChanges}
          onDelete={this.props.onDeleteDef}
        />
      );
    });

  render() {
    const { category, definitions, onAddDefinition } = this.props;
    if (!definitions) return null;
    return (
      <Wrapper>
        <ViewPermission permission="EDIT_TRANSLATIONS">
          <AddDefinition
            category={category}
            onAddDefinition={onAddDefinition}
          />
        </ViewPermission>
        {this.createDefinitionList(definitions)}
      </Wrapper>
    );
  }
}

export default Editor;
