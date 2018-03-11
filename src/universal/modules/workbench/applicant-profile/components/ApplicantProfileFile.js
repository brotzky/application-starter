import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';
import {
  CheckCircle,
  ExclamationCircle,
  Upload,
  ExpandIcon,
  Remove,
} from '../../../ui/icons';
import { Button } from '../../../ui/components';
import { deleteFile } from 'grow-actions/upload-file/delete-file';
import { DELETE_FROM_LIST } from 'grow-actions/upload-file/constants';
import ApplicantDeleteFile from './ApplicantDeleteFile';
import { getMemberProductApplicationMetadata } from 'grow-actions/member/member-category-metadata';
import { showModal, hideModal } from '../../../ui/modal/actions/actions-modal';
import { InlineTooltip } from '../../../ui/components';

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

const ApplicantProfileImageViewerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.28571rem 2.8125rem;
  border-bottom: 1px solid #ebeef0;
  &:hover {
    background: #fdfdfd;
  }

  &:hover .ApplicantProfileTextEdit {
    opacity: 1;
  }
`;
const FileDeleteIcon = styled.div`
  position: absolute;
  opacity: 0;
  top: -8px;
  right: -8px;
  background-color: ${props => props.theme.colors.errorPink};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    * {
      stroke: ${props => props.theme.colors.red};
    }
  }
`;
const ImageContainer = styled.div`
  position: relative;
  font-size: 1.5rem;
  display: inline-block;
  border-radius: 6px;
  &:hover ${FileDeleteIcon} {
    transform: translateY(0px);
    opacity: 1;
  }
`;
const ImageRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.28571rem;
  }
  display: flex;
`;

const Image = styled.img`
  height: 174px;
  border-radius: 6px;
`;

const ImageDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ImageDetailsDate = styled.div`
  opacity: 0.6;
  margin-bottom: 4px;
`;
const ImageDetailsName = styled.div`
  font-weight: 600;
`;

const ImageEmptyState = styled.div`
  color: ${props => props.theme.colors.greyMidDark};
  font-size: 1.4rem;
`;

const ApplicantProfileTextEdit = styled(InlineTooltip.Container)`
  opacity: 0;
  position: absolute;
  right: 2.8125rem;
  top: 1rem;
  color: ${props => props.theme.colors.blue};
  transition: 150ms ease;

  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    opacity: 1;
  }

  &:active {
    pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  }
  svg {
    * {
      stroke: ${props => props.theme.colors.blue};
    }
  }
`;

const StyledCheckCircle = styled(CheckCircle)`
  margin-right: 6px;

  * {
    stroke: ${props => props.theme.colors.green};
  }
`;

const StyledExclamationCircle = styled(ExclamationCircle)`
  margin-right: 6px;

  * {
    stroke: ${props => props.theme.colors.red};
  }
`;

const ViewFullSizeButton = styled.div`
  margin-top: 10px;
`;

