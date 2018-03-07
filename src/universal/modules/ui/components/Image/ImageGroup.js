import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const dimensions = {
  small: '16',
  medium: '32',
  large: '48',
};

const Group = styled.div`display: inline;`;
const CenterCroppedImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  overflow: hidden;
  display: inline-block;
  ${props => props.circular && `border-radius: ${props.size}px;`};
  ${props => props.overlap && `margin-left: -5px;`};
`;
/**
 * Takes a group of images and displays them inline. 
 * Options to show them as circles and overlapping.
 * Can add support for Icon types.
 */
const ImageGroup = ({ children, size = 'small', ...rest }) => {
  const dimension = dimensions[size] ? dimensions[size] : dimensions['small'];
  return (
    <Group>
      {React.Children.map(children, (child, index) => {
        return (
          <Container size={dimension} {...rest}>
            {child.type === 'img' ? (
              <CenterCroppedImage src={child.props.src} />
            ) : (
              child
            )}
          </Container>
        );
      })}
    </Group>
  );
};

ImageGroup.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  circular: PropTypes.bool,
  overlap: PropTypes.bool,
};

export default ImageGroup;
