import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from 'gac-utils/sc';

const levitate = keyframes`
  0% {
    transform: translateY(5rem);
  }

  50% {
    transform: translateY(0px);

  }

  100% {
    transform: translateY(5rem);
  }
`;

const levitateShadow = keyframes`
  0% {
    transform: translateY(200px) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(200px) scale(0.8);
    opacity: 0.3;
  }

  100% {
    transform: translateY(200px) scale(1);
    opacity: 0.5;
  }
`;

// Defining this outside the scope of the function so it doesn't update
const randomNumber = Math.floor(Math.random() * 100) + 1;

const generateRandomBackground = () => {
  if (randomNumber >= 0 && randomNumber < 25) return `#FCC149`;
  if (randomNumber >= 25 && randomNumber < 50) return `#12223D`;
  if (randomNumber >= 50 && randomNumber < 75) return `#24467C`;
  if (randomNumber >= 75 && randomNumber <= 100) return `#4EAFE5`;

  return '#12223D';
};

const AuthFormBackgroundImageWrapper = styled.div`
  width: 62%;
  height: 100vh;
  display: flex;
  padding: 3.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${generateRandomBackground};

  ${media.xlarge`
    width: 58%;
  `};
`;

const ImageContainer = styled.div`
  position: relative;
  top: 0;
  left: 8%;
  display: flex;
  width: 108%;
  height: 1002px;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.imageLoaded ? 1 : 0)};
  transition: opacity 300ms ease;
`;

const TabletImage = styled.img`
  position: absolute;
  top: 13%;
  left: -96px;
  z-index: 2;
  width: 110%;
  max-width: 1448px;
  animation: ${levitate} 55s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;

  ${media.xlarge`
    top: 15%;
    left: -100px;
    z-index: 2;
    width: 110%;
    max-width: 1448px;
  `};

  ${media.largest`
    top: 11%;
  `};
`;

const TabletShadowImage = styled.img`
  position: absolute;
  top: -6%;
  left: -96px;
  z-index: 1;
  height: 100%;
  width: 110%;
  transform: translateY(166px);
  filter: blur(26px);
  animation: ${levitateShadow} 55s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    infinite;
`;

class AuthFormBackground extends Component {
  state = {
    tablet: false,
    shadow: false,
  };

  handleImageLoaded = piece => {
    this.setState({ [piece]: true });
  };

  render() {
    const { tablet, shadow } = this.state;

    return (
      <AuthFormBackgroundImageWrapper>
        <ImageContainer imageLoaded={tablet && shadow}>
          <TabletImage
            src="/static/img/devices/tablet/tablet-applications-page.png"
            alt="Applications page tablet"
            onLoad={() => this.handleImageLoaded('tablet')}
          />
          <TabletShadowImage
            src="/static/img/devices/tablet/tablet-applications-page-shadow.png"
            alt="Applications page tablet"
            onLoad={() => this.handleImageLoaded('shadow')}
          />
        </ImageContainer>
      </AuthFormBackgroundImageWrapper>
    );
  }
}

export default AuthFormBackground;
