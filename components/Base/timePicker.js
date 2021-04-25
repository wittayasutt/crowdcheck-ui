import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimePickerComponent = ({ date, onChange, placeholder, isView }) => {
	return isView ? (
		<strong>{dayjs(date).format('HH:mm')}</strong>
	) : (
		<DatePicker
			className='input date-picker'
			selected={date}
			minDate={new Date()}
			placeholderText={placeholder}
			dateFormat='h:mm aa'
			showTimeSelect
			showTimeSelectOnly
			onChange={onChange}
		/>
	);
};

TimePickerComponent.propTypes = {
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	isView: PropTypes.bool,
};

TimePickerComponent.defaultProps = {
	date: new Date(),
	onChange: () => {},
	placeholder: '',
	isView: false,
};

export default TimePickerComponent;
