import React, {memo} from 'react';
import Style from './Input.module.css';

const TextArea = memo((props) => (
  <textarea type="text" className={Style.input} {...props} />
));

TextArea.displayName = 'TextArea';

export default TextArea;
