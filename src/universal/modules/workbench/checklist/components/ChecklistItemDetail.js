import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { CircleFilled } from '../../../ui/icons';
import { ProfilePicture } from '../../../ui/components';
import { Spinner } from 'gac-ui/components/';

const resultColorMap = {
  RUNNING: 'blueStone',
  //verified
  PASS: 'green',
  OVERRIDE_PASS: 'green',
  //not verified
  FAIL: 'red',
  ERROR: 'red',
  NOT_RUN: 'greyMidLight',
  NO_PREREQUISITES: 'greyMidLight',
  OVERRIDE_REVIEW: 'greyMidLight',
  REVIEW: 'greyMidLight',
};

const ChecklistItemDetail = ({
  checklistItem,
  detail: {
    overrideUserInfo,
    verificationResult,
    overrideComment,
    resultReasons,
    dateCreated,
    contextualizedLabel,
  },
}) => {
  const passed =
    verificationResult === 'PASS' || verificationResult === 'OVERRIDE_PASS';
  const failed =
    verificationResult === 'FAIL' || verificationResult === 'ERROR';

  return (
    <ItemRow>
      <IconWrapper>
        {overrideUserInfo ? (
          <ProfilePicture
            size={38}
            user={overrideUserInfo}
            border={`3px solid ${
              passed ? '#32C594' : failed ? '#F44336' : '#a8a8a8'
            }`}
          />
        ) : verificationResult === 'RUNNING' ? (
          <Spinner size={38} color="44a8ff" />
        ) : (
          <StyledCircle
            height={30}
            width={30}
            fill={resultColorMap[verificationResult] || 'greyMidLight'}
          />
        )}
      </IconWrapper>
      <Details>
        {overrideUserInfo && (
          <DetailsHeader>
            {overrideUserInfo.firstName} {overrideUserInfo.lastName}
          </DetailsHeader>
        )}
        <p>
          <DetailsReason
            key="detail-verification-result"
            fill={resultColorMap[verificationResult] || 'greyMidLight'}
          >
            {verificationResult.replace('_', ' ')}
          </DetailsReason>
          {overrideComment ? (
            <DetailsReason>{overrideComment}</DetailsReason>
          ) : resultReasons[0] && resultReasons[0].length ? (
            resultReasons.map((reason, i) => (
              <DetailsReason key={i}>
                {`${i === 0 ? '' : ', '}`}
                {reason}
              </DetailsReason>
            ))
          ) : (
            <DetailsReason>{contextualizedLabel}</DetailsReason>
          )}
        </p>
      </Details>
      <Time>{moment(dateCreated).fromNow()}</Time>
    </ItemRow>
  );
};

export default ChecklistItemDetail;

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  padding: ${props => Number(props.theme.space) / 2}rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:not(:last-child) {
    border-bottom: 2px solid #efefef;
  }
`;

const Details = styled.div`
  padding: 0 1.75rem;
  flex: 6;
`;

const DetailsHeader = styled.h6`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.blueStone};
`;

const DetailsReason = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.blueStone};
  &:first-child {
    font-weight: 600;
    margin-right: 5px;
    color: ${props => props.theme.colors[props.fill]};
  }
`;

const Time = styled.div`
  min-width: 90px;
  font-size: 14px;
  flex: 1;

  color: ${props => props.theme.colors.blueStone};
`;

const IconWrapper = styled.div`
  width: 68px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

const StyledCircle = styled(CircleFilled)`
  width: ${props => (props.size ? props.size : 26)}px;
  height: ${props => (props.size ? props.size : 26)}px;
  * {
    fill: ${props => props.theme.colors[props.fill]};
  }
`;
