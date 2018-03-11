import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_UPDATE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
  DELETE_FROM_LIST,
} from 'grow-actions/upload-file/constants';

const initialState = {
  errors: [],
  isUploading: false,
  list: {},
  isDeleting: false,
};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        isUploading: true,
        list: Object.assign({}, state.list, {
          [action.payload.file.fieldName]: action.payload.file,
        }),
      });
    case UPLOAD_FILE_UPDATE:
      return Object.assign({}, state, {
        isUploading: true,
        list: Object.assign({}, state.list, {
          [action.payload.fieldName]: {
            ...state.list[action.payload.fieldName],
            progress: action.payload.progress,
          },
        }),
      });
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isUploading: false,
        list: Object.assign({}, state.list, {
          [action.payload.file.fieldName]: {
            ...action.payload.file,
            uploaded: true,
          },
        }),
      });

    case UPLOAD_FILE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUploading: false,
        list: Object.assign({}, state.list, {
          [action.payload.file.fieldName]: {
            ...action.payload.file,
            uploaded: false,
          },
        }),
      });

    case DELETE_FILE_REQUEST:
      return Object.assign({}, state, {
        isDeleting: true,
      });
    case DELETE_FILE_SUCCESS:
      return Object.assign({}, state, {
        isDeleting: false,
      });
    case DELETE_FILE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isDeleting: false,
      });
    case DELETE_FROM_LIST:
      const { [action.payload.fieldName]: omit, ...rest } = state.list;
      return Object.assign({}, state, {
        list: rest,
      });
    case 'DISMISS_FILES':
      return Object.assign({}, state, {
        list: [],
      });
    default:
      return state;
  }
}
