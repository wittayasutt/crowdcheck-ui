import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';

const AdminFormInputLocation = ({ title, data, onChange, isView }) => {
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');

	const handleChangeLat = (e) => {
		onChange({
			...data,
			lat: e.target.value,
		});
	};

	const handleChangeLng = (e) => {
		onChange({
			...data,
			lng: e.target.value,
		});
	};

	useEffect(() => {
		if (data.lat) {
			setLat(data.lat);
		} else {
			setLat('');
		}

		if (data.lng) {
			setLng(data.lng);
		} else {
			setLng('');
		}
	}, [data]);

	return (
		<div className='field mb-2'>
			<RequiredLabel>{title}</RequiredLabel>
			<div className='control'>
				{isView ? (
					<strong>{lat}</strong>
				) : (
					<input
						className='input mb-1'
						type='number'
						placeholder='latitude'
						value={lat}
						onChange={handleChangeLat}
					/>
				)}

				{isView && <br />}

				{isView ? (
					<strong>{lng}</strong>
				) : (
					<input
						className='input mb-1'
						type='number'
						placeholder='longtitude'
						value={lng}
						onChange={handleChangeLng}
					/>
				)}
			</div>
		</div>
	);
};

AdminFormInputLocation.propTypes = {
	title: PropTypes.string,
	data: PropTypes.object,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
};

AdminFormInputLocation.defaultProps = {
	title: '',
	data: {},
	onChange: () => {},
	isView: false,
};

export default AdminFormInputLocation;
