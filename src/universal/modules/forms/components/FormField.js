import styled from 'styled-components';

const FormField = styled.div`
  display: ${props => props.theme.fields.display};
  justify-content: ${props => props.theme.fields.justifyContent};
  align-items: ${props => props.theme.fields.alignItems};
  flex-direction: ${props => props.theme.fields.flexDirection};
  margin-bottom: ${props => props.theme.fields.marginBottom};
  width: 100%;

  ${props =>
    props.flex
      ? `
    flex: ${props.flex};
    margin-left: ${props.theme.space / 1.25}rem;

    &:first-child {
      margin-left: 0;
    }
  `
      : ''};
`;

export default FormField;
