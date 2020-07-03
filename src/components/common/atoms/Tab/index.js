import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Style from './Tab.module.css';

const Tab = memo(({title, id, onClick, selected}) => (
  <div
    className={`font-14 py-2 ${Style.default} text-center cursor-pointer ${selected?Style.selected:''}`}
    onClick={onClick(id)}
  >
    {title}
  </div>
));


Tab.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

Tab.defaultProps = {
  type: 'default',
  selected: false,
};

Tab.displayName = 'Tab';

export default Tab;
