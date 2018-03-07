import React, { Component } from 'react';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import * as Products from '../../';

class ProductShell extends Component {
  render() {
    const { params } = this.props;
    return (
      <div className="ProductShell Container">
        {(() => {
          if (
            params.productCategory === 'personal_loan' ||
            params.productCategory === 'personal-loan'
          ) {
            const Product = Products.LoanBook;
            return <Product {...this.props} />;
          } else {
            return null;
          }
        })()}
      </div>
    );
  }
}

export default AuthWrapper(ProductShell);
