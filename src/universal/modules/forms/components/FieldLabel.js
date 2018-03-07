import React from 'react';
import styled from 'styled-components';
import FieldTooltip from './FieldTooltip';

const FieldLabel = styled.label`
  color: ${props =>
    props.error ? props.theme.colors.red : props.theme.labels.color};
  font-size: ${props => props.theme.labels.fontSize};
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  min-width: ${props => props.theme.labels.width};
  text-transform: ${props => props.theme.labels.textTransform};
`;

const FieldLabelComponent = props => {
  const { label, meta = {}, name, tooltip, value } = props;
  const { error, pristine, touched } = meta;
  const showError = (touched && error) || (pristine && value && error);

  return (
    <FieldLabel error={showError} htmlFor={name}>
      <span>
        {label} {showError && <span>{error.defaultMessage}</span>}
      </span>
      {tooltip && <FieldTooltip tooltip={tooltip} />}
    </FieldLabel>
  );
};

export default FieldLabelComponent;
