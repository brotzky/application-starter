import styled from 'styled-components';

const SidebarButton = styled.button`
  border: none;
  background: #383737;
  color: #ffffff;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 600;
  transition: all ease-in-out 0.1s;
  &:hover {
    background: #ffffff;
    color: #383737;
  }
`;

export default SidebarButton;
