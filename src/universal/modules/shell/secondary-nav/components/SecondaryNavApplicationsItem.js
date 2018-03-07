import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productApplication } from 'grow-utils/productApplicationUtils';
import JointIcons from '../../../ui/joint-icons/';
import moment from 'moment';

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
    <li className="SecondaryNavListNested__item" key={application.id}>
      <Link
        className={`SecondaryNavListNested__link ${
          isActiveApplication ? 'SecondaryNavListNested__link--active' : ''
        }`}
        to={workbenchLink}
      >
        <div className="SecondaryNavListNested__product">
          <JointIcons application={application} />
          <div>{application.prettyName}</div>
        </div>
        <div className="SecondaryNavListNested__date">
          {maskedStatus}
          {' – '}
          {moment(application.dateCreated).format('MMM D YYYY, h:mm a')}
        </div>
      </Link>
    </li>
  );
};

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNavApplicationsItem);
