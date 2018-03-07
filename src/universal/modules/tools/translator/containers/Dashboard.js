import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 75%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => (
  <Container>Select a language on the left or add a new one.</Container>
);

export default Dashboard;
