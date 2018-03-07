import React from 'react';
import EmptyState from '../components/EmptyState/EmptyState';
import { FadeIn } from '../transitions/';
import { User } from '../icons';

const EmptyUserRoleList = ({ text }) => (
  <tbody>
    <tr>
      <td colSpan="5">
        <FadeIn
          style={{
            paddingTop: '50px',
            display: 'block',
          }}
        >
          <EmptyState Icon={User} text={text} />
        </FadeIn>
      </td>
    </tr>
  </tbody>
);

export default EmptyUserRoleList;
