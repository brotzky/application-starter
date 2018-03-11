import { updateProductApplication } from 'grow-actions/product-applications/product-applications';

/**
 * Handle claiming of an application
 * @param {function} dispatch redux dispatch
 * @param {object} Application object of functions from productApplication grow-app-utils/productApplicationUtils
 * @param {string} userEmail email address of the user
 */
export const handleClaimClick = (dispatch, Application, userEmail) => {
  const applicationId = Application.getId();
  const requestBody = { primaryRep: userEmail, currentStep: null };

  return dispatch(updateProductApplication(applicationId, requestBody));
};

/**
 * Handle unclaiming of an application
 * @param {function} dispatch redux dispatch
 * @param {string} Application productApplication from grow-app-utils/productApplicationUtils
 */
export const handleUnclaimClick = (dispatch, Application) => {
  const applicationId = Application.getId();
  const requestBody = { primaryRep: 'unclaimed', currentStep: null };

  return dispatch(updateProductApplication(applicationId, requestBody));
};
