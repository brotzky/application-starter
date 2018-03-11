import React from 'react';
import {
  QueueItemCell,
  QueueItemLink,
  QueueItemWrapper,
  QueueItem,
} from 'gac-utils/sc';

const QueuePlaceholder = () => (
  <div>
    <QueueItem>
      <QueueItemWrapper>
        <QueueItemCell>
          <QueueItemLink to="/" />
        </QueueItemCell>
        <QueueItemCell>
          <QueueItemLink to="/" />
        </QueueItemCell>
        <QueueItemCell>
          <QueueItemLink to="/" />
        </QueueItemCell>
        <QueueItemCell>
          <QueueItemLink to="/" />
        </QueueItemCell>
      </QueueItemWrapper>
    </QueueItem>
  </div>
);

export default QueuePlaceholder;