const EmptyStateImageIcon = () => (
  <svg
    style={{ marginRight: '1.5rem' }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 32 32"
    width="28"
    height="28"
  >
    <g
      className="nc-icon-wrapper"
      transform="translate(0.5, 0.5)"
      fill="#585858"
    >
      <rect
        x="1"
        y="1"
        fill="none"
        stroke="#585858"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        width="30"
        height="30"
        strokeLinejoin="miter"
      />{' '}
      <polyline
        data-color="color-2"
        fill="none"
        stroke="#585858"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points=" 5,25 12,17 19,22 27,13 "
        strokeLinejoin="miter"
      />{' '}
      <circle
        data-color="color-2"
        fill="none"
        stroke="#585858"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="14"
        cy="9"
        r="3"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

const PdfDocumentIcon = () => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 28 28"
    xmlSpace="preserve"
    width="28"
    height="28"
  >
    <g fill="#212121" transform="translate(0.5, 0.5)">
      <polygon
        data-stroke="none"
        fill="#212121"
        points="16,1 16,7 22,7 "
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#212121"
        strokeWidth="1"
        strokeMiterlimit="10"
        points="16,1 16,7 22,7 "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polygon
        fill="none"
        stroke="#212121"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="16,1 2,1 2,23 22,23 22,7 "
        strokeLinejoin="miter"
      />
      <line
        data-color="color-2"
        fill="none"
        stroke="#212121"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="7"
        y1="7"
        x2="11"
        y2="7"
        strokeLinejoin="miter"
      />
      <line
        data-color="color-2"
        fill="none"
        stroke="#212121"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="7"
        y1="12"
        x2="17"
        y2="12"
        strokeLinejoin="miter"
      />
      <line
        data-color="color-2"
        fill="none"
        stroke="#212121"
        strokeWidth="1"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="7"
        y1="17"
        x2="17"
        y2="17"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

const PdfLinkContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  position: relative;
  max-width: 170px;
  &:hover ${FileDeleteIcon} {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const PdfLinkText = styled.p`
  margin: 0 0 0 1rem;
`;
class ApplicantProfileImageViewer extends Component {
  handlePdfModalClick = image => {
    const { dispatch } = this.props;

    dispatch(
      showModal('PDF_DOCUMENT_VIEWER', {
        image,
        closePdfViewer: () => dispatch(hideModal()),
      }),
    );
  };

  handleDelete = image => {
    const { dispatch, field, fieldValue, memberId, workbench } = this.props;
    dispatch(deleteFile(image.preview)).then(response => {
      if (!response.error) {
        dispatch(getMemberProductApplicationMetadata(memberId, workbench.id)); //reinit redux-form
        dispatch({
          //remove image from upload/delete queue
          type: DELETE_FROM_LIST,
          payload: { fieldName: field.name },
        });
        dispatch(
          //update redux form value
          change(
            'workbench',
            field.name,
            response.payload.data.uploads.length
              ? fieldValue.filter(file => {
                  return file.name !== image.name;
                })
              : null,
          ),
        );
      }
    });
  };

  render() {
    const {
      dispatch,
      field,
      handleToggleClick,
      fieldValue,
      sameAdmin,
      files,
    } = this.props;
    return (
      <ApplicantProfileImageViewerContainer>
        {fieldValue
          ? [
              <div key={`${field.name}-field-values`}>
                {fieldValue.map(image => (
                  <ImageRow key={image.preview}>
                    <div style={{ flex: 2 }}>
                      {image.type.includes('pdf') ? (
                        <PdfLinkContainer>
                          <PdfDocumentIcon />
                          <FileDeleteIcon
                            onClick={e => {
                              e.preventDefault();
                              dispatch(
                                showModal('PROMPT_MODAL', {
                                  header: 'Delete File',
                                  component: (
                                    <ApplicantDeleteFile
                                      image={image}
                                      onConfirm={this.handleDelete}
                                    />
                                  ),
                                }),
                              );
                            }}
                          >
                            <Remove height="10" width="10" />
                          </FileDeleteIcon>
                          <PdfLinkText>View {field.label} PDF</PdfLinkText>
                        </PdfLinkContainer>
                      ) : (
                        <ImageContainer>
                          <Image src={image.preview} />
                          <FileDeleteIcon
                            onClick={e => {
                              e.preventDefault();

                              dispatch(
                                showModal('PROMPT_MODAL', {
                                  header: 'Delete File',
                                  component: (
                                    <ApplicantDeleteFile
                                      image={image}
                                      onConfirm={this.handleDelete}
                                    />
                                  ),
                                }),
                              );
                            }}
                          >
                            <Remove height="10" width="10" />
                          </FileDeleteIcon>
                        </ImageContainer>
                      )}
                    </div>

                    <ImageDetails>
                      <ImageDetailsName>{image.name}</ImageDetailsName>
                      <ImageDetailsDate>
                        {moment(image.dateLastModified).format('MMM, Do YYYY')}
                      </ImageDetailsDate>
                      {image.verificationMsg === 'ACCEPTED' ? (
                        <span>
                          <StyledCheckCircle height={16} width={16} />Accepted
                        </span>
                      ) : (
                        <span>
                          <StyledExclamationCircle height={16} width={16} />
                          {veriTextMap.get(image.verificationMsg)}
                        </span>
                      )}
                      <ViewFullSizeButton>
                        <Button
                          onClick={() => window.open(image.preview, '_blank')}
                          text="View Full Size"
                        />
                      </ViewFullSizeButton>
                    </ImageDetails>
                  </ImageRow>
                ))}
              </div>,
              <ApplicantProfileTextEdit
                key={`${field.name}-field-edit`}
                onClick={() => handleToggleClick(field.name)}
                disabled={!sameAdmin || files.isUploading}
                active={!sameAdmin}
              >
                <Upload height={18} /> Upload
                <InlineTooltip>
                  Please claim this application to make uploads.
                </InlineTooltip>
              </ApplicantProfileTextEdit>,
            ]
          : [
              <ImageEmptyState key={`${field.name}-field-placeholders`}>
                <EmptyStateImageIcon />No {field.label} uploaded
              </ImageEmptyState>,
              <ApplicantProfileTextEdit
                key={`${field.name}-field-edit`}
                onClick={() => handleToggleClick(field.name)}
                disabled={!sameAdmin || files.isUploading}
                active={!sameAdmin}
              >
                <Upload height={18} /> Upload
                <InlineTooltip>
                  Please claim this application to make uploads.
                </InlineTooltip>
              </ApplicantProfileTextEdit>,
            ]}
      </ApplicantProfileImageViewerContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    memberId: state.member.member.id,
    workbench: state.workbench,
    files: state.files,
  };
};
export default connect(mapStateToProps)(ApplicantProfileImageViewer);
