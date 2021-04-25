import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ date, onChange, placeholder, isView }) => {
	return isView ? (
		<strong>{dayjs(date).format('DD MMMM YYYY')}</strong>
	) : (
		<DatePicker
			className='input date-picker'
			selected={date}
			minDate={new Date()}
			placeholderText={placeholder}
			dateFormat='dd MMM yyyy'
			onChange={onChange}
		/>
	);
};

DatePickerComponent.propTypes = {
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	isView: PropTypes.bool,
};

DatePickerComponent.defaultProps = {
	date: new Date(),
	onChange: () => {},
	placeholder: '',
	isView: PropTypes.bool,
};

export default DatePickerComponent;
