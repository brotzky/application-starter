import React from 'react';

const FormInlineMessage = props => {
  return (
    props.meta.error && props.meta.touched ||
    props.hasError && props.inlineMessage ||
    props.meta.pristine && props.meta.error && props.value && props.value.length > 0
  ? <div className={`
      FormInlineMessage
      FormInlineMessage--error
      ${props.className ? `${props.className}InlineMessage ${props.className}InlineMessage--error` : ''}
    `}>{props.meta.error || props.inlineMessage}</div>
  : props.inlineMessage && props.showInlineMessageByDefault
    ? <div className={`
        FormInlineMessage
        ${props.className ? `${props.className}InlineMessage` : ''}
      `}>
        {props.inlineMessage}
      </div>
    : null
  );
};

export default FormInlineMessage;
