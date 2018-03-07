import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

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
    opacity: 0.8;
  }
  50% {
    transform: translateY(200px) scale(0.8);
    opacity: 0.6;
  }

  100% {
    transform: translateY(200px) scale(1);
    opacity: 0.8;
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
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.imageLoaded ? 1 : 0)};
  transition: opacity 300ms ease;
`;

const TabletImage = styled.img`
  position: absolute;
  z-index: 2;
  width: 119%;
  max-width: 1440px;
  animation: ${levitate} 50s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
`;

const TabletShadowImage = styled.img`
  position: absolute;
  z-index: 1;
  width: 119%;
  transform: translateY(166px);
  opacity: 0.8;
  filter: blur(26px);
  animation: ${levitateShadow} 30s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    infinite;
`;

class AuthFormBackground extends Component {
  state = {
    tablet: false,
    shadow: false,
  };

  componentDidMount() {
    const tabletImage = ReactDOM.findDOMNode(this.tabletImage);

    if (tabletImage.complete) {
      this.setState({ tablet: true, shadow: true });
    }
  }

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
            ref={img => {
              this.tabletImage = img;
            }}
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
