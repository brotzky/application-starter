import React from 'react';
import { FieldArray } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { fieldData, optionsData } from '../data/calculator-form-data';
import { theme } from '../../../../themes';
import AffordabilityInputRow from './AffordabilityInputRow';

const CalculatorTheme = {
  ...theme,
  fields: {
    flexDirection: 'column',
    marginBottom: '0rem',
  },
  inputs: {
    border: {
      color: {
        default: '#d6d6d6',
        focus: 'transparent',
      },
      radius: '0',
      style: 'solid',
      width: '0px',
    },
    boxShadow: 'none',
    color: {
      placeholder: '#969696',
      value: '#262626',
    },
    fontSize: '1.4rem',
    height: '4.4rem',
    width: '100%',
    padding: '1.2rem',
  },
  labels: {
    color: '#585858',
    fontSize: '1.4rem',
    width: '100%',
    textTransform: 'initial',
  },
  select: {
    border: {
      width: '1px',
      style: 'solid',
    },
    background: 'transparent',
    width: '100%',
    svg: {
      height: '1.2rem',
      top: '4.2rem',
    },
  },
};

const RowHeader = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.28571rem 1.2rem 0.75rem;
  background-color: #fafafa;
  border-bottom: 1px solid #ebeef0;
  border-top: 1px solid #ebeef0;
`;

const RowHeading = styled.h4`
  font-size: 1.9rem;
  margin-bottom: 0.5rem;
`;

const RowSubheading = styled.div`font-size: 1.2rem;`;

const filterOptions = (optionsArray, name) => {
  const options = optionsArray.filter(item => item[name]);
  return options[0][name];
};

const AffordabilityInputTable = () => (
  <ThemeProvider theme={CalculatorTheme}>
    <div className="CalculatorInputTable">
      {fieldData.map((data, index) => {
        const CalculateResult = data.calculate;
        return (
          <div key={index}>
            <RowHeader>
              <div className="CalculatorColumn__one">
                <RowHeading>{data.label}</RowHeading>
                <RowSubheading>Description</RowSubheading>
              </div>
              <div className="CalculatorColumn__two">
                <CalculateResult />
                <RowSubheading>{data.headerLabel}</RowSubheading>
              </div>
              <div className="CalculatorColumn__three">
                <RowSubheading>Source</RowSubheading>
              </div>
            </RowHeader>
            <FieldArray
              name={data.name}
              label={data.label}
              calculate={data.calculate}
              options={filterOptions(optionsData, data.name)}
              permission={data.permission}
              component={AffordabilityInputRow}
            />
          </div>
        );
      })}
    </div>
  </ThemeProvider>
);

export default AffordabilityInputTable;
