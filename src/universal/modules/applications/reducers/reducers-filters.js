import {
  ADD_SELECTED_FILTER,
  UPDATE_SELECTED_FILTER,
  DELETE_SELECTED_FILTER,
} from './constants';

export const filterOptions = {
  applicant: {
    applicantFirstName: {
      label: 'Applicant First Name',
      type: 'string',
    },
    applicantLastName: {
      label: 'Applicant Last Name',
      type: 'string',
    },
    applicantEmail: {
      label: 'Applicant Email',
      type: 'string',
    },
    applicantIsExisting: {
      label: 'Existing User',
      type: 'bool',
      options: [
        { label: 'Is Existing', value: true },
        { label: 'Is Not Existing', value: false },
      ],
    },
    applicantAccountlocked: {
      label: 'Applicant Account Locked',
      type: 'bool',
      options: [
        { label: 'Locked', value: true },
        { label: 'Not Locked', value: false },
      ],
    },
  },
  application: {
    primaryRep: {
      label: 'Claimed',
      type: 'select',
      options: [],
      multiple: false,
    },
    id: {
      label: 'Application ID',
      type: 'string',
    },
    adminSteps: {
      label: 'Admin Steps',
      type: 'select',
      options: [],
      multiple: true,
    },
    currentSteps: {
      label: 'Current Step',
      type: 'select',
      options: [],
      multiple: true,
    },
    dateCreated: {
      label: 'Date Created',
      type: 'date',
    },
    productCategories: {
      label: 'Product Name',
      type: 'select',
      options: [],
      multiple: true,
    },
    state: {
      label: 'State',
      type: 'bool',
      options: [
        { label: 'Active', value: true },
        { label: 'Declined', value: false },
      ],
    },
    lastVisited: {
      label: 'Date last visited',
      type: 'date',
    },
  },
  primary_rep: {
    primaryRepEmail: {
      label: 'Primary Rep Email',
      type: 'string',
    },
    primaryRepFirstName: {
      type: 'string',
      label: 'Primary Rep First Name',
    },
    primaryRepLastName: {
      type: 'string',
      label: 'Primary Rep Last Name',
    },
  },
};
const initialState = {
  selected: {},
  filterOptions,
};

const filtersReducer = (state = initialState, action) => {
  const { key, value, item } = action;
  switch (action.type) {
    case ADD_SELECTED_FILTER:
      const found = Object.keys(state.selected).find(select => {
        return select === key;
      });
      if (!found) {
        return {
          ...state,
          selected: {
            ...state.selected,
            [key]: { ...item },
          },
        };
      }
      return state;
    case UPDATE_SELECTED_FILTER:
      return {
        ...state,
        selected: Object.assign({}, state.selected, {
          [key]: { ...state.selected[key], value },
        }),
      };
    case DELETE_SELECTED_FILTER:
      return {
        ...state,
        selected: Object.keys(state.selected).reduce((obj, objKey) => {
          if (objKey !== key) {
            return { ...obj, [objKey]: state.selected[objKey] };
          }
          return obj;
        }, {}),
      };

      break;
    default:
      return state;
  }
};

export default filtersReducer;
