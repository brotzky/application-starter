import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingPlaceholder = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  animation: loading 1.25s linear infinite;
  background: ${props => props.theme.colors.grey};
  border: ${props => props.borderWidth} solid white;
  border-left: none;
  border-right: none;

  @keyframes loading {
    0% {
      background-position: 0;
      opacity: 0.3;
    }
    50% {
      background-position: 250px;
      opacity: 1;
    }
    100% {
      background-position: 500px;
      opacity: 0.3;
    }
  }
`;

const LoadingBar = ({ width, height, borderWidth }) => (
  <LoadingPlaceholder width={width} height={height} borderWidth={borderWidth} />
);

const Loading = ({ width, height, borderWidth }) => (
  <LoadingBar width={width} height={height} borderWidth={borderWidth} />
);

LoadingBar.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  borderWidth: PropTypes.string.isRequired,
};

Loading.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  borderWidth: PropTypes.string.isRequired,
};

export default Loading;
