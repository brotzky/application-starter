// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';
import { dispatchFileToUpload } from 'grow-utils/fileUploadUtils';
import { Upload, CheckCircleFilled } from '../../ui/icons/';
import Spinner from '../../ui/Spinner';

const FileUploadContainer = styled.div`width: 100%;`;

const UploadWrapper = styled.div`
  align-items: center;
  background: ${props => `no-repeat center/cover url(${props.imagePreview})`};
  border-radius: 2px;
  display: flex;
  min-height: 280px;
  border-radius: 6px;
  justify-content: center;
  overflow: hidden;
  padding: ${props => `${props.theme.space / 2}rem`};
  z-index: 1;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
`;

const UploadOverlay = styled.div`
  background: ${props => (props.failed ? '#f44336' : 'black')};
  height: 100%;
  left: 0;
  opacity: ${props => (props.visible ? (props.failed ? 0.75 : 0.5) : 0)};
  position: absolute;
  top: 0;
  transition: all 0.15s ease-in-out;
  width: 100%;
  z-index: -1;
`;

const UploadStatusText = styled.div`
  color: white;
  font-size: 2.2rem;
  text-align: center;
`;

const LoaderWrapper = styled.div`
  div > div {
    background: ${props => props.theme.colors.primary};
  }
`;

const StyledDropzoneContainer = styled.div`display: flex;`;

const StyledDropzone = styled(Dropzone)`
  position: relative;
  border: 2px dashed #d8d8d8;
  padding: 1.5rem;
  margin: 4rem auto;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
  width: 100%;
  max-width: 700px;
  height: 330px;

  &:hover {
    border-color: ${props => props.theme.colors.blue};
    background: rgba(68, 138, 255, 0.025);
  }
`;

const StyledDropzoneBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: url(/static/img/fields/file-upload/upload-photos-ghosts.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
  height: 100%;
`;

const FileUploadSucecssContainer = styled.div`
  padding: 2rem;
  background: white;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.2);
  border-radius: 6px;
  color: black;
  font-size: 1.5rem;
  text-align: left;
  opacity: 0.96;
`;
const FileUploadSucecssHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  text-transform: uppercase;
`;

const FileUploadSucecssHeaderText = styled.div`margin-left: 10px;`;

class FileUpload extends PureComponent {
  state = { updated: false };
  handleDrop = (files, rejectedFiles) => {
    const {
      currentFiles = [],
      dispatch,
      documentType,
      input,
      memberId,
    } = this.props;
    // TODO refactor the alert into something more sophistacted
    if (rejectedFiles.length) {
      alert(
        'This file type is not supported. Please upload any of the following supported file types: JPG, JPEG, PNG, GIF, PDF.',
      );
    }
    dispatchFileToUpload(
      currentFiles,
      files,
      input.name,
      documentType,
      memberId,
      dispatch,
    );

    input.onChange(files);
  };

  renderUploading() {
    const { currentFiles = [], formValues, input = {}, meta = {} } = this.props;
    const currentFormValues = formValues(meta.form);
    if (!currentFormValues[input.name]) {
      return null;
    }

    const fileBlob = currentFormValues[input.name];
    const fileName = fileBlob[0] && fileBlob[0].name;
    const files = currentFiles.filter(
      f =>
        f.name &&
        f.name.slice(8, f.name.length) === fileName &&
        f.fieldName === input.name,
    );
    const file = files[files.length - 1];

    if (file) {
      const isUploading = file.progress !== 100;
      const failed = file.uploaded === false;
      const isAnalyzing = !failed && file.uploaded !== true;
      const isUploaded = file.uploaded === true;

      if (file && isUploaded && !this.state.updated) {
        fileBlob[0].verificationMsg = file.verificationMsg;

        this.props.dispatch(change('workbench', file.fieldName, fileBlob));
        this.setState({ updated: true });
      }

      if (isUploading) {
        this.setState({ updated: false });
      }

      return (
        <UploadWrapper
          imagePreview={fileBlob[0].preview || file.preview}
          isUploading={isUploading}
        >
          <UploadOverlay failed={failed} visible={isAnalyzing || failed} />
          <UploadStatusText>
            {isUploading ? 'Uploading...' : ''}
            {!isUploading && isAnalyzing ? 'Analyzing...' : ''}
            {failed ? 'Failed to upload, please try again' : ''}
            {isAnalyzing &&
            !failed && (
                <LoaderWrapper>
                  <Spinner />
                </LoaderWrapper>
              )}
            {isUploaded &&
            !failed && (
                <FileUploadSucecssContainer>
                  <FileUploadSucecssHeader>
                    <CheckCircleFilled height="24" width="24" />
                    <FileUploadSucecssHeaderText>
                    File upload success
                    </FileUploadSucecssHeaderText>
                  </FileUploadSucecssHeader>
                </FileUploadSucecssContainer>
              )}
          </UploadStatusText>
        </UploadWrapper>
      );
    }

    return null;
  }

  render() {
    const { input = {}, label = '', meta = {} } = this.props;
    const { value } = input;
    return (
      <FormField>
        <FileUploadContainer>
          <FieldLabel label={label} meta={meta} value={value} />
          <StyledDropzoneContainer>
            <StyledDropzone
              onDrop={this.handleDrop}
              activeStyle={{ borderCoor: '#448aff' }}
            >
              <StyledDropzoneBackground>
                <Upload />
                Drop files here to upload or choose file
              </StyledDropzoneBackground>
              {this.renderUploading()}
            </StyledDropzone>
          </StyledDropzoneContainer>
        </FileUploadContainer>
      </FormField>
    );
  }
}

const mapStateToProps = state => ({
  currentFiles: state.files.list,
  formValues: formName => getFormValues(formName)(state),
  memberId: state.member.member.id,
});

export default connect(mapStateToProps)(FileUpload);
