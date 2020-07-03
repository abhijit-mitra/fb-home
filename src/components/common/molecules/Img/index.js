import React, {useState, useEffect, memo, useRef} from 'react';
import PropTypes from 'prop-types';
import {Loader} from '../../atoms';

const fixedStyle = {
  backgroundSize: '100%',
  objectFit: 'contain',
};

const errorStyle = {
  fontSize: '4rem',
};

const Img = memo(({fallback, ...props}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const successRef = useRef(false);
  useEffect(() => {
    const img = new Image();
    img.src = props.src;
    img.onload = function() {
      setLoading(false);
      setError(false);
      successRef.current = true;
    };
    img.onerror = function(err) {
      if (!successRef.current) {
        setLoading(false);
        setError(true);
      }
    };
  }, [props.src]);
  if (error) {
    return fallback;
  } else if (loading) {
    return <Loader size="sm" align={props.align}/>;
  }
  return (
    <img
      {...props}
      style={{...props.style, ...fixedStyle}}
      className="full-width full-height relative"
      alt="awign.com"
    />
  );
});

Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, () => null]),
  fallback: PropTypes.any,
  style: PropTypes.object,
  align: PropTypes.string,
};

Img.defaultProps = {
  fallback: <i className="fas fa-image gray" style={errorStyle}></i>,
  style: {},
  align: 'center-x-y',
};

Img.displayName = 'Img';


export default Img;
