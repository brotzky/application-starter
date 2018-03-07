import styled from 'styled-components';

const Tab = styled.a`
  width: auto;
  flex: 1;
  padding: 0.5rem 3rem;
  text-align: center;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top: 5px solid
    ${props =>
      props.active ? '#448aff' : props.noStyle ? 'transparent' : '#ccc'};
  border-right: ${props => (!props.noStyle ? '1px solid #ccc' : 'none')};
  background: ${props => (props.active ? '#fff' : 'none')};
`;

export default Tab;
