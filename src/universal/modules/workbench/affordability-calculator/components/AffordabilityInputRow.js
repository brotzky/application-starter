// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field } from 'redux-form';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { Text } from '../../../forms/fields/';
import { Button } from '../../../ui/components';
import { fieldProps } from '../data/calculator-form-data';
import { FadeIn } from '../../../ui/transitions/';
import { Ex } from '../../../ui/icons/';
import { permissionSelector } from 'gac-utils/selectors';
import { capitalizeString } from 'grow-utils/stringFormatting';

const currencyMask = createNumberMask({
  prefix: '$',
  allowDecimal: true,
});

const SourceInputContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0px 1rem;
  opacity: 0.5;
  min-width: 120px;
  justify-content: flex-start;
`;

const SourceInput = source => {
  let val = source.input.value;
  if (val === '') {
    val = 'Manual';
  }

  return <SourceInputContainer>{capitalizeString(val)}</SourceInputContainer>;
};

const AffordabilityInputRow = (props: {
  fields: {},
  hasPermission: boolean,
}) => {
  const { fields, hasPermission, permission } = props;

  return (
    <span>
      {fields.map((field, index) => (
        <FadeIn key={index}>
          <div
            className={`CalculatorRow ${!hasPermission &&
              'CalculatorRow--no-permission'}`}
          >
            <Field
              name={`${field}description`}
              component={Text}
              placeholder="Description"
              disabled={!hasPermission}
              {...fieldProps}
            />

            <Field
              name={`${field}amount`}
              component={Text}
              mask={currencyMask}
              placeholder="$"
              disabled={!hasPermission}
              {...fieldProps}
            />
            <Field
              name={`${field}source`}
              component={SourceInput}
              placeholder="Source"
              disabled={!hasPermission}
              {...fieldProps}
            />
            {hasPermission && (
              <button
                type="button"
                className="CalculatorDynamicRemove"
                onClick={() => fields.remove(index)}
              >
                <div className="CalculatorDynamicRemove__button">
                  <Ex className="CalculatorDynamicRemove__ex" />
                </div>
              </button>
            )}
          </div>
        </FadeIn>
      ))}
      <div className="CalculatorBottomRow">
        <Button
          size="small"
          type="button"
          appearance="secondary"
          onClick={() => fields.push({})}
          text="Add Row"
          permission={permission}
        />
      </div>
    </span>
  );
};

const mapStateToProps = (state, ownProps) => ({
  hasPermission: permissionSelector(state, ownProps.permission),
});

export default connect(mapStateToProps)(AffordabilityInputRow);
