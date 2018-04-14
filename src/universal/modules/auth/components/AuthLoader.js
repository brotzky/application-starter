import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

class AuthLoader extends Component {
  render() {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AuthLoader);
