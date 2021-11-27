import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent } from '../../helpers';

// components
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';
import InputLocation from './inputLocation';
import InputBoolean from './inputBoolean';
import InputNumber from './inputNumber';

// lang
import t from '../../translate';

const AdminFormVenue = ({ data, isView, onUpdate }) => {
	const router = useRouter();
	const { locale } = router;

	// form
	const initData = {
		th: '',
		en: '',
	};

	const [id, setId] = useState('');
	const [venueName, setVenueName] = useState(initData);
	const [location, setLocation] = useState({
		lat: '',
		lng: '',
	});
	const [atkRequired, setAtkRequired] = useState(false);
	const [vaccineDosesRequired, setVaccineDosesRequired] = useState(0);

	const handleSetId = (e) => {
		setId(e.target.value);
	};

	const lang = (item) => {
		return item.en && item.th;
	};

	useEffect(() => {
		if (!isView) {
			const payload = {
				refId: id,
				name: [
					{
						language: 'EN',
						content: venueName.en,
					},
					{
						language: 'TH',
						content: venueName.th,
					},
				],
				location: {
					latitude: location.lat,
					longtitude: location.lng,
				},
				covid19Conditions: {
					isATKRequired: atkRequired,
					numberOfVaccineDosesRequired: vaccineDosesRequired || 0,
				},
			};

			const isError =
				!id ||
				!lang(venueName) ||
				!location.lat ||
				!location.lng ||
				(!vaccineDosesRequired && vaccineDosesRequired !== 0);
			onUpdate({ payload, isError });
		}
	}, [id, venueName, location, atkRequired, vaccineDosesRequired]);

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.refId) {
			setId(data.refId);
		}

		if (data.name) {
			setVenueName({
				th: getContent(data.name, 'th'),
				en: getContent(data.name, 'en'),
			});
		}

		if (data.location) {
			setLocation({
				lat: data.location.latitude,
				lng: data.location.longtitude,
			});
		}

		if (data.covid19Conditions) {
			if (data.covid19Conditions.isATKRequired) {
				setAtkRequired(data.covid19Conditions.isATKRequired);
			}

			if (data.covid19Conditions.numberOfVaccineDosesRequired) {
				setVaccineDosesRequired(data.covid19Conditions.numberOfVaccineDosesRequired);
			}
		}
	}, [data]);

	return (
		<>
			<div className='field mb-2'>
				<RequiredLabel>{t[locale].id}</RequiredLabel>
				{isView ? (
					<strong>{id}</strong>
				) : (
					<div className='control'>
						<input className='input' type='text' placeholder='01-AAA' value={id} onChange={handleSetId} />
					</div>
				)}
			</div>

			<Input2Lang
				title={t[locale].venueName}
				data={venueName}
				onChange={(e) => setVenueName(e)}
				isView={isView}
				require
			/>

			<InputLocation title={t[locale].coordinate} data={location} onChange={(e) => setLocation(e)} isView={isView} />

			<InputBoolean
				title={t[locale].atkRequired}
				data={atkRequired}
				onChange={(e) => setAtkRequired(e)}
				isView={isView}
				require
			/>

			<InputNumber
				title={t[locale].vaccineDosesRequired}
				data={vaccineDosesRequired}
				onChange={(e) => setVaccineDosesRequired(e)}
				isView={isView}
				min={0}
				max={2}
				require
			/>
		</>
	);
};

AdminFormVenue.propTypes = {
	data: PropTypes.object,
	isView: PropTypes.bool,
	onUpdate: PropTypes.func,
};

AdminFormVenue.defaultProps = {
	data: null,
	isView: false,
	onUpdate: () => {},
};

export default AdminFormVenue;
