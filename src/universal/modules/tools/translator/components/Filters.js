import React, { Component } from 'react';

class Filters extends Component {
  state = {
    active: new Array(this.props.children.length).fill(true),
  };

  onFilterClick = index => {
    const status = !this.state.active[index];
    const active = Object.assign([...this.state.active], { [index]: status });
    this.setState({ active }, () => this.props.onFilterClick(index, status));
  };

  render() {
    const { children } = this.props;
    const active = this.state.active;
    const childrenWithProps = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        active: active[index],
        onClick: () => this.onFilterClick(index),
      }),
    );
    return childrenWithProps;
  }
}

export default Filters;
