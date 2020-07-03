import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import './style.css';

class AwignSingleDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
    };
  }

  static getDerivedStateFromProps = (props, state)=>{
    const updatedState = {...state};
    const {date} = props;
    if (date === state.date) {
      return null;
    }
    updatedState['date'] = date;

    return updatedState;
  }
  handleDateChange = (date)=>{
    this.setState({date});
    this.props.onSelect(date);
  }
  handleFocus = ({focused}) => this.setState({focused})
  render() {
    const {date, focused} = this.state;
    return (
      <SingleDatePicker
        date={date}
        onDateChange={this.handleDateChange}
        focused={focused}
        onFocusChange={this.handleFocus}
        id="your_unique_id"
        numberOfMonths={1}
        isOutsideRange={()=>{}}
      />
    );
  }
}

AwignSingleDatePicker.propTypes={
  onSelect: PropTypes.func.isRequired,
  date: PropTypes.object,
};

AwignSingleDatePicker.defaultProps={
  date: null,
};

export default AwignSingleDatePicker;
