// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, formValueSelector } from 'redux-form';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { permissionSelector } from 'gac-utils/selectors';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { ease } from 'gac-utils/sc';
import { Text } from '../../../forms/fields/';
import { Button } from '../../../ui/components';
import { fieldProps } from '../data/calculator-form-data';
import { FadeIn } from '../../../ui/transitions/';
import { Ex } from '../../../ui/icons/';
import {
  isManualToggledPropType,
  isTransactionsToggledPropType,
  isBureauToggledPropType,
  isBothToggledPropType,
  permissionsPropType,
} from '../../../../utils/proptypes';
import getCalcItems from '../functions/get-calculator-item';

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
  min-width: 87px;
  justify-content: flex-start;
`;

const CalculatorRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ebeef0;

  & div:nth-child(2) {
    width: 52%;
  }

  ${props => (!props.hasPermission ? 'background: #f8f8fa' : '')}
  }
`;

const CalculatorDynamicRemove = styled.button`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 3rem;
`;

const CalculatorDynamicRemoveButton = styled.div`
  cursor: pointer;
  border-radius: 50%;
  fill: white;
  background: #d5d7d8;
  ${ease('out')};

  &:hover {
    background: ${props => props.theme.colors.blue};
  }
`;

const CalculatorDynamicRemoveEx = styled(Ex)`
  display: block;
  padding: 4px;
  height: 17px;
  width: 17px;
`;

const CalculatorBottomRow = styled.div`
  padding: 1.8rem 1.5rem 3.375rem;
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
  const {
    fields,
    hasPermission,
    permission,
    isManualToggled,
    isBureauToggled,
    isTransactionsToggled,
    isBothToggled,
  } = props;

  // Return an obj containing items for each source
  const calcItems = index => getCalcItems(fields, index);

  return (
    <span>
      {fields.map(
        (field, index) =>
          ((calcItems(index).transactions && isTransactionsToggled) ||
            (calcItems(index).manual && isManualToggled) ||
            (calcItems(index).both && isBothToggled) ||
            (calcItems(index).bureau && isBureauToggled) ||
            calcItems(index)['new-row']) && (
            <FadeIn key={index}>
              <CalculatorRow hasPermission={hasPermission}>
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
                  <CalculatorDynamicRemove
                    type="button"
                    onClick={() => fields.remove(index)}
                  >
                    <CalculatorDynamicRemoveButton>
                      <CalculatorDynamicRemoveEx />
                    </CalculatorDynamicRemoveButton>
                  </CalculatorDynamicRemove>
                )}
              </CalculatorRow>
            </FadeIn>
          ),
      )}
      <CalculatorBottomRow>
        <Button
          size="small"
          type="button"
          appearance="secondary"
          onClick={() => fields.push({})}
          text="Add Row"
          permission={permission}
        />
      </CalculatorBottomRow>
    </span>
  );
};

const selector = formValueSelector('calculator');

AffordabilityInputRow.defaultProps = {
  isManualToggled: true,
  isTransactionsToggled: true,
  isBureauToggled: true,
  isBothToggled: true,
};

AffordabilityInputRow.propTypes = {
  isManualToggled: isManualToggledPropType,
  isTransactionsToggled: isTransactionsToggledPropType,
  isBureauToggled: isBureauToggledPropType,
  isBothToggled: isBothToggledPropType,
  permission: permissionsPropType.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  hasPermission: permissionSelector(state, ownProps.permission),
  isManualToggled: selector(state, 'manualToggle'),
  isTransactionsToggled: selector(state, 'transactionsToggle'),
  isBureauToggled: selector(state, 'creditBureauToggle'),
  isBothToggled: selector(state, 'bothToggle'),
});

export default connect(mapStateToProps)(AffordabilityInputRow);
