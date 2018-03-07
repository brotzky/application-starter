import React from 'react';
import { Link } from 'react-router-dom';
import AuthWrapper from '../../auth/containers/AuthWrapper';

const NotFound = () => (
  <div className="NotFound Card">
    <h1 className="NotFound__title">404 Page Not Found</h1>
    <h4 className="NotFound__text">Oops! We couldn't find this page.</h4>
    <h5 className="NotFound__redirect-button">
      <Link to="/applications" className="c-button c-button--pri">
        <span>Go to Applications</span>
      </Link>
    </h5>
  </div>
);

export default AuthWrapper(NotFound);
