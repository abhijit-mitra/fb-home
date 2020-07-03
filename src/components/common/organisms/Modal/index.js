import React, {memo} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Style from './ModalDekstop.module.css';

const View = memo(({children, onClick, ...rest}) => {
  const handleModalClick = (e) => {
    onClick(e);
  };
  const handleBodyClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={`${Style.modal} center-y`} onClick={handleModalClick} {...rest}>
      <div
        className={`position-absolute w-100`}
      >
        <div className='row'>
          <div
            className={`col-md-4 offset-md-4 bg-white p-5 br-12 overflow-auto ${Style.childView}`}
            onClick={handleBodyClick}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

View.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  style: PropTypes.object,
  onClick: PropTypes.func,
};

View.defaultProps={
  onClick: ()=>{},
  style: {},
  children: (<></>),
};

View.displayName = 'View';

class Modal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    onClick: () => {},
  };
  constructor(props) {
    super(props);
    this.root = document.getElementById('modal-root');
    this.el = document.createElement('div');
  }
  componentDidMount() {
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(<View {...this.props} />, this.el);
  }
}

export default Modal;
