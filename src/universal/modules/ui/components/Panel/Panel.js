import React, { Component } from 'react';
import styled from 'styled-components';

const PanelHeading = styled.div`
  padding: 6px 15px 6px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-color: #ddd;
  position: relative;
`;
const PanelBody = styled.div`padding: 15px;`;

const Panel = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
`;

Panel.Body = PanelBody;
Panel.Heading = PanelHeading;

export default Panel;
