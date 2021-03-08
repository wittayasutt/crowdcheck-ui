import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import DateTimePicker from '../../components/Base/dateTime';
import UploadImage from '../../components/Base/uploadImage';
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';

const Row = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Col = styled.div`
	width: 50%;
`;

const AdminFormVenue = ({ data, isView }) => {
	// form
	const initData = {
		th: '',
		en: '',
	};

	const [id, setId] = useState('');
	const [placeName, setPlaceName] = useState(initData);
	const [placeType, setPlaceType] = useState(initData);
	const [owner, setOwner] = useState(initData);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [detail, setDetail] = useState(initData);

	const handleSetId = (e) => {
		setId(e.target.value);
	};

	const handleChangeStartDatePicker = (date) => {
		console.log('StartDatePicker', date);
	};

	const handleChangeEndDatePicker = (date) => {
		console.log('EndDatePicker', date);
	};

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.refId) {
			setId(data.refId);
		}

		if (data.name) {
			setPlaceName({
				th: data.name,
				en: data.name,
			});
		}

		if (data.type) {
			setPlaceType({
				th: data.type,
				en: data.type,
			});
		}

		if (data.owner) {
			setOwner({
				th: data.owner,
				en: data.owner,
			});
		}

		// TODO: add real date
		setStartDate(new Date());
		setEndDate(new Date());

		if (data.description) {
			setDetail({
				th: data.description,
				en: data.description,
			});
		}
	}, [data]);

	return (
		<>
			<div className='field mb-2'>
				<RequiredLabel>ID</RequiredLabel>
				{isView ? (
					<strong>{id}</strong>
				) : (
					<div className='control'>
						<input
							className='input'
							type='number'
							placeholder='1'
							min='0'
							value={id}
							onChange={handleSetId}
						/>
					</div>
				)}
			</div>

			<Input2Lang
				title='Place Name'
				data={placeName}
				onChange={(e) => setPlaceName(e)}
				isView={isView}
			/>

			<Input2Lang
				title='Place Type'
				data={placeType}
				onChange={(e) => setPlaceType(e)}
				isView={isView}
			/>

			<Input2Lang
				title='Owner'
				data={owner}
				onChange={(e) => setOwner(e)}
				isView={isView}
			/>

			<div className='field mb-2'>
				<Row>
					<Col>
						<RequiredLabel>Start Date</RequiredLabel>
						<div className='control'>
							<DateTimePicker
								onChange={handleChangeStartDatePicker}
								date={startDate}
								placeholder={'Select Start Date'}
							/>
						</div>
					</Col>

					<Col>
						<RequiredLabel>End Date</RequiredLabel>
						<div className='control'>
							<DateTimePicker
								onChange={handleChangeEndDatePicker}
								date={endDate}
								placeholder={'Select End Date'}
							/>
						</div>
					</Col>
				</Row>
			</div>

			<div className='field mb-2'>
				<label className='label'>Upload Image:</label>
				<UploadImage />
			</div>

			<Input2Lang
				title='Detail'
				data={detail}
				onChange={(e) => setDetail(e)}
				isView={isView}
				isTextarea
			/>
		</>
	);
};

AdminFormVenue.propTypes = {
	data: PropTypes.object,
	isView: PropTypes.bool,
};

AdminFormVenue.defaultProps = {
	data: null,
	isView: false,
};

export default AdminFormVenue;
