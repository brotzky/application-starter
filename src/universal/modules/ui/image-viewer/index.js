import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ModalContent from '../modal/components/ModalContent';
import { hideModal } from '../modal/actions/actions-modal';
import { Button } from 'gac-ui/components/';
import { CheckCircle, ExclamationCircle } from '../icons/';
import { clearfix } from 'gac-utils/sc';

const imageTypeMap = new Map();
imageTypeMap.set('dl_pid_front', 'Primary ID - Front');
imageTypeMap.set('dl_pid_back', 'Primary ID - Back');
imageTypeMap.set('portrait', 'Portrait');
imageTypeMap.set('ps_noa', 'Paystub or N.O.A');
imageTypeMap.set('vc_ddf', 'Void Cheque or Direct Deposit Form');

const ImageViewerWrapper = styled.div`
  max-height: 600px;
  width: 100%;
  background: white;
  position: relative;
  ${clearfix};
`;

const ImageViewerImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ImageViewerImage = styled.img`
  display: flex;
  align-items: center;
`;
const ImageViewerContent = styled.div`
  float: left;
  width: 50%;
`;
const ImageViewerHeading = styled.h2`
  margin-bottom: 1.2rem;
  font-size: 2.4rem;
`;
const ImageViewerSubHeading = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`;
const ImageViewerStatus = styled.p`
  margin-bottom: 3.6rem;
  font-weight: 600;
`;
const ImageViewerViewBtn = styled.div`
  margin-top: 3.6rem;
`;

const VerificationIconSuccess = styled(CheckCircle)`
  margin-right: 1.2rem;
  * {
    stroke: ${props => props.theme.colors.green};
  }
`;
const VerificationIconFailure = styled(ExclamationCircle)`
  margin-right: 1.2rem;
  * {
    stroke: ${props => props.theme.colors.red};
  }
`;

const ImageViewer = props => {
  const { dispatch } = props;
  const { dateVerified, name, preview, type, verificationMsg } = props.image;

  return (
    <ModalContent
      modalAction={() => dispatch(hideModal())}
      modalFullscreen={false}
    >
      <ImageViewerWrapper>
        <ImageViewerImageWrapper>
          <ImageViewerImage height="350" src={preview} />
        </ImageViewerImageWrapper>
        <ImageViewerContent>
          <ImageViewerHeading>{imageTypeMap.get(type)}</ImageViewerHeading>
          <ImageViewerStatus>
            {verificationMsg === 'ACCEPTED' ? (
              <span>
                <VerificationIconSuccess />Accepted
              </span>
            ) : (
              <span>
                <VerificationIconFailure />
                {verificationMsg}
              </span>
            )}
          </ImageViewerStatus>
          <ImageViewerSubHeading>Details</ImageViewerSubHeading>
          <div>
            <strong>Filename:</strong> {name}
          </div>
          <div>
            <strong>Date Verified:</strong>{' '}
            {moment(dateVerified).format('MMM Do, YYYY')}
          </div>
          <ImageViewerViewBtn>
            <Link href={preview} target="_blank">
              <Button text="View full size" />
            </Link>
          </ImageViewerViewBtn>
        </ImageViewerContent>
      </ImageViewerWrapper>
    </ModalContent>
  );
};

export default ImageViewer;
