import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { getContent, formatDate, formatTime } from '../../helpers';

// components
import DatePicker from '../../components/Base/datePicker';
import TimePicker from '../../components/Base/timePicker';
import UploadImage from '../../components/Base/uploadImage';
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';
import InputProgramType from './inputProgramType';

// lang
import t from '../../translate';

import { FORM_PROGRAM_TYPE } from './const';

const Row = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Col = styled.div`
	width: 50%;
`;

const AdminFormProgram = ({ data, isView, onUpdate }) => {
	const router = useRouter();
	const { locale } = router;

	// form
	const initData = {
		th: '',
		en: '',
	};

	const [programName, setProgramName] = useState(initData);
	const [programType, setProgramType] = useState('showcase');
	const [owner, setOwner] = useState(initData);
	const [link, setLink] = useState(initData);
	const [linkSrc, setLinkSrc] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [image, setImage] = useState('/mock/colosseum.jpeg');
	const [detail, setDetail] = useState(initData);

	const handleSetImage = () => {
		setImage();
	};

	const lang = (item) => {
		return item.en && item.th;
	};

	useEffect(() => {
		if (!isView) {
			const payload = {
				name: [
					{
						language: 'EN',
						content: programName.en,
					},
					{
						language: 'TH',
						content: programName.th,
					},
				],
				type: [
					{
						language: 'EN',
						content: t['en'].programType[programType],
					},
					{
						language: 'TH',
						content: t['th'].programType[programType],
					},
				],
				owner: [
					{
						language: 'EN',
						content: owner.en,
					},
					{
						language: 'TH',
						content: owner.th,
					},
				],
				description: [
					{
						language: 'EN',
						content: detail.en,
					},
					{
						language: 'TH',
						content: detail.th,
					},
				],
				website: {
					name: [
						{
							language: 'EN',
							content: link.en,
						},
						{
							language: 'TH',
							content: link.th,
						},
					],
					url: linkSrc,
				},
				images: ['https://examplehost.com/images/123456.jpg'],
				openingTime: {
					dates: {
						start: dayjs(startDate).format('DD/MM/YYYY'),
						end: dayjs(endDate).format('DD/MM/YYYY'),
					},
					hours: {
						start: dayjs(startTime).format('HH:mm'),
						end: dayjs(endTime).format('HH:mm'),
					},
				},
			};

			const isError =
				!lang(programName) || !startDate || !endDate || !startTime || !endTime;

			onUpdate({ payload, isError });
		}
	}, [
		programName,
		programType,
		owner,
		link,
		linkSrc,
		startDate,
		endDate,
		startTime,
		endTime,
		detail,
	]);

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.name) {
			setProgramName({
				th: getContent(data.name, 'th'),
				en: getContent(data.name, 'en'),
			});
		}

		if (data.type) {
			const typeEN = getContent(data.type, 'en');
			const type = FORM_PROGRAM_TYPE[typeEN];

			setProgramType(type);
		}

		if (data.owner) {
			setOwner({
				th: getContent(data.owner, 'th'),
				en: getContent(data.owner, 'en'),
			});
		}

		if (data.website && data.website[0]) {
			const { name, url } = data.website[0];

			if (name) {
				setLink({
					th: getContent(name, 'th'),
					en: getContent(name, 'en'),
				});
			}

			setLinkSrc(url);
		}

		if (data.openingTime) {
			const { dates, hours } = data.openingTime;
			if (dates) {
				setStartDate(formatDate(dates.start));
				setEndDate(formatDate(dates.end));
			}

			if (hours) {
				setStartTime(formatTime(hours.start));
				setEndTime(formatTime(hours.end));
			}
		}

		if (data.description) {
			setDetail({
				th: getContent(data.description, 'th'),
				en: getContent(data.description, 'en'),
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

			<InputProgramType
				title={t[locale].programType.title}
				data={programType}
				onChange={(e) => setProgramType(e)}
				isView={isView}
			/>

			<Input2Lang
				title={t[locale].owner}
				data={owner}
				onChange={(e) => setOwner(e)}
				isView={isView}
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
							onChange={(e) => setLinkSrc(e.target.value)}
						/>
					</div>
				)}
			</div>

			<div className='field mb-2'>
				<Row>
					<Col>
						<RequiredLabel>{t[locale].dateTime.startDate}</RequiredLabel>
						<div className='control'>
							<DatePicker
								onChange={(e) => setStartDate(e)}
								date={startDate}
								placeholder={t[locale].dateTime.selectStartDate}
								isView={isView}
							/>
						</div>
					</Col>

					<Col>
						<RequiredLabel>{t[locale].dateTime.endDate}</RequiredLabel>
						<div className='control'>
							<DatePicker
								onChange={(e) => setEndDate(e)}
								date={endDate}
								placeholder={t[locale].dateTime.selectEndDate}
								isView={isView}
							/>
						</div>
					</Col>
				</Row>
			</div>

			<div className='field mb-2'>
				<Row>
					<Col>
						<RequiredLabel>{t[locale].dateTime.startTime}</RequiredLabel>
						<div className='control'>
							<TimePicker
								onChange={(e) => setStartTime(e)}
								date={startTime}
								placeholder={t[locale].dateTime.selectStartTime}
								isView={isView}
							/>
						</div>
					</Col>

					<Col>
						<RequiredLabel>{t[locale].dateTime.endTime}</RequiredLabel>
						<div className='control'>
							<TimePicker
								onChange={(e) => setEndTime(e)}
								date={endTime}
								placeholder={t[locale].dateTime.selectEndTime}
								isView={isView}
							/>
						</div>
					</Col>
				</Row>
			</div>

			{isView ? (
				<img src={image} alt={t[locale].programName} />
			) : (
				<div className='field mb-2'>
					<label className='label'>{t[locale].uploadImage}:</label>
					<UploadImage />
				</div>
			)}

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
	onUpdate: PropTypes.func,
};

AdminFormProgram.defaultProps = {
	data: null,
	isView: false,
	onUpdate: () => {},
};

export default AdminFormProgram;
