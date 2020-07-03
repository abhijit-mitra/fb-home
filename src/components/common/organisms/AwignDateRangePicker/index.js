import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {DateRangePicker} from 'react-dates';

import './style.css';
import 'react-dates/lib/css/_datepicker.css';

class AwignDateRangePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }

  static getDerivedStateFromProps = (props, state)=>{
    const updatedState = {...state};
    const {startDate, endDate} = props;
    if (startDate === state.startDate && endDate === state.endDate) {
      return null;
    }
    updatedState['startDate'] = startDate;

    updatedState['endDate'] = endDate;

    return updatedState;
  }

  handleDateChange = ({startDate, endDate}) => {
    this.setState({startDate, endDate});
    this.props.onSelect({startDate, endDate});
  }
  handleFocus = (focusedInput) => this.setState({focusedInput})
  render() {
    const {startDate, endDate, focusedInput} = this.state;
    return (
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={this.handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={this.handleFocus}
        isOutsideRange={()=>{}}
      />
    );
  }
}

AwignDateRangePicker.propTypes={
  onSelect: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
};

AwignDateRangePicker.defaultProps={
  startDate: null,
  endDate: null,
};

export default AwignDateRangePicker;
