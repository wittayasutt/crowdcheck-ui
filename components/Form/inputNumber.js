import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';

const AdminFormInputNumber = ({ title, require, data, onChange, isView, min, max }) => {
	const [number, setNumber] = useState(0);

	const handleChange = (e) => {
		let newData = e.target.value;
		const parsedNumber = parseInt(e.target.value);

		if (!isNaN(parsedNumber)) {
			if (parsedNumber > max) {
				newData = max;
			} else if (parsedNumber < min) {
				newData = min;
			} else {
				newData = parsedNumber;
			}
		} else {
			newData = null;
		}

		onChange(newData);
	};

	useEffect(() => {
		if (data || data === 0) {
			setNumber(data);
		} else {
			setNumber('');
		}
	}, [data]);

	return (
		<div className='field mb-2'>
			{require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>}
			<div className='control'>
				{isView ? (
					<strong>{number}</strong>
				) : (
					<input className='input mb-1' type='text' placeholder='0' value={number} onChange={handleChange} />
				)}
			</div>
		</div>
	);
};

AdminFormInputNumber.propTypes = {
	title: PropTypes.string,
	require: PropTypes.bool,
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	isView: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
};

AdminFormInputNumber.defaultProps = {
	title: '',
	require: false,
	data: 0,
	onChange: () => {},
	isView: false,
	min: 0,
	max: Number.MAX_SAFE_INTEGER,
};

export default AdminFormInputNumber;
