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
import { Spinner } from 'gac-ui/components/';
import { DELETE_FROM_LIST } from 'grow-actions/upload-file/constants';
import { getMemberProductApplicationMetadata } from 'grow-actions/member/member-category-metadata';

const FileUploadContainer = styled.div`
  width: 100%;
`;

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

const StyledDropzoneContainer = styled.div`
  display: flex;
`;

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
    border-color: ${props =>
      props.disabled ? props.theme.colors.grey : props.theme.colors.blue};
    ${props => props.disabled && `background: rgba(68, 138, 255, 0.025)`};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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

const FileUploadSucecssHeaderText = styled.div`
  margin-left: 10px;
`;

// ENUM mapping from white-label
const veriTextMap = new Map();
veriTextMap.set('BLUR', 'Blurry Image');
veriTextMap.set('LOW_FACE_CONFIDENCE', 'Blurry Image');
veriTextMap.set('NAME_TOO_SHORT', 'Failed Image');
veriTextMap.set('NOFACE', 'No Face');
veriTextMap.set('MISSING_PERSON_CONFIDENCE_LEVEL', 'ID Verification Failed');
veriTextMap.set('ALL_BELOW_THRESHOLD', 'Verification Failed');
veriTextMap.set('UNKNOWN_REASON', 'Verification Failed');
veriTextMap.set('NO_ID', 'Not an ID');
veriTextMap.set('NO_ID_NO_FACE', 'No Face Identified');
veriTextMap.set('NO_TEXT_PRESENT', 'Illegible Text');
veriTextMap.set('NO_MATCHING_TEXT', 'Name Unclear');
veriTextMap.set('LOW_MATCHING_RATIO', 'Name Unclear');
veriTextMap.set('UNREADABLE', 'Unreadable Image');
veriTextMap.set('UNVERIFIABLE', 'Verification Failed');
class FileUpload extends PureComponent {
  componentWillUnmount() {
    const { dispatch } = this.props;
    const file = this.getLastFileDetails(this.props);
    if (file) {
      dispatch({
        type: DELETE_FROM_LIST,
        payload: { fieldName: file.fieldName },
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const nextFile = this.getLastFileDetails(nextProps);
    const thisFile = this.getLastFileDetails(this.props);
    const { workbench, memberId, dispatch } = nextProps;
    if (
      thisFile &&
      nextFile &&
      thisFile.uploaded === undefined &&
      nextFile.uploaded !== undefined
    ) {
      dispatch(getMemberProductApplicationMetadata(memberId, workbench.id));
    }
  }
  handleDrop = (files, rejectedFiles) => {
    const {
      currentFiles = [],
      dispatch,
      documentType,
      input,
      memberId,
      meta,
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
  };
  getLastFileDetails = props => {
    const { currentFiles = [], formValues, input = {}, meta = {} } = props;
    const file = currentFiles[input.name] ? currentFiles[input.name] : null;
    return file;
  };
  renderUploading() {
    const file = this.getLastFileDetails(this.props);
    if (file) {
      const isUploading = file.uploaded === undefined;
      const failed = file.uploaded === false;
      const isAnalyzing = !failed && file.uploaded !== true;
      const isUploaded = file.uploaded === true;

      const uploadMessage = veriTextMap.get(file.verificationMsg);

      return (
        <UploadWrapper imagePreview={file.preview} isUploading={isUploading}>
          <UploadOverlay failed={failed} visible={isAnalyzing || failed} />
          <UploadStatusText>
            {isUploading && 'Uploading...'}
            {!isUploading && isAnalyzing && 'Analyzing...'}
            {failed &&
              `Failed. ${uploadMessage && uploadMessage}. Please try again.`}
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
    const { input = {}, label = '', meta = {}, isUploading } = this.props;
    const { value } = input;
    const file = this.getLastFileDetails(this.props);
    return (
      <FormField>
        <FileUploadContainer>
          <FieldLabel label={label} meta={meta} value={value} />
          <StyledDropzoneContainer>
            <StyledDropzone
              onDrop={this.handleDrop}
              activeStyle={{ borderCoor: '#448aff' }}
              disabled={(file && file.uploaded === undefined) || isUploading}
              multiple={false}
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
  workbench: state.workbench,
  isUploading: state.files.isUploading,
});
export default connect(mapStateToProps)(FileUpload);
