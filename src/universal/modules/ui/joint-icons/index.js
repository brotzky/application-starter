import React from 'react';
import styled from 'styled-components';

const JointIconsIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2px 0 0;
  text-transform: uppercase;

  ${props => (props.after ? 'margin: 0 0 0 0.8rem;' : '')};
`;

const JointIconsCreator = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.blue};
  color: white;
  border-radius: 50%;
  border: 1px solid transparent;
  height: 21px;
  width: 21px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const JointIconsInvite = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.blue};
  color: white;
  border-radius: 50%;
  border: 1px solid transparent;
  height: 21px;
  width: 21px;
  font-size: 0.7rem;
  font-weight: 600;
  position: relative;
  background: #cde2f9;
  color: ${props => props.theme.colors.blue};
  box-shadow: -1px 0px rgba(${props => props.theme.banks.grow.pri}, 0.14);

  &:nth-child(2) {
    left: -4px;
  }
  &:nth-child(3) {
    left: -8px;
  }
  &:nth-child(4) {
    left: -12px;
  }
  &:nth-child(5) {
    left: -16px;
  }
`;
/**
 * <JointIcons />
 * @param {Object} application containing the invites and creator
 * @param {Boolean} passing after will create margin left for the icons
 */
const JointIcons = ({ application, after }) => {
  if (!application.invites.length) return null;

  return (
    <JointIconsIcon after={after}>
      <JointIconsCreator>
        {application.creator.firstName.substring(0, 1).toUpperCase()}
        {application.creator.lastName.substring(0, 1).toUpperCase()}
      </JointIconsCreator>
      {application.invites.map(invite => (
        <JointIconsInvite key={invite.email}>
          {invite.firstName.substring(0, 1).toUpperCase()}
          {invite.lastName.substring(0, 1).toUpperCase()}
        </JointIconsInvite>
      ))}
    </JointIconsIcon>
  );
};

export default JointIcons;
