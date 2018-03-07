import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const dimensions = {
  small: '16',
  medium: '32',
  large: '48',
};
const CenterCroppedImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
`;
const ImageContainer = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  overflow: hidden;
  display: inline-block;
  ${props => props.circular && `border-radius: ${props.size}px;`};
  ${props => props.overlap && `margin-left: -5px;`};
`;

const Image = ({ src, size, ...rest }) => {
  const dimension = dimensions[size] ? dimensions[size] : dimensions['small'];
  <ImageContainer {...rest} size={dimension} {...rest}>
    <CenterCroppedImage src={src} />
  </ImageContainer>;
};
Image.PropTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  circular: PropTypes.bool,
  overlap: PropTypes.bool,
  src: PropTypes.string.isRequired,
};
