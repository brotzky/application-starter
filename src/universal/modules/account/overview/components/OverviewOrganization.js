import React from 'react';
import styled from 'styled-components';

const OrganizationLogo = styled.img`
  height: 40px;
  margin-bottom: 4.5rem;
`;

const OverviewOrganization = ({ organization }) => {
  return (
    <div component="div">
      <OrganizationLogo
        src={`/static/img/logos/organizations/${organization}.svg`}
      />
    </div>
  );
};

export default OverviewOrganization;
