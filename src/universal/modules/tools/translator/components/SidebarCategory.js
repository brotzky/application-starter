import styled from 'styled-components';

const Category = styled.a`
  text-transform: uppercase;
  font-size: 1.3rem;
  letter-spacing: 0.09rem;
  color: #fff;
  width: 100%;
  height: 36px;
  padding: 0 2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: ${props => (props.active ? '#383737' : 'transparent')};
  &:hover {
    background-color: #383737;
  }
`;

export default Category;
