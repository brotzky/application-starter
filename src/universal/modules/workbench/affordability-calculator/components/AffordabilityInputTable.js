import React from 'react';
import { FieldArray } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { fieldData, optionsData } from '../data/calculator-form-data';
import { media } from 'gac-utils/sc';
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
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const RowSubheading = styled.div`
  font-size: 1.2rem;
`;

const ColumnOne = styled.div`
  width: 237px;

  ${media.xlarge`
    width: 228px;
  `};
`;

const ColumnTwo = styled.div`
  width: 122px;

  ${media.xlarge`
    width: 117px;
  `};

  ${media.largest`
    width: 129px;
  `};
`;

const ColumnThree = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CalculatedResultContainer = styled.div`
  display: block;
  min-width: 178px;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-feature-settings: 'tnum';
`;

const filterOptions = (optionsArray, name) => {
  const options = optionsArray.filter(item => item[name]);
  return options[0][name];
};

const AffordabilityInputTable = () => {
  return (
    <ThemeProvider theme={CalculatorTheme}>
      <div>
        {fieldData.map(data => {
          const CalculateResult = data.calculate;

          return (
            <div key={data.label}>
              <RowHeader>
                <ColumnOne>
                  <RowHeading>{data.label}</RowHeading>
                  <RowSubheading>Description</RowSubheading>
                </ColumnOne>
                <ColumnTwo>
                  <CalculatedResultContainer>
                    <CalculateResult />
                  </CalculatedResultContainer>
                  <RowSubheading>{data.headerLabel}</RowSubheading>
                </ColumnTwo>
                <ColumnThree>
                  <RowSubheading>Source</RowSubheading>
                </ColumnThree>
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
};

export default AffordabilityInputTable;
