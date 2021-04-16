import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';
import Input2Lang from './input2Lang';
import InputLocation from './inputLocation';

// lang
import t from '../../translate';

const AdminFormVenue = ({ data, isView }) => {
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

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.refId) {
			setId(data.refId);
		}

		if (data.name) {
			setVenueName({
				th: data.name,
				en: data.name,
			});
		}

		if (data.location) {
			setLocation({
				lat: data.location.lat,
				lng: data.location.lng,
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
				title={t[locale].venueName}
				data={venueName}
				onChange={(e) => setVenueName(e)}
				isView={isView}
				require
			/>

			<InputLocation
				title={t[locale].locationName}
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
};

AdminFormVenue.defaultProps = {
	data: null,
	isView: false,
};

export default AdminFormVenue;
