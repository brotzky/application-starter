// @flow
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fieldBuilder from '../utils/fieldBuilder';
import { FadeIn } from '../../ui/transitions';

const ListList = styled.ul`
  padding: 2.2rem 2.8125rem;
  background: #fafafa;
  border-radius: 4px;
  list-style: none;
  border: 1px solid #ebeef0;
`;

const ListItem = styled.li`
  border: 1px solid #ebeef0;
  padding: 2.8125rem 2.8125rem 1rem 2.8125rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  background: #fff;
  text-align: right;
`;

const ListFieldContainer = styled.div`padding-bottom: 2rem;`;

const ListHeader = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-left: 2.8125rem;
`;

const ListAddButton = styled.button`
  font-size: 1.4rem;
  font-weight: 400;
  padding-right: 2.8125rem;
  color: ${props => props.theme.colors.black};
`;

const ListRemoveButton = styled.button`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.greyMidDark};
`;

const ListItemEmptyButton = styled.div`
  border: 1px solid #ebeef0;
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  background: #fff;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    border-color: ${props => props.theme.colors.blue};
    background: #fbfcff;
    color: ${props => props.theme.colors.blue};
  }
`;
const List = ({ fields, label, subFields, disabled }) => {
  const noMetadata = fields.length === 0;

  return (
    <ListList>
      <ListHeader>{label}</ListHeader>
      {noMetadata ? (
        <ListItemEmptyButton type="button" onClick={() => fields.push({})}>
          Add {label.toLowerCase()}
        </ListItemEmptyButton>
      ) : (
        <FadeIn>
          {fields.map((field, index) => (
            <ListItem key={index}>
              {subFields.map((subField, index) => {
                /**
                 * We have to create a new name for redux-form or else the originally defined
                 * name will not pull the array information into the field value.
                 * an example of what name would look like with each loop over the array:
                 * otherIncome[0].description
                 * otherIncome[1].description
                 * otherIncome[2].description
                 * ... and so on
                 */
                const name = `${field}${subField.name}`;
                return (
                  <ListFieldContainer key={index}>
                    {fieldBuilder({
                      ...subField,
                      name,
                      disabled,
                      formName: 'workbench',
                    })}
                  </ListFieldContainer>
                );
              })}
              <ListRemoveButton
                type="button"
                onClick={() => fields.remove(index)}
              >
                Remove
              </ListRemoveButton>
            </ListItem>
          ))}
        </FadeIn>
      )}
      {!noMetadata && (
        <li style={{ textAlign: 'right' }}>
          <ListAddButton type="button" onClick={() => fields.push({})}>
            Add {label.toLowerCase()}
          </ListAddButton>
        </li>
      )}
    </ListList>
  );
};

List.propTypes = {};

export default List;
