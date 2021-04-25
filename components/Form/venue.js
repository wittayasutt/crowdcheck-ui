import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent } from '../../helpers';

// components
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';
import InputLocation from './inputLocation';

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
			};

			const isError = !id || !lang(venueName) || !location.lat || !location.lng;
			onUpdate({ payload, isError });
		}
	}, [id, venueName, location]);

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
	}, [data]);

	return (
		<>
			<div className='field mb-2'>
				<RequiredLabel>{t[locale].id}</RequiredLabel>
				{isView ? (
					<strong>{id}</strong>
				) : (
					<div className='control'>
						<input
							className='input'
							type='text'
							placeholder='A-100'
							value={id}
							onChange={handleSetId}
						/>
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

			<InputLocation
				title={t[locale].coordinate}
				data={location}
				onChange={(e) => setLocation(e)}
				isView={isView}
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
