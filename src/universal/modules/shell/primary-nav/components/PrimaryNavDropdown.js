import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { authLogout } from 'grow-actions/auth/auth-logout';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { Transition } from '../../../ui/transitions';
import { ProfilePicture } from '../../../ui/components';
import {
  LogoutIcon,
  ProductsIcon,
  ProfileIcon,
  RolesIcon,
  UsersIcon,
  TranslationsIcon,
} from '../../../ui/icons';

const dropdownLinks = [
  {
    path: `/account/profile/`,
    text: 'Your profile',
    icon: ProfileIcon,
  },
  {
    path: `/account/overview/`,
    text: 'Products',
    icon: ProductsIcon,
  },
  {
    path: `/account/users/`,
    text: 'Users',
    icon: UsersIcon,
  },
  {
    path: `/account/roles/`,
    text: 'Roles',
    icon: RolesIcon,
  },
  {
    path: `/tools/translator/dev/`,
    text: 'Translator',
    icon: TranslationsIcon,
  },
];

const PrimaryNavDropdownContainer = styled.div``;

const ProfilePictureContainer = styled.div`
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  right: 2.25rem;
  top: 54px;
  z-index: 2;
  width: 340px;
  color: ${props => props.theme.colors.black};
  border-radius: 2px;
  padding: 1.125rem 0;
  background: white;
  list-style-type: none;
  border: 1px solid rgba(0,0,0,.2);
  box-shadow: 0 2px 10px rgba(0,0,0,.2);

  pointer-events:: ${props => (props.isActive ? 'initial' : 'none')};
`;

const DropdownListItemLink = styled(Link)`
  display: block;
  padding: 0.875rem 2.4rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  color: ${props => props.theme.colors.black};

  &:hover {
    background: rgba(0, 0, 0, 0.03);

    svg {
      * {
        fill: ${props => props.theme.colors.greyDark};
      }
    }
  }

  svg {
    margin: 0 28px 1px 0;
    height: 22px;
    width: 22px;

    * {
      fill: #888888;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
`;

const DropdownListItem = styled.div`
  display: block;
  padding: 0.875rem 2.4rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background: rgba(0, 0, 0, 0.03);

    svg {
      * {
        fill: ${props => props.theme.colors.greyDark};
      }
    }
  }

  svg {
    margin: 0 28px 1px 0;
    height: 22px;
    width: 22px;

    * {
      fill: #888888;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
`;

const DropdownTop = styled.li`
  display: flex;
  align-items: center;
  padding: 0.475rem 2rem 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const DropdownTopOverflow = styled.div`
  position: relative;
  max-width: 232px;
  padding-left: 1.7rem;
`;

const DropdownTopName = styled.div`
  position: relative;
  font-weight: 600;
  font-size: 1.7rem;
  margin-bottom: 7px;
`;

const DropdownTopDetails = styled.div`
  position: relative;
  margin-top: 1px;
  font-size: 1.3rem;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #666;
`;

const DropdownTopDivider = styled.div`
  margin: 1rem auto;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
`;

class PrimaryNavDropdown extends Component {
  state = { showDropdownMenu: false };

  handleSignoutClick = async () => {
    const { dispatch } = this.props;
    await dispatch(authLogout());
    await dispatch(push('/login'));
  };

  handleActionMenuClick = event => {
    event.nativeEvent.stopImmediatePropagation();
    document.addEventListener('click', this.handleCloseActionMenu);
    this.setState({ showDropdownMenu: !this.state.showDropdownMenu });
  };

  handleCloseActionMenu = () => {
    this.setState({ showDropdownMenu: !this.state.showDropdownMenu });
    document.removeEventListener('click', this.handleCloseActionMenu);
  };

  render() {
    const { organizationName, user } = this.props;
    const { showDropdownMenu } = this.state;

    return (
      <PrimaryNavDropdownContainer>
        <ProfilePictureContainer
          onClick={event => this.handleActionMenuClick(event)}
        >
          <ProfilePicture isActive={showDropdownMenu} size={32} user={user} />
        </ProfilePictureContainer>

        <Transition transitionName="QueueActions">
          {showDropdownMenu && (
            <DropdownList isActive={showDropdownMenu}>
              <DropdownTop>
                <ProfilePicture
                  size={78}
                  allowUpdate={true}
                  isActive={showDropdownMenu}
                  user={user}
                />
                <DropdownTopOverflow>
                  <DropdownTopName>
                    {user.firstName} {user.lastName}
                  </DropdownTopName>
                  <DropdownTopDetails>{user.email}</DropdownTopDetails>
                  <DropdownTopDetails>
                    {capitalizeString(user.role[0])} at {organizationName}
                  </DropdownTopDetails>
                </DropdownTopOverflow>
              </DropdownTop>
              {dropdownLinks.map(item => (
                <li key={item.path}>
                  <DropdownListItemLink
                    to={
                      item.path === '/account/profile/'
                        ? `${item.path}${user.id}`
                        : item.path
                    }
                  >
                    {item.icon()} {item.text}
                  </DropdownListItemLink>
                </li>
              ))}
              <DropdownTopDivider />
              <li onClick={() => this.handleSignoutClick()}>
                <DropdownListItem>
                  <LogoutIcon /> Log out
                </DropdownListItem>
              </li>
            </DropdownList>
          )}
        </Transition>
      </PrimaryNavDropdownContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  organizationName: state.configs.app.config.name,
});

export default connect(mapStateToProps)(PrimaryNavDropdown);
