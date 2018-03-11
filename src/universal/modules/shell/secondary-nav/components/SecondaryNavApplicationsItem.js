import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { productApplication } from 'grow-utils/productApplicationUtils';
import JointIcons from '../../../ui/joint-icons/';
import {
  SecondaryNavListNestedProduct,
  SecondaryNavListNestedDate,
} from 'gac-utils/sc';

const NestedNavLink = styled(Link)`
  display: block;
  padding: 0.8rem 2.4rem;
  border-left: 3px solid
    ${props => (props.active ? props.theme.colors.blue : 'transparent')};
  font-size: ${props => props.theme.font.size2};
  color: #747b7d;
  transition: all 300ms ease;
  background: ${props => (props.active ? '#ebf4fd' : '#fff')};
`;

const SecondaryNavApplicationsItem = ({
  application,
  activeId,
  params,
  org,
}) => {
  const Application = productApplication(org, application);
  const workbenchLink = Application.getWorkbenchLink(activeId);
  const maskedStatus = Application.getMaskedStatus();
  const isActiveApplication = application.id === params.workbenchId;

  return (
    <li key={application.id}>
      <NestedNavLink to={workbenchLink} active={isActiveApplication}>
        <SecondaryNavListNestedProduct>
          <JointIcons application={application} />
          <div>{application.prettyName}</div>
        </SecondaryNavListNestedProduct>
        <SecondaryNavListNestedDate>
          {maskedStatus}
          {' – '}
          {moment(application.dateCreated).format('MMM D YYYY, h:mm a')}
        </SecondaryNavListNestedDate>
      </NestedNavLink>
    </li>
  );
};

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNavApplicationsItem);
