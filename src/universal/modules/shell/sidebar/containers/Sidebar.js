import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarLogo from '../components/SidebarLogo';
import SidebarNav from './SidebarNav';
import SidebarUser from './SidebarUser';

class Sidebar extends Component {
  render() {
    const { dispatch, location } = this.props;

    return (
      <div className="Sidebar">
        <SidebarLogo />
        <SidebarNav location={location} />
        <SidebarUser dispatch={dispatch} />
      </div>
    );
  }
}

export default connect()(Sidebar);
