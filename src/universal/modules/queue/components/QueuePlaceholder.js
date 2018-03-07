import React from 'react';
import { MenuDots } from '../../ui/icons/';

const QueuePlaceholder = () =>
  <div className="QueueList QueueItemPlaceholder">
    <div className="QueueItem">
      <div className="QueueItem__wrapper">
        <div className="QueueItem__cell">
          <span className="QueueItem__link"></span>
        </div>
        <div className="QueueItem__cell">
          <span className="QueueItem__link"></span>
        </div>
        <div className="QueueItem__cell">
          <span className="QueueItem__link"></span>
        </div>
        <div className="QueueItem__cell">
          <span className="QueueItem__link"></span>
        </div>
        <div className="QueueItem__cell QueueItem__cell--sm">
          <MenuDots className="QueueItem__menu-dots-icon" />
        </div>
      </div>
    </div>
  </div>;


export default QueuePlaceholder;
