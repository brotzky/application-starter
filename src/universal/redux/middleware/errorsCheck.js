import {
  GET_ROLES_FAILURE,
  GET_ROLE_FAILURE,
  CREATE_ROLE_FAILURE,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE_FAILURE,
} from 'grow-actions/roles/constants';

import { GET_PRODUCTS_FAILURE } from 'grow-actions/products/constants';
import {
  GET_PRODUCT_APPLICATIONS_FAILURE,
  UPDATE_PRODUCT_APPLICATIONS_FAILURE,
  GET_PRODUCT_APPLICATIONS_STEPS_FAILURE,
  UPDATE_PRODUCT_APPLICATIONS_STEPS_FAILURE,
  PROCEED_PRODUCT_APPLICATIONS_STEPS_FAILURE,
  PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_FAILURE,
} from 'grow-actions/product-applications/constants';

import {
  GET_MEMBER_FAILURE,
  GET_MEMBER_PROFILE_FAILURE,
  UPDATE_MEMBER_PROFILE_FAILURE,
  UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE,
} from 'grow-actions/member/constants';

import {
  GET_USERS_FAILURE,
  GET_USER_FAILURE,
  CREATE_USER_FAILURE,
  UPDATE_USER_FAILURE,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_FAILURE,
} from 'grow-actions/user/constants';

import {
  AUTH_CHECK_FAILURE,
  AUTH_FAILURE,
  AUTH_ONE_TIME_PASS_FAILURE,
} from 'grow-actions/auth/constants';

import {
  notificationPush,
  notificationEdit,
} from '../../modules/ui/notifications/actions/';

/**
 * The amount of time an error is displayed on the page before automatically dismissed
 */
const errorTimeout = 20000;

