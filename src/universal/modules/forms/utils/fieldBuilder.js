// @flow
import React from 'react';
import { Field, FieldArray } from 'redux-form';
import {
  Button,
  Checkbox,
  List,
  FileUpload,
  Radio,
  Range,
  Select,
  SelectEasy,
  Text,
} from '../fields/';

const fieldBuilder = (field = {}) => {
  const {
    flex,
    label = '',
    mask,
    name,
    options = [],
    parse,
    placeholder,
    tooltip,
    type,
    validate,
    disabled,
    isLocked,
  } = field;

  switch (type) {
    case 'button':
      return (
        <div style={{ textAlign: `${field.align}` }}>
          <Button
            key={name}
            name={name}
            primary={field.level === 'primary'}
            secondary={field.level === 'secondary'}
            tertiary={field.level === 'tertiary'}
            type={type}
          >
            {field.text}
          </Button>
        </div>
      );
    case 'checkbox':
      return (
        <Field
          component={Checkbox}
          disabled={disabled}
          key={name}
          label={label}
          name={name}
          validate={validate}
        />
      );
    case 'file':
      return (
        <Field
          component={FileUpload}
          documentType={field.documentType}
          key={name}
          label={label}
          name={name}
          validate={validate}
        />
      );
    case 'radio':
      return (
        <Radio
          form={field.formName}
          label={label}
          key={name}
          name={name}
          options={options}
          tooltip={tooltip}
          validate={validate}
          disabled={disabled}
        />
      );
    case 'range':
      return (
        <Range
          key={name}
          label={label}
          mask={mask}
          max={field.max}
          min={field.min}
          name={name}
          parse={parse}
          type={type}
          validate={validate}
        />
      );
    case 'select':
      return (
        <Field
          component={Select}
          disabled={disabled}
          flex={flex}
          key={name}
          label={label}
          name={name}
          options={options}
          sort={field.sort}
          validate={validate}
        />
      );
    case 'select-easy':
      return (
        <Field
          component={SelectEasy}
          disabled={disabled}
          flex={flex}
          key={name}
          label={label}
          name={name}
          options={options}
          validate={validate}
        />
      );
    case 'email':
    case 'num':
    case 'password':
    case 'search':
    case 'tel':
    case 'text':
      return (
        <Field
          component={Text}
          flex={flex}
          key={name}
          label={label}
          mask={mask}
          name={name}
          parse={parse}
          placeholder={placeholder}
          tooltip={tooltip}
          type={type}
          validate={validate}
          disabled={disabled}
        />
      );
    case 'list':
      return (
        <FieldArray
          component={List}
          label={field.label}
          key={name}
          name={name}
          disabled={disabled}
          isLocked={isLocked}
          subFields={field.fields}
        />
      );
    default:
      return (
        <div key={name}>
          ⚠️ {name} field type: {type} not supported
        </div>
      );
  }
};

export default fieldBuilder;
