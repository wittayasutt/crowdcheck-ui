import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import DateTimePicker from '../../components/Base/dateTime';
import UploadImage from '../../components/Base/uploadImage';
import RequiredLabel from '../Base/requiredLabel';

const Row = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Col = styled.div`
	width: 50%;
`;

const AdminFormVenue = ({ isView, data, type }) => {
	// form
	const [id, setId] = useState('');
	const [nameTH, setNameTH] = useState('');
	const [nameEN, setNameEN] = useState('');

	const handleChangeStartDatePicker = (date) => {
		console.log('StartDatePicker', date);
	};

	const handleChangeEndDatePicker = (date) => {
		console.log('EndDatePicker', date);
	};

	useEffect(() => {}, [data]);

	return (
		<div className='field mb-2'>
			<RequiredLabel>Place Type</RequiredLabel>
			<div className='control'>
				<input
					className='input mb-1'
					type='text'
					placeholder='ภาษาไทย'
					value={nameTH}
					onChange={() => {}}
				/>
				<input
					className='input'
					type='text'
					placeholder='English'
					value={nameEN}
					onChange={() => {}}
				/>
			</div>
		</div>
	);
};

AdminFormVenue.propTypes = {
	action: PropTypes.string,
	data: PropTypes.object,
};

AdminFormVenue.defaultProps = {
	action: 'view',
	data: null,
};

export default AdminFormVenue;
