import React from 'react';

/**
 * <JointIcons />
 * @param {Object} application containing the invites and creator
 * @param {Boolean} passing after will create margin left for the icons
 */
const JointIcons = ({ application, after }) => {
  if (!application.invites.length) return null;

  return (
    <div className={`JointIcons ${after ? 'JointIcons--after' : ''}`}>
      <span className="JointIcons__creator">
        {application.creator.firstName.substring(0, 1).toUpperCase()}
        {application.creator.lastName.substring(0, 1).toUpperCase()}
      </span>
      {application.invites.map(invite => (
        <span key={invite.email} className="JointIcons__invite">
          {invite.firstName.substring(0, 1).toUpperCase()}
          {invite.lastName.substring(0, 1).toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export default JointIcons;
