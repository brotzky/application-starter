import React from 'react';
import { User } from '../../ui/icons/';

const MemberNotesPlaceholder = () =>
  <div className="MemberNotesList MemberNotesPlaceholder">
    <div className="MemberNotesItem">
      <header className="MemberNotesItem__header">
        <User className="MemberNotesItem__icon" />
        <span className="MemberNotesItem__header-name"></span>
        <span className="MemberNotesItem__header-date"></span>
      </header>
      <div className="MemberNotesItem__body"></div>
    </div>
  </div>;

export default MemberNotesPlaceholder;
