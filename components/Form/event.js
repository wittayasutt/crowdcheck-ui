import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent } from '../../helpers';
import { defaultZoom } from '../Map/const';

// components
import Input2Lang from './input2Lang';
import InputLocation from './inputLocation';
import InputNumber from './inputNumber';

// lang
import t from '../../translate';

const AdminFormEvent = ({ data, areaId, isView, onUpdate }) => {
	const router = useRouter();
	const { locale } = router;

	// form
	const initData = {
		th: '',
		en: '',
	};

	const [name, setName] = useState(initData);
	const [location, setLocation] = useState({
		lat: '',
		lng: '',
	});
	const [zoomLevel, setZoomLevel] = useState(defaultZoom);

	const lang = (item) => {
		return item.en && item.th;
	};

	useEffect(() => {
		if (!isView) {
			const payload = {
				name: [
					{
						language: 'EN',
						content: name.en,
					},
					{
						language: 'TH',
						content: name.th,
					},
				],
				location: {
					latitude: location.lat,
					longtitude: location.lng,
				},
				gmapZoomLevel: zoomLevel,
				area: areaId,
			};

			const isError = !lang(name) || !location.lat || !location.lng || !zoomLevel || !areaId;
			onUpdate({ payload, isError });
		}
	}, [name, location, zoomLevel, areaId]);

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.name) {
			setName({
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

		if (data.gmapZoomLevel) {
			setZoomLevel(data.gmapZoomLevel);
		}
	}, [data]);

	return (
		<>
			<Input2Lang title={t[locale].eventName} data={name} onChange={(e) => setName(e)} isView={isView} require />

			<InputLocation title={t[locale].coordinate} data={location} onChange={(e) => setLocation(e)} isView={isView} />

			<InputNumber
				title={t[locale].zoomLevel}
				data={zoomLevel}
				onChange={(e) => setZoomLevel(e)}
				isView={isView}
				min={0}
				max={19}
				require
			/>
		</>
	);
};

AdminFormEvent.propTypes = {
	data: PropTypes.object,
	areaId: PropTypes.string,
	isView: PropTypes.bool,
	onUpdate: PropTypes.func,
};

AdminFormEvent.defaultProps = {
	data: null,
	areaId: null,
	isView: false,
	onUpdate: () => {},
};

export default AdminFormEvent;
