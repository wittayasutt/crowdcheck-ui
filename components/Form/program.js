import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import DateTimePicker from '../../components/Base/dateTime';
import UploadImage from '../../components/Base/uploadImage';
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';

// lang
import t from '../../translate';

const Row = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Col = styled.div`
	width: 50%;
`;

const AdminFormProgram = ({ data, isView }) => {
	const router = useRouter();
	const { locale } = router;

	// form
	const initData = {
		th: '',
		en: '',
	};

	const [programName, setProgramName] = useState(initData);
	const [programType, setProgramType] = useState(initData);
	const [owner, setOwner] = useState(initData);
	const [link, setLink] = useState(initData);
	const [linkSrc, setLinkSrc] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [detail, setDetail] = useState(initData);

	const handleChangeStartDatePicker = (date) => {
		console.log('StartDatePicker', date);
	};

	const handleChangeEndDatePicker = (date) => {
		console.log('EndDatePicker', date);
	};

	const handleSetLinkSrc = (e) => {
		setLinkSrc(e.target.value);
	};

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.name) {
			setProgramName({
				th: data.name,
				en: data.name,
			});
		}

		if (data.type) {
			setProgramType({
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

		if (data.link) {
			setLink({
				th: data.link,
				en: data.link,
			});
		}

		if (data.linkSrc) {
			setLinkSrc(data.linkSrc);
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
			<Input2Lang
				title={t[locale].programName}
				data={programName}
				onChange={(e) => setProgramName(e)}
				isView={isView}
				require
			/>

			<Input2Lang
				title={t[locale].programType.title}
				data={programType}
				onChange={(e) => setProgramType(e)}
				isView={isView}
				require
			/>

			<Input2Lang
				title={t[locale].owner}
				data={owner}
				onChange={(e) => setOwner(e)}
				isView={isView}
				require
			/>

			<Input2Lang
				title={t[locale].link}
				data={link}
				onChange={(e) => setLink(e)}
				isView={isView}
			/>

			<div className='field mb-2'>
				{isView ? (
					<strong>{linkSrc}</strong>
				) : (
					<div className='control'>
						<input
							className='input'
							type='text'
							placeholder={t[locale].linkDestination}
							value={linkSrc}
							onChange={handleSetLinkSrc}
						/>
					</div>
				)}
			</div>

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
				<label className='label'>{t[locale].uploadImage}:</label>
				<UploadImage />
			</div>

			<Input2Lang
				title={t[locale].detail}
				data={detail}
				onChange={(e) => setDetail(e)}
				isView={isView}
				isTextarea
			/>
		</>
	);
};

AdminFormProgram.propTypes = {
	data: PropTypes.object,
	isView: PropTypes.bool,
};

AdminFormProgram.defaultProps = {
	data: null,
	isView: false,
};

export default AdminFormProgram;
