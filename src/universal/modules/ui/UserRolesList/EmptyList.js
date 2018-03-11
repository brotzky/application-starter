import React from 'react';
import EmptyState from '../components/EmptyState/EmptyState';
import { FadeIn } from '../transitions/';
import { User } from '../icons';

const EmptyUserRoleList = ({ text }) => (
  <table>
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
  </table>
);

export default EmptyUserRoleList;
