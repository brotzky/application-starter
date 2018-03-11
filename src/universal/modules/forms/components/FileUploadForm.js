import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayPush, change } from 'redux-form';
import { dispatchFileToUpload } from 'grow-utils/fileUploadUtils';
import {
  notificationEdit,
  notificationPush,
} from '../../ui/notifications/actions/';
import { getProfile } from 'grow-actions/member/member';
import { capitalizeString } from 'grow-utils/stringFormatting';

function FileUploadForm(wrappedProps) {
  const { documentType, form, getProfilesOnSuccess } = wrappedProps;

  return function FileUploadFormWrapper(WrappedComponent) {
    class FileUploadFormClass extends Component {
      constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
      }

      componentWillUpdate(nextProps) {
        const { dispatch, files: { list }, member, notifications } = nextProps;
        const { files: { list: prevList } } = this.props;

        list.forEach((file, index, allFiles) => {
          const prevFile = prevList.find(item => item.name === file.name);
          const notification = notifications.find(n => n.id === file.name);
          const allFilesUploaded = allFiles.every(f => f.uploaded);

          if (file && prevFile) {
            if (file.progress !== prevFile.progress && notification) {
              return dispatch(
                notificationEdit({
                  id: notification.id,
                  file,
                }),
              );
            }

            if (file.uploaded !== prevFile.uploaded && notification) {
              const fileUploadFailed = file.uploaded === false;
              dispatch(
                notificationEdit({
                  dismissAfter: 3000,
                  id: notification.id,
                  file,
                  message: fileUploadFailed
                    ? `Failed to upload ${capitalizeString(
                        form,
                        '-',
                        ' ',
                      )} file`
                    : `Successfully uploaded ${capitalizeString(
                        form,
                        '-',
                        ' ',
                      )} file`,
                }),
              );

              if (
                getProfilesOnSuccess &&
                !fileUploadFailed &&
                allFilesUploaded
              ) {
                dispatch({ type: 'DISMISS_FILES' });
                dispatch(getProfile(member.id));
              }
            }
          }
        });
      }

      handleFileUpload(files, fieldName) {
        const { dispatch, files: { list: stateFiles }, member } = this.props;

        if (files && files.length > 1) {
          const filesArr = Array.from(files);
          filesArr.forEach(file => {
            dispatch(arrayPush(form, fieldName, file));
            dispatch(
              notificationPush({
                documentType,
                file,
                id: file.name,
                kind: 'upload',
                message: `Uploading ${capitalizeString(form, '-', ' ')} file`,
              }),
            );
          });
        } else {
          dispatch(change(form, fieldName, files));
          dispatch(
            notificationPush({
              documentType,
              id: files[0].name,
              file: files[0],
              kind: 'upload',
              message: `Uploading ${capitalizeString(form, '-', ' ')} file`,
            }),
          );
        }

        return dispatchFileToUpload(
          stateFiles,
          files,
          fieldName,
          documentType,
          member.id,
          dispatch,
          false,
        );
      }

      render() {
        return <WrappedComponent handleFileUpload={this.handleFileUpload} />;
      }
    }

    const mapStateToProps = state => ({
      files: state.files,
      member: state.member.member,
      notifications: state.notifications,
    });

    return connect(mapStateToProps)(FileUploadFormClass);
  };
}

export default FileUploadForm;
