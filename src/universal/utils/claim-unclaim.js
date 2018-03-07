import {
  notificationPush,
  notificationEdit,
} from '../modules/ui/notifications/actions/';
import { updateProductApplication } from 'grow-actions/product-applications/product-applications';
import { GET_WORKBENCH_REQUEST } from 'grow-actions/workbench/constants';

/**
 * Handle claiming of an application
 * @param {function} dispatch redux dispatch
 * @param {object} Application object of functions from productApplication grow-app-utils/productApplicationUtils 
 * @param {string} userEmail email address of the user
 */
export const handleClaimClick = (dispatch, Application, userEmail) => {
  const applicationId = Application.getId();
  const applicationName = Application.getPrettyName();
  const requestBody = { primaryRep: userEmail, currentStep: null };

  dispatch(
    notificationPush({
      id: applicationId,
      message: `Claiming ${applicationName} application`,
      kind: 'loading',
    }),
  );

  return dispatch(
    updateProductApplication(applicationId, requestBody),
  ).then(response => {
    dispatch(
      notificationEdit({
        id: applicationId,
        message: response.error
          ? `Could not claim ${applicationName}`
          : `Claimed ${applicationName} application`,
        kind: response.error ? 'error' : 'success',
        dismissAfter: 3000,
      }),
    );
  });
};

/**
 * Handle unclaiming of an application
 * @param {function} dispatch redux dispatch
 * @param {string} Application productApplication from grow-app-utils/productApplicationUtils 
 */
export const handleUnclaimClick = (dispatch, Application) => {
  const applicationId = Application.getId();
  const applicationName = Application.getPrettyName();
  const requestBody = { primaryRep: 'unclaimed', currentStep: null };

  dispatch(
    notificationPush({
      id: applicationId,
      message: `Unclaiming ${applicationName} application`,
      kind: 'loading',
    }),
  );

  return dispatch(
    updateProductApplication(applicationId, requestBody),
  ).then(response => {
    dispatch(
      notificationEdit({
        id: applicationId,
        message: response.error
          ? `Could not unclaim ${applicationName}`
          : `Unclaimed ${applicationName} application`,
        kind: response.error ? 'error' : 'success',
        dismissAfter: 3000,
      }),
    );
  });
};
