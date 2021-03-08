import PropTypes from 'prop-types'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateTimePicker = ({ date, onChange, placeholder }) => {
	return (
		<DatePicker
			className='input date-picker'
			selected={date}
			minDate={new Date()}
			placeholderText={placeholder}
			dateFormat='dd MMM yyyy h:mm aa'
			showTimeSelect
			onChange={onChange}
		/>
	)
}

DateTimePicker.propTypes = {
	date: PropTypes.instanceOf(Date),
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
}

DateTimePicker.defaultProps = {
	date: new Date(),
	onChange: () => {},
	placeholder: '',
}

export default DateTimePicker
