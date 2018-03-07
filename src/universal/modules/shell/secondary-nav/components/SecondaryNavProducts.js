import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { productApplication } from 'grow-utils/productApplicationUtils';
import JointIcons from '../../../ui/joint-icons/';
import { ChevronDown } from '../../../ui/icons/';
import moment from 'moment';

const getServingApplications = productApplications =>
  productApplications.filter(
    application => application.currentStep === 'serving',
  );
const SecondaryNavProducts = ({ member, org }) => {
  const servingApps = getServingApplications(member.productApplications);
  const firstProductLink = servingApps.length
    ? productApplication(org, servingApps[0]).getProductLink()
    : `/members/${member.member.id}/product/personal-loan/not-found`;
  const moreThanOneApp = servingApps.length > 1;

  /**
   * Commenting out the product page until it's required to come back in.
   * This is throwing a 404 page if it's not a personal loan. For example,
   * Eagle does not need the product page.
   */
  return (
    <li className="SecondaryNavList__item">
      {/* {      <Link
        className="SecondaryNavList__link"
        activeClassName="SecondaryNavList__link--active"
        to={firstProductLink}
      >
        {`Product${moreThanOneApp ? 's' : ''}`}
        {moreThanOneApp ? (
          <ChevronDown className="SecondaryNavList__chevron" />
        ) : (
          ''
        )}
      </Link>

      {moreThanOneApp ? (
        <ul className="SecondaryNavListNested">
          {member.productApplications.map(application => {
            const Application = productApplication(org, application);
            const productLink = Application.getProductLink();
            return productLink ? (
              <li className="SecondaryNavList__item" key={application.id}>
                <Link className="SecondaryNavList__link" to={productLink}>
                  Product
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      ) : null}} */}
    </li>
  );
};

export default SecondaryNavProducts;
