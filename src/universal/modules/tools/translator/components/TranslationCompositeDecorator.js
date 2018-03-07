import React from 'react';
import { CompositeDecorator, DefaultDraftInlineStyle } from 'draft-js';

export const customStyles = {
  ...DefaultDraftInlineStyle,
  LINK: {
    color: 'blue',
  },
};

const AnchorTag = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={customStyles.LINK}>
      {props.children}
    </a>
  );
};

const anchorStrategy = (contentBlock, callback, contentState) =>
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);

const compositeDecorator = new CompositeDecorator([
  {
    strategy: anchorStrategy,
    component: AnchorTag,
  },
]);

export default compositeDecorator;
