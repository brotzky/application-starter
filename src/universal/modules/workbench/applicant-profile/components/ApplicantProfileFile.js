import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import {
  CheckCircle,
  ExclamationCircle,
  Upload,
  ExpandIcon,
} from '../../../ui/icons';
import { showModal, hideModal } from '../../../ui/modal/actions/actions-modal';

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

const ImageContainer = styled.div`
  position: relative;
  font-size: 1.5rem;
  display: inline-block;
  border-radius: 6px;
  overflow: hidden;

  &:hover .ImageOverlay {
    opacity: 0.2;
  }

  &:hover .ImageDetails,
  &:hover .ImageFullSize {
    transform: translateY(0px);
    opacity: 1;
  }
`;
const ImageRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.28571rem;
  }
`;

const Image = styled.img`height: 174px;`;

const ImageOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  pointer-events: none;
  transition: opacity 200ms ease-out;
`;

const ImageDetails = styled.div`
  background: white;
  position: absolute;
  opacity: 0;
  top: 0px;
  left: 0;
  right: 0;
  margin: 1rem;
  padding: 1rem;
  border-radius: 6px;
  transform: translateY(-20px);
  transition: transform 200ms ease-out;
  will-change: transform;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.3);
`;

const ImageFullSize = styled.div`
  opacity: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: 1rem auto;
  padding: 1rem;
  transform: translateY(20px);
  transition: all 200ms ease-out;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.3);
  will-change: transform;
  text-align: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
      0 8px 40px rgba(27, 39, 51, 0.5);
    background: #fdfdfd;
  }
`;

const ImageDetailsDate = styled.div`
  opacity: 0.6;
  margin-bottom: 4px;
`;
const ImageDetailsName = styled.div`font-weight: 600;`;

const ImageEmptyState = styled.div`
  color: ${props => props.theme.colors.greyMidDark};
  font-size: 1.4rem;
`;

const ApplicantProfileTextEdit = styled.div`
  opacity: 0;
  position: absolute;
  right: 2.8125rem;
  color: ${props => props.theme.colors.blue};
  cursor: pointer;
  transition: 150ms ease;

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
  cursor: pointer;
  font-size: 1.5rem;
`;

const PdfLinkText = styled.p`margin: 0 0 0 1rem;`;
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

  render() {
    const { dispatch, field, handleToggleClick, fieldValue } = this.props;

    return (
      <ApplicantProfileImageViewerContainer>
        {fieldValue ? (
          [
            <div key={fieldValue}>
              {fieldValue.map(image => (
                <ImageRow key={image.name}>
                  {image.type.includes('pdf') ? (
                    <PdfLinkContainer
                      onClick={() => this.handlePdfModalClick(image)}
                    >
                      <PdfDocumentIcon />
                      <PdfLinkText>View {field.label} PDF</PdfLinkText>
                    </PdfLinkContainer>
                  ) : (
                    <ImageContainer key={image.name}>
                      <Image src={image.preview} />
                      <ImageOverlay className="ImageOverlay" />
                      <ImageDetails className="ImageDetails">
                        <ImageDetailsName>{image.name}</ImageDetailsName>
                        <ImageDetailsDate>
                          {moment(image.dateLastModified).format(
                            'MMM, Do YYYY',
                          )}
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
                      </ImageDetails>
                      <ImageFullSize
                        onClick={() =>
                          dispatch(
                            showModal('IMAGE_VIEWER', { dispatch, image }),
                          )}
                        className="ImageFullSize"
                      >
                        <ExpandIcon height="30" width="30" />
                      </ImageFullSize>
                    </ImageContainer>
                  )}
                </ImageRow>
              ))}
            </div>,
            <ApplicantProfileTextEdit
              key={2}
              className="ApplicantProfileTextEdit"
              onClick={() => handleToggleClick(field.name)}
            >
              <Upload height={18} /> Upload
            </ApplicantProfileTextEdit>,
          ]
        ) : (
          [
            <ImageEmptyState key={1}>
              <EmptyStateImageIcon />No {field.label} uploaded
            </ImageEmptyState>,
            <ApplicantProfileTextEdit
              key={2}
              className="ApplicantProfileTextEdit"
              onClick={() => handleToggleClick(field.name)}
            >
              <Upload height={18} /> Upload
            </ApplicantProfileTextEdit>,
          ]
        )}
      </ApplicantProfileImageViewerContainer>
    );
  }
}

export default connect()(ApplicantProfileImageViewer);
