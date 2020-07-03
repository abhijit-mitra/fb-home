import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tab} from '../../atoms/';

const Tabs = memo(({data, onClick, selectedTab: selected, ...rest}) => {
  const width = `${100 / data.length}%`;
  const [selectedTab, setSelectedTab] = useState(selected);
  const handleClick = (id) => () => {
    setSelectedTab(id);
    onClick(id);
  };

  useEffect(() => {
    setSelectedTab(selected);
  }, [selected]);

  return (
    <div className="d-inline-block w-100 bg-dark-white" {...rest}>
      {(data || []).map((elm, index) => (
        <div
          style={{width: width}}
          key={index}
          className="relative float-left"
        >
          <Tab
            key={index}
            title={elm.title}
            id={index}
            type='blue'
            selected={selectedTab === index}
            onClick={handleClick}
          />
        </div>
      ))}
    </div>
  );
});

Tabs.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  selectedTab: PropTypes.number,
};

Tabs.defaultProps = {
  data: [],
  onClick: () => {},
  selectedTab: 0,
};


Tabs.displayName = 'Tabs';

export default Tabs;
