import React from 'react';

const Textarea = props => (
  <textarea {...props.input} placeholder={props.placeholder} />
);

export default Textarea;
