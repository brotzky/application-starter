import React from 'react';
import ApplicantProfileHeader from './ApplicantProfileHeader';
import ApplicantProfileToggle from './ApplicantProfileToggle';

const ApplicantProfileSection = ({ config }) => {
  return (
    <div>
      {config.groups.map(group => [
        <ApplicantProfileHeader key={group.header} text={group.header} />,
        <ApplicantProfileToggle
          key={group.header + group.header}
          group={group}
        />,
      ])}
    </div>
  );
};

export default ApplicantProfileSection;
