import React, {memo, useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import Img from '../Img';
import Style from './Dropdown.module.css';

const ImgStyle = {
  img: {
    width: '33px',
    height: '33px',
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
  fallback: {fontSize: '3rem', borderRadius: '50%'},
};

const NavDropdown = memo(({name, image, options, onSelect}) => {
  const dropdownRef = useRef();
  const [show, setShow] = useState(false);
  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleClick = (e)=>{
    setShow((state)=>!state);
  };

  const handleItemClick = (selectedObj)=>()=>{
    handleClick();
    onSelect(selectedObj);
  };

  return (
    <div className="d-inline-block" ref={dropdownRef}>
      <div className={`text-white cursor-pointer center-y`} onClick={handleClick}>
        <span style={{width: '33px', height: '33px'}}>
          <Img
            style={ImgStyle.img}
            src={image}
            fallback={
              <i
                className="fas fa-user-circle"
                style={ImgStyle.fallback}
              ></i>
            }/>
        </span >
        <span className="mr-3"></span>
        <span className='mr-3'>
          {name}
        </span>
        <span><i className={`fas fa-chevron-${show?'up':'down'}`}></i></span>
      </div>
      {show &&
        <div className={`${Style.dropdown} shadow bg-dark-gray-2`}>
          {options.map((elm, index) => (
            <div className={Style.menuItem} key={index} data-ignore='nav' onClick={handleItemClick(elm)}>
              <i className={`${Style.icon} fas mr-3 ${elm.icon}`}></i>
              {elm.title}
            </div>
          ))}
        </div>
      }
    </div>
  );
});

NavDropdown.defaultProps={
  name: '',
  image: '',
  onSelect: ()=>{},
  options: [],
};

NavDropdown.propTypes={
  name: PropTypes.string,
  image: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.array,
};

NavDropdown.displayName='NavDropdown';

export default NavDropdown;
