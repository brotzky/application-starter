import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryNavMember = ({ member }) => {
  return (
    <li className="SecondaryNavList__item">
      <Link
        className="SecondaryNavList__link"
        activeClassName="SecondaryNavList__link--active"
        to={`/members/${member.member.id}`}
      >
        {member.member.firstName} {member.member.lastName}
      </Link>
    </li>
  );
};

export default SecondaryNavMember;
