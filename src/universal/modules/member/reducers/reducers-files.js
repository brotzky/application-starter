import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_UPDATE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_PROFILE_PICTURE_FILE_SUCCESS,
} from 'grow-actions/upload-file/constants';

const initialState = {
  errors: [],
  isUploading: false,
  list: [],
};

export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        isUploading: true,
        list: [...state.list, action.payload.file],
      });
    case UPLOAD_FILE_UPDATE:
      return Object.assign({}, state, {
        list: state.list.map(file => {
          if (file && file.name === action.payload.name) {
            return Object.assign({}, file, action.payload);
          }
          return file;
        }),
      });
    case UPLOAD_FILE_SUCCESS:
    case UPLOAD_PROFILE_PICTURE_FILE_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isUploading: false,
        list: state.list.map(file => {
          if (file && file.name === action.payload.file.name) {
            return Object.assign({}, file, {
              ...action.payload.file,
              uploaded: true,
            });
          }
          return file;
        }),
      });
    case UPLOAD_FILE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUploading: false,
        list: state.list.map(file => {
          if (file && file.name === action.payload.file.name) {
            return {
              ...action.payload.file,
              uploaded: false,
            };
          }
          return file;
        }),
      });
    case 'DISMISS_FILES':
      return Object.assign({}, state, {
        list: [],
      });
    default:
      return state;
  }
}
