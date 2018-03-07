import React from 'react';
import styled from 'styled-components';

import { Pencil } from '../../../ui/icons';

const ApplicantProfileTextContainer = styled.div`
  position: relative;
  display: flex;
  font-size: 1.5rem;
  padding: 1.125rem 2.8125rem;
  border-bottom: 1px solid #efefef;

  &:hover {
    background: #fdfdfd;
  }

  &:hover .ApplicantProfileTextEdit {
    opacity: 1;
  }
`;

const ApplicantProfileTextLabel = styled.div`
  min-width: 230px;
  color: ${props => props.theme.colors.greyMidDark};
`;

const ApplicantProfileTextValue = styled.div`
  color: ${props => props.theme.colors.black};
`;

const ApplicantProfileTextEdit = styled.div`
  opacity: 0;
  position: absolute;
  right: 2.8125rem;
  top: 1rem;
  color: ${props => props.theme.colors.blue};
  cursor: pointer;
  transition: 150ms ease;

  svg {
    * {
      stroke: ${props => props.theme.colors.blue};
    }
  }
`;

const ApplicantProfileText = ({ field, fieldValue, handleToggleClick }) => {
  const isListOfValues = Array.isArray(fieldValue);

  let renderedText = fieldValue;

  if (fieldValue && field.options) {
    const fieldOption = field.options.find(option => {
      return option.value === fieldValue;
    });

    if (fieldOption && fieldOption.name) renderedText = fieldOption.name;
  }

  if (fieldValue && field.format) {
    renderedText = field.format(fieldValue);
  }

  /**
   * isListOfValues
   * if the field is a list, like other income sources for example,
   * then we need to render it differently than a regular input field.
   */
  if (isListOfValues) {
    return (
      <ApplicantProfileTextList
        field={field}
        fieldValue={fieldValue}
        handleToggleClick={handleToggleClick}
      />
    );
  }

  return (
    <ApplicantProfileTextContainer>
      <ApplicantProfileTextLabel>{field.label}</ApplicantProfileTextLabel>
      <ApplicantProfileTextValue>{renderedText}</ApplicantProfileTextValue>
      <ApplicantProfileTextEdit
        className="ApplicantProfileTextEdit"
        onClick={() => handleToggleClick(field.name)}
        id={`${field.name}Edit`}
      >
        <Pencil height={14} /> Edit
      </ApplicantProfileTextEdit>
    </ApplicantProfileTextContainer>
  );
};

const ApplicantProfileTextListContainer = styled.div`
  position: relative;
  font-size: 1.5rem;
  padding: 1.125rem 2.8125rem;
  border-bottom: 1px solid #ebeef0;

  &:hover .ApplicantProfileTextEdit {
    opacity: 1;
  }
`;

const ApplicantProfileTextListItemContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const MarginBottomSpacer = styled.div`
  border: 1px solid #efefef;
  border-radius: 4px;
  background: #fff;

  &:not(first-child) {
    margin-bottom: 2rem;
  }
`;

const ApplicantProfileTextListRow = styled.div`
  position: relative;
  display: flex;
  font-size: 1.5rem;
  padding: 1.125rem 2.8125rem;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border-bottom: none;
  }

  &:hover .ApplicantProfileTextEdit {
    opacity: 1;
  }
`;

const ApplicantProfileTextListLabel = styled.div`
  min-width: 230px;
  padding-bottom: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.black};
`;

const ApplicantProfileTextList = ({ field, fieldValue, handleToggleClick }) => (
  <ApplicantProfileTextListContainer>
    <ApplicantProfileTextListLabel>{field.label}</ApplicantProfileTextListLabel>
    <ApplicantProfileTextListItemContainer>
      {fieldValue.map((listValue, index) => (
        <MarginBottomSpacer key={index}>
          {field.fields.map(listField => {
            let value = listValue[listField.name];

            if (listValue && listField.options) {
              const fieldOption =
                listField.options.find(option => option.value === value) || {};
              value = fieldOption.name;
            }

            if (listValue && listField.format) {
              value = listField.format(value);
            }

            return (
              <ApplicantProfileTextListRow key={listField.label}>
                <ApplicantProfileTextLabel>
                  {listField.label}
                </ApplicantProfileTextLabel>
                <ApplicantProfileTextValue>{value}</ApplicantProfileTextValue>
              </ApplicantProfileTextListRow>
            );
          })}
        </MarginBottomSpacer>
      ))}
    </ApplicantProfileTextListItemContainer>
    <ApplicantProfileTextEdit
      className="ApplicantProfileTextEdit"
      onClick={() => handleToggleClick(field.name)}
    >
      <Pencil height={14} /> Edit
    </ApplicantProfileTextEdit>
  </ApplicantProfileTextListContainer>
);

export default ApplicantProfileText;
