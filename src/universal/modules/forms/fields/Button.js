import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  border-radius: ${props => props.theme.buttons.borderRadius};
  cursor: pointer;
  display: inline-flex;
  justify-content: ${props => (props.spaceBetween ? 'space-between' : 'center')};
  min-width: 190px;
  padding: 0 ${props => `${props.theme.space * 1.25}rem`};
  text-align: ${props => props.textAlign || 'center'};
  transition: all .15s ease-out;

  &[disabled] {
    cursor: not-allowed;
  }

  ${props => (props.primary ? `
    background: ${props.theme.buttons.primary.background.default};
    color: ${props.theme.buttons.primary.color.default};
  ` : '')};
  ${props => (props.secondary ? `
    background: ${props.theme.buttons.secondary.background.default};
    color: ${props.theme.buttons.secondary.color.default};
  ` : '')};
  ${props => (props.tertiary ? `
    background: ${props.theme.buttons.tertiary.background.default};
    color: ${props.theme.buttons.tertiary.color.default};
  ` : '')};

  ${props => (props.theme.buttons.height ? `height: ${props.theme.buttons.height}` : '4.8rem')};
  ${props => (props.theme.buttons.textTransform ? `text-transform: ${props.theme.buttons.textTransform}` : '')};

  svg {
    * {
      fill:  ${props => (props.primary ? props.theme.buttons.primary.color.default : props.secondary ? props.theme.buttons.secondary.color.default : props.tertiary ? props.theme.buttons.tertiary.color.default : 'inherit')};
    }
  }

  .Spinner {
    * {
      fill: none;
      stroke: ${props => (props.primary ? props.theme.buttons.primary.color.default : props.secondary ? props.theme.buttons.secondary.color.default : props.tertiary ? props.theme.buttons.tertiary.color.default : 'inherit')};
    }
  }

  &:hover,
  &:focus,
  &:active {
    ${props => (props.primary ? `
    background: ${props.theme.buttons.primary.background.hover};
    color: ${props.theme.buttons.primary.color.hover};
  ` : '')};
  ${props => (props.secondary ? `
    background: ${props.theme.buttons.secondary.background.hover};
    color: ${props.theme.buttons.secondary.color.hover};
  ` : '')};
  ${props => (props.tertiary ? `
    background: ${props.theme.buttons.tertiary.background.hover};
    color: ${props.theme.buttons.tertiary.color.hover};
  ` : '')};

    svg {
      * {
        fill: ${props => (props.primary ? props.theme.buttons.primary.color.hover : props.secondary ? props.theme.buttons.secondary.color.hover : props.tertiary ? props.theme.buttons.tertiary.color.hover : '')};
      }
    }

    .Spinner {
      * {
        fill: none;
        stroke: ${props => (props.primary ? props.theme.buttons.primary.color.hover : props.secondary ? props.theme.buttons.secondary.color.hover : props.tertiary ? props.theme.buttons.tertiary.color.hover : '')};
      }
    }
  }
`;

export default Button;
