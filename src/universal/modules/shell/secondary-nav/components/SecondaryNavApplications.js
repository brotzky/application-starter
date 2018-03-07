import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDown } from '../../../ui/icons/';
import SecondaryNavApplicationsItem from './SecondaryNavApplicationsItem';

class SecondaryNavApplications extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: true };
    this.hideDropdownOnClick = this.hideDropdownOnClick.bind(this);
  }

  hideDropdownOnClick() {
    this.setState({ showDropdown: !this.state.showDropdown });
    setTimeout(() => {
      this.setState({ showDropdown: !this.state.showDropdown });
    }, 500);
  }

  render() {
    const { member, params, org } = this.props;
    const { productApplications } = member;
    const location = window.location.pathname;
    const firstApplicationLink = productApplications.length
      ? `/members/${member.member.id}/workbench/${
          productApplications[0].id
        }/${productApplications[0].productName.replace(/_/, '-')}`
      : null;
    const moreThanOneApp = productApplications.length > 1;

    return (
      <li className="SecondaryNavList__item">
        <Link
          className={`SecondaryNavList__link ${
            location.includes('workbench')
              ? 'SecondaryNavList__link--active'
              : ''
          }`}
          to={firstApplicationLink}
        >
          {`Application${moreThanOneApp ? 's' : ''}`}
          {moreThanOneApp ? (
            <ChevronDown className="SecondaryNavList__chevron" />
          ) : (
            ''
          )}
        </Link>
        {moreThanOneApp && this.state.showDropdown ? (
          <ul
            className="SecondaryNavListNested"
            onClick={() => this.hideDropdownOnClick()}
          >
            {member.productApplications.map(application => (
              <SecondaryNavApplicationsItem
                key={application.id}
                application={application}
                activeId={member.member.id}
                params={params}
                org={org}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNavApplications);
