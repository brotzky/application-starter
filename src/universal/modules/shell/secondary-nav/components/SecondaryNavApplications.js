import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown } from '../../../ui/icons/';
import SecondaryNavApplicationsItem from './SecondaryNavApplicationsItem';
import { SecondaryNavListItem, SecondaryNavListNested } from 'gac-utils/sc';

const StyledChevronDown = styled(ChevronDown)`     
width: 12px;
height: 12px;
margin-left: 0.6rem;
position: relative;
* {
  fill: ${props => props.theme.colors.greyMid};
}
}`;

const activeClassName = 'secondary-link-active';
const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  display: block;
  position: relative;
  padding: 0 1rem;
  margin: 0 1.8rem;
  height: 50px;
  line-height: 48px;
  border-bottom: 2px solid transparent;
  color: #777;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &.${activeClassName} {
    border-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.black};
  }
`;

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

    if (!productApplications[0]) {
      return null;
    }

    const firstApplicationLink = productApplications.length
      ? `/members/${member.member.id}/workbench/${
          productApplications[0].id
        }/${productApplications[0].productName.replace(/_/, '-')}`
      : null;
    const moreThanOneApp = productApplications.length > 1;

    return (
      <SecondaryNavListItem>
        <StyledLink activeClassName={activeClassName} to={firstApplicationLink}>
          {`Application${moreThanOneApp ? 's' : ''}`}
          {moreThanOneApp ? <StyledChevronDown /> : ''}
        </StyledLink>
        {moreThanOneApp && this.state.showDropdown ? (
          <SecondaryNavListNested onClick={() => this.hideDropdownOnClick()}>
            {member.productApplications.map(application => (
              <SecondaryNavApplicationsItem
                key={application.id}
                application={application}
                activeId={member.member.id}
                params={params}
                org={org}
              />
            ))}
          </SecondaryNavListNested>
        ) : null}
      </SecondaryNavListItem>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNavApplications);
