import React, { Component } from 'react';
import styled from 'styled-components';

const HoverableDiv = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  width: 100%;
`;

/**
 * Shows some content on hover after 1 second. 
 */
class WithHover extends Component {
  state = {
    isHovering: false,
    elapsed: 0,
    start: null,
  };

  /**
   * After a short delay, displays content if user is 
   */
  handleMouseIn = () => {
    const { isHovering } = this.state;
    if (!isHovering) {
      this.start();
    }
  };

  handleMouseOut = () => {
    const { isHovering } = this.state;
    if (isHovering) {
      this.clear();
    }
  };

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.start });
  };

  start = () => {
    this.setState({ start: new Date(), isHovering: true }, () => {
      this.timer = setInterval(this.tick, 50);
    });
  };

  clear = () => {
    this.setState({
      elapsed: 0,
      start: null,
      isHovering: false,
    });
    clearInterval(this.timer);
  };

  componentWillUnmount = () => {
    this.clear();
  };

  render() {
    const { children, onHover } = this.props;
    const { isHovering, elapsed } = this.state;

    return (
      <HoverableDiv
        onMouseLeave={this.handleMouseOut}
        onMouseEnter={this.handleMouseIn}
      >
        {children}
        {elapsed > 700 && (
          <div
            onMouseLeave={this.handleMouseOut}
            onMouseEnter={this.handleMouseIn}
          >
            {onHover}
          </div>
        )}
      </HoverableDiv>
    );
  }
}
export default WithHover;
