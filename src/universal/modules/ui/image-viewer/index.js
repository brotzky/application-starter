import React, { Component } from 'react';
import moment from 'moment';
import ModalContent from '../modal/components/ModalContent';
import { hideModal } from '../modal/actions/actions-modal';
import { CheckCircle, ExclamationCircle } from '../icons/';
import { Button } from '../components';

const imageTypeMap = new Map();
imageTypeMap.set('dl_pid_front', 'Primary ID - Front');
imageTypeMap.set('dl_pid_back', 'Primary ID - Back');
imageTypeMap.set('portrait', 'Portrait');
imageTypeMap.set('ps_noa', 'Paystub or N.O.A');
imageTypeMap.set('vc_ddf', 'Void Cheque or Direct Deposit Form');

const ImageViewer = props => {
  const { dispatch } = props;
  const { dateVerified, name, preview, type, verificationMsg } = props.image;

  return (
    <ModalContent
      modalAction={() => dispatch(hideModal())}
      modalFullscreen={false}
    >
      <div className="ImageViewer__wrapper">
        <div className="ImageViewer__image">
          <img
            className="ImageViewer__image-image"
            height="350"
            src={preview}
          />
        </div>
        <div className="ImageViewer__content">
          <h2 className="ImageViewer__heading">{imageTypeMap.get(type)}</h2>
          <p className="ImageViewer__status">
            {verificationMsg === 'ACCEPTED' ? (
              <span>
                <CheckCircle className="ImageViewer__verification-icon ImageViewer__verification-icon--success" />Accepted
              </span>
            ) : (
              <span>
                <ExclamationCircle className="ImageViewer__verification-icon ImageViewer__verification-icon--failure" />
                {verificationMsg}
              </span>
            )}
          </p>
          <h3 className="ImageViewer__subheading">Details</h3>
          <div>
            <strong>Filename:</strong> {name}
          </div>
          <div>
            <strong>Date Verified:</strong>{' '}
            {moment(dateVerified).format('MMM Do, YYYY')}
          </div>
          <div className="ImageViewer__view-btn">
            <a
              href={preview}
              target="_blank"
              className="c-button c-button--pri"
            >
              <span>View full size</span>
            </a>
          </div>
        </div>
      </div>
    </ModalContent>
  );
};

export default ImageViewer;