export const errorsCheck = store => next => action => {
  const error = action.type.includes('FAILURE')
    ? (action.payload.errors &&
        action.payload.errors.length === 1 &&
        action.payload.errors[0]) ||
      action.payload.errors
    : '';
  const statusCode = action.payload && action.payload.statusCode;
  let payload = {};
  const state = store.getState();
  if (statusCode === 500) {
    payload = {
      message: `Internal Server Error`,
      reason: 'Something went wrong on our end.',
      suggestedActions: [
        "Try reloading the page. If that doesn't work, check your internet connection.",
        'Check the URL. Invalid URL could result in this.',
        'If this error persists, please contact your administrator to report this issue.',
      ],
    };
  }

  switch (action.type) {
    // AUTH
    case AUTH_ONE_TIME_PASS_FAILURE:
      switch (error) {
        case 'LOGIN_FAILED':
          payload = {
            message: `One Time Password Failure`,
            reason: 'Failed to obtain one time password',
            suggestedActions: [
              'Please check your input and network',
              'You may not have an account with us',
              'Contact your administrator to reset your password',
            ],
          };
          break;
        default:
          payload = {
            message: `One Time Password Failure`,
            reason: 'Failed to authenticate with the one time password',
            suggestedActions: [
              'Please check your input',
              'You may not have an account with us',
              'Contact your administrator about your one-time password',
            ],
          };
      }
      break;
    case AUTH_FAILURE:
      switch (error) {
        case 'LOGIN_FAILED':
          payload = {
            message: `Authentication Failure`,
            reason: 'Failed to authenticate your session',
            suggestedActions: [
              'You may have clicked on an expired One-time Password link',
              'You may not have an account with us',
              'Please check your input and network',
            ],
          };
          break;
        default:
          payload = {
            message: `Authentication Failure`,
            reason: 'Failed to authenticate your sesseion',
            suggestedActions: [
              'You may have clicked on an expired One-time Password link',
              'You may not have an account with us',
              'Please check your input and network',
            ],
          };
      }
      break;
    case AUTH_CHECK_FAILURE:
      switch (error) {
        case 'LOGIN_FAILED':
          /**
           *  Won't show error notifications when user is loading login directly
           *  That includes when they are redirected from '/' or after logout
           *  Only show it when user trying to access from other endpoint without logging in
           */
          if (
            state.router.location &&
            state.router.location.pathname === '/login'
          ) {
            payload = {};
          } else {
            payload = {
              message: `The page you requested requires login`,
              reason: 'Please log in to continue',
            };
          }

          break;
        case 'LOGIN_REQUIRED':
          payload = {
            message: `Login required`,
            reason: 'Please log in to continue',
          };
          break;
        case 'INVALID_PASSWORD':
          payload = {
            message: `Invalid password`,
            reason: 'The password you entered is invalid',
            suggestedActions: [
              'Please try again, or',
              'Contact your administrator to reset your password',
            ],
          };
          break;
        case 'SESSION_TIMEOUT':
          payload = {
            message: `Your session has timed out due to long periods of inactivity`,
            reason: 'Please log in again to continue',
          };
          break;
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Internal Server Error. Please try again`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while checking authorization`,
          };
      }
      break;
    // END OF AUTH

    // USER
    case CREATE_USER_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to create ${
              state.form['create-user'].values.firstName
            }'s profile`,
          };
          break;
        case 'USER_ALREADY_EXISTS':
          payload = {
            message: `Failed to create ${
              state.form['create-user'].values.firstName
            }'s profile`,
            reason: 'User already exists',
            suggestedActions: [
              'Refer to the list of existing users, available under Settings > Users, or',
              'Enter a different email',
            ],
          };
          break;
        case 'EMAIL_ALREADY_USED':
          payload = {
            message: `Failed to create ${
              state.form['create-user'].values.firstName
            }'s profile.`,
            reason: 'Email address already in use',
            suggestedActions: ['Enter a different email address'],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while creating user`,
          };
      }
      break;

    case UPDATE_USER_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update ${
              action.payload.data.user.firstName
            }'s profile`,
          };
          break;
        case 'USER_DOES_NOT_EXIST':
        case 'USER_NOT_FOUND':
          payload = {
            message: `Failed to update ${
              action.payload.data.user.firstName
            }'s profile.`,
            reason: 'User does not exist',
            suggestedActions: [
              'Make sure this user exists by referring to the list of existing users, available under Settings > Users',
            ],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating user's profile`,
          };
      }
      break;

    case GET_USER_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get user: ${
              action.payload.data.user.firstName
            }`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting user list`,
          };
      }
      break;

    case GET_USERS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get users`,
          };
          break;
        default:
          payload = {
            message: `GET USERS FAILURE`,
          };
      }
      break;

    case GET_USER_PROFILE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get ${
              action.payload.data.user.firstName
            }'s profile`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting user's profile`,
          };
      }
      break;

    case UPDATE_USER_PROFILE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update ${
              action.payload.data.user.firstName
            }'s profile`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating user's profile`,
          };
      }
      break;
    // END OF USER

    // MEMBER
    case GET_MEMBER_FAILURE:
      switch (error) {
        case 'SESSION_TIMEOUT':
          payload = {
            message: `Your session has timed out due to long periods of inactivity`,
            reason: 'Please log in again',
          };
          break;
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to retrieve member: ${
              action.payload.data.user.firstName
            }`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting member list`,
          };
      }
      break;

    case GET_MEMBER_PROFILE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get member's profile`,
          };
          break;
        case 'MISSING_METADATA_FIELD':
          payload = {
            message: `Failed to retrieve some of the member's information`,
            reason: 'Some required information is missing',
            suggestedActions: [
              "Try reloading the page. If that doesn't work, check your internet connection",
            ],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting member's profile`,
          };
      }
      break;

    case UPDATE_MEMBER_PROFILE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update applicant's profile`,
          };
          break;
        case 'USER_DOES_NOT_EXIST':
        case 'USER_NOT_FOUND':
          switch (error) {
            case 'INTERNAL_SERVER_ERROR':
              payload = {
                message: `Failed to update Applicant's profile. Profile does not exist`,
              };
              break;
            default:
              payload = {
                message: `Failed to update applicant's profile`,
              };
          }
          break;
        default:
          payload = {
            message: `Something went wrong while updating applicant's profile`,
          };
      }
      break;
    // END OF MEMBER

    // PRODUCT APPLICATIONS
    case UPDATE_PRODUCT_APPLICATIONS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update product applications`,
            reason: 'User does not exist',
            suggestedActions: [
              'Make sure this user exists by referring to the list of existing users, available under Settings > Users',
            ],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating product applications`,
          };
      }
      break;

    case GET_PRODUCT_APPLICATIONS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get product applications`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting product applications`,
          };
      }
      break;

    case GET_PRODUCT_APPLICATIONS_STEPS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get product applications steps`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting product applications steps`,
          };
      }
      break;

    // METADATA
    case UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE:
      switch (error) {
        case 'INVALID_METADATA':
          payload = {
            message: `Failed to update applicants information`,
            reason: 'Invalid data format received',
            suggestedActions: [
              'Please make sure the formatted data is correct',
              'If the issue persists please contact support',
            ],
          };
          break;
        case 'ATTEMPT_TO_UPDATE_LOCKED_METADATA':
          payload = {
            message: `Failed to update applicants information`,
            reason:
              'This application is not authorized to update information at this time',
            suggestedActions: [
              'The application state could be Inquiry or Loan quote',
              'The application is declined or not active',
            ],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating applicant's information`,
          };
      }
      break;

    case UPDATE_PRODUCT_APPLICATIONS_STEPS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update product applications steps`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating product applications steps`,
          };
      }
      break;

    // backend may return an array of errors
    case PROCEED_PRODUCT_APPLICATIONS_STEPS_FAILURE:
    case PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_FAILURE:
      if (error.includes('ACCOUNT_CREATION_ERROR')) {
        payload = {
          message: `Failed to create account in DNA: Error occurred while opening account`,
          reason: action.payload.errorMessage || '',
          suggestedActions: ['Investigation required'],
        };
      } else if (error.includes('EAGREEMENT_ERROR')) {
        payload = {
          message: `Failed to create account in DNA: Error occurred during EAgreement step`,
          reason: action.payload.errorMessage || '',
          suggestedActions: ['Investigation required'],
        };
      } else if (error.includes('NOTE_ERROR')) {
        payload = {
          message: `Failed to create account in DNA: Error occurred while creating notes`,
          reason: action.payload.errorMessage || '',
          suggestedActions: ['Investigation required'],
        };
      } else if (error.includes('PERSON_ERROR')) {
        payload = {
          message: `Failed to create account in DNA: Error occurred while creating person`,
          reason: action.payload.errorMessage || '',
          suggestedActions: ['Investigation required'],
        };
      } else if (error.includes('GROW_BANKING_RESPONSE_ERROR')) {
        payload = {
          message: `Failed to create account in DNA: Error occurred in proceeding Admin Step`,
          reason: action.payload.errorMessage || '',
          suggestedActions: ['Investigation required'],
        };
      } else if (
        error.includes('VERIFICATIONS_HAVE_NOT_ALL_PASSED') ||
        error.includes('COULD_NOT_PROCEED_TO_NEXT_STEP')
      ) {
        payload = {
          message: `Failed to process step action`,
          reason: 'There may be unresolved checklist items',
          suggestedActions: [
            'Please resolve all checklist items and try completing the review step again',
          ],
        };
      } else if (error.includes('INTERNAL_SERVER_ERROR')) {
        payload = {
          message: `Failed to get product applications`,
        };
      } else {
        payload = {
          message: `Failed to process step action`,
          reason: 'Our system was unable to proceed to the next step',
          suggestedActions: [
            'Confirm all previous steps have been completed',
            'Double check the action you are attempting to do is allowed in the current step',
          ],
        };
      }
      break;
    // END OF PRODUCT APPLICATIONS

    // ROLES
    case GET_ROLES_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get roles`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting role list`,
          };
      }
      break;

    case GET_ROLE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get role for ${
              state.form['create-user'].values.firstName
            }`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting role for the user`,
          };
      }
      break;

    case CREATE_ROLE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to create role for ${
              state.form['create-user'].values.firstName
            }`,
          };
          break;
        case 'NO_PERMISSION':
          payload = {
            message: `Request denied`,
            reason:
              'Your assigned role does not have permissions to create roles',
            suggestedActions: [
              'Contact your administrator and request permission',
            ],
          };
          break;
        default:
          payload = {
            message: `Something went wrong while creating a role for the user`,
          };
      }
      break;

    case UPDATE_ROLE_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to update role for ${
              state.form['create-user'].values.firstName
            }`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while updating the role for the user`,
          };
      }
      break;

    case DELETE_ROLE_FAILURE:
      switch (error) {
        // Add in error case for existing users with that role
        case 'USER_ROLE_EXISTS':
          payload = {
            message: `Failed to delete role`,
            reason: 'There are existing users associated with this role.',
            suggestedActions: [
              'Assign a different role to all users associated with this role, then try again.',
            ],
          };
          break;
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to delete role for ${
              state.form['create-user'].values.firstName
            }`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while deleting the user`,
          };
      }
      break;
    // END OF ROLES

    // PRODUCTS
    case GET_PRODUCTS_FAILURE:
      switch (error) {
        case 'INTERNAL_SERVER_ERROR':
          payload = {
            message: `Failed to get product list`,
          };
          break;
        default:
          payload = {
            message: `Something went wrong while getting the product list`,
          };
      }
      break;
    // END OF PRODUCTS

    default:
  }

  if (error === 'NO_PERMISSION') {
    payload.message = 'Permission required';
    payload.reason = 'You do not have permission to view or edit';
    payload.suggestedActions = [
      'Please ask an administrator to adjust your permissions if you wish to continue',
    ];
  }

  // Check if payload is empty. We don't want to dispatch empty payload to notification for every single action!
  if (Object.keys(payload).length) {
    payload.kind = 'error';

    if (error === 'INTERNAL_SERVER_ERROR') {
      /**
       * In the case of an internal server error, disable auto-dismiss
       */
      payload.reason = 'Something went wrong on our end.';
      payload.suggestedActions = [
        "Try reloading the page. If that doesn't work, check your internet connection.",
        'Check the URL. Invalid URL could result in this.',
        'If this error persists, please contact your administrator to report this issue.',
      ];
    } else {
      payload.dismissAfter = errorTimeout;
    }

    payload.dismissAfter = errorTimeout;
    action.type === UPDATE_USER_PROFILE_FAILURE ||
    action.type === UPDATE_ROLE_FAILURE
      ? store.dispatch(notificationEdit(payload))
      : store.dispatch(notificationPush(payload));
  }
  return next(action);
};
