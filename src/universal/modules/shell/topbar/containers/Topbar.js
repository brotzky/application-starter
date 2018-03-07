import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopbarSearch from './TopbarSearch';
// import Breadcrumb from '../../../ui/breadcrumbs/containers/Breadcrumbs';
import { addClassNameIf } from 'grow-utils/addClassNameIf';

class Topbar extends Component {
  render() {
    const { showSearchBar } = this.props;
    // Removing Breadcrumbs for now
    // <Breadcrumb params={params} routes={routes} />
    return (
      <div className={`Topbar ${addClassNameIf(showSearchBar, 'Topbar--search-active')}`}>
        <TopbarSearch />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showSearchBar: state.search.showSearchBar,
});

export default connect(mapStateToProps)(Topbar);
