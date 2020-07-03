import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import Style from './SelectCard.module.css';

export const CardItem = memo(({value, onClick, cardData, children, config}) => (
  <div
    className={`${value===cardData[config.setValueBy]?Style.selected:''} border px-3 py-4 w-100 cursor-pointer mb-3 br-10`}
    onClick={onClick}>
    <div className="row">
      <div className="col-1">
        {value===cardData[config.setValueBy] && <i className="fas fa-check-circle"></i>}
      </div>
      <div className="col-11">
        {children}
      </div>
    </div>
  </div>
));

CardItem.displayName = 'CardItem';

CardItem.propTypes={
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  cardData: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]).isRequired,
  config: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

CardItem.defaultProps={
  isSelected: false,
  onClick: ()=>{},
  cardData: {},
  config: {
    setValueBy: 'id',
  },
};

export const SelectCard = memo(({onClick, renderProps, config, data}) => {
  const [value, setValue] = useState(1);
  const handleClick = (data)=>()=>{
    setValue(data[config.setValueBy]);
    onClick(data);
  };
  return (
    <>
      {(data||[]).map((elm)=>(
        <CardItem
          config={config}
          key={elm[config.setValueBy]}
          onClick={handleClick(elm)}
          value={value}
          cardData={elm}>
          {renderProps(elm, value)}
        </CardItem>
      ))}
    </>
  );
});

SelectCard.propTypes={
  onClick: PropTypes.func,
  config: PropTypes.object,
  data: PropTypes.array,
  renderProps: PropTypes.func.isRequired,
};

SelectCard.defaultProps = {
  onClick: ()=>{},
  config: {
    setValueBy: 'id',
  },
  data: [],
};

SelectCard.displayName = 'SelectCard';
