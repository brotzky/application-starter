import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CheckCircleFilled } from '../../../../../../ui/icons';

const LegalDocumentContainer = styled.div`
  display: flex;
  padding: 2.25rem;
  left: -2.25rem;
  right: -2.25rem;
  position: relative;
  border: 1px solid transparent;
  border-bottom: 1px solid #e5e5e5;
  transition: all 200ms ease;
  border-radius: 2px;
  cursor: pointer;
  width: 100%;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  &:hover {
    border: 1px solid ${props => props.theme.colors.blue};
    background: rgba(68, 138, 255, 0.025);
  }
`;

const LegalDocumentIconContainer = styled.div`margin: 0.2rem 0.8rem 0 0;`;

const LegalDocumentHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const LegalDocumentHeader = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 3px;
`;

const LegalDocumentHeaderDate = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #919191;
  text-align: ${props => (props.align === 'right' ? 'right' : 'left')};
`;

const LegalDocumentSigned = styled.div`margin-top: 1.5rem;`;

const LegalDocumentSignatures = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #919191;
  margin-bottom: 5px;
`;

const LegalDocumentSignedUser = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 1.4rem;
  font-weight: 500;
`;

const LegalDocumentSignedDate = styled.div`
  color: #919191;
  font-weight: 400;
`;

const LegalDocumentSignedStatus = styled.div`margin-right: 1rem;`;

const LegalDocumentNotSigned = styled.div`
  position: relative;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid #adadad;
`;

const LegalDocumentIcon = () => (
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

const LegalDocumentsOverview = ({ doc, openDocument }) => (
  <LegalDocumentContainer onClick={openDocument}>
    <LegalDocumentIconContainer>
      <LegalDocumentIcon />
    </LegalDocumentIconContainer>
    <div style={{ width: '100%' }}>
      <LegalDocumentHeaderContainer>
        <div>
          <LegalDocumentHeader>{doc.name}</LegalDocumentHeader>
          <LegalDocumentHeaderDate>
            {moment(doc.dateCreated).format('MMM Do YYYY, h:mm a')}
          </LegalDocumentHeaderDate>
        </div>
        <div>
          {doc.dateAgreementSent && (
            <LegalDocumentHeaderDate align="right">
              <div style={{ color: '#262626', fontWeight: '500' }}>
                Sent at {moment(doc.dateAgreementSent).format('h:mm a')}
              </div>
              <div>{moment(doc.dateAgreementSent).format('MMM Do, YYYY')}</div>
            </LegalDocumentHeaderDate>
          )}
        </div>
      </LegalDocumentHeaderContainer>
      <LegalDocumentSigned>
        <LegalDocumentSignatures>Required signatures</LegalDocumentSignatures>
        {doc.dateSigned.map(signed => (
          <LegalDocumentSignedUser key={signed.dateSigned}>
            <LegalDocumentSignedStatus>
              {signed.dateSigned ? (
                <CheckCircleFilled height="18" width="18" />
              ) : (
                <LegalDocumentNotSigned />
              )}
            </LegalDocumentSignedStatus>
            <div>
              <div>
                {signed.firstName} {signed.lastName}
              </div>
              {signed.dateSigned && (
                <LegalDocumentSignedDate>
                  {moment(signed.dateSigned).format('MMM Do YYYY, h:mm a')}
                </LegalDocumentSignedDate>
              )}
            </div>
          </LegalDocumentSignedUser>
        ))}
      </LegalDocumentSigned>
    </div>
  </LegalDocumentContainer>
);

export default LegalDocumentsOverview;
