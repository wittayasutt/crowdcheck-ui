import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { service_get_area_and_event } from '../../services';
import { getContent } from '../../helpers';

// components
import RequiredLabel from '../Base/requiredLabel';

const AdminFormInputEvent = ({ title, require, data, onChange, isView }) => {
	const router = useRouter();
	const { locale } = router;

	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState('');
	const [viewValue, setViewValue] = useState({});
	const [eventList, setEventList] = useState([]);
	const [option, setOption] = useState([]);

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	const flattenEvent = (res) => {
		if (!res) {
			return [];
		}

		const events = res.map((item) => item.events);
		return events.reduce((acc, val) => acc.concat(val), []);
	};

	const getEvent = () => {
		try {
			service_get_area_and_event().then((res) => {
				if (res.status === 'success') {
					const flattedEvent = flattenEvent(res.data);
					setEventList(flattedEvent);
				}

				setLoading(false);
			});
		} catch {}
	};

	useEffect(() => {
		getEvent();
	}, []);

	useEffect(() => {
		const optionList = eventList.map((item) => {
			if (!item) {
				return null;
			}

			return {
				id: item._id,
				name: {
					th: getContent(item.name, 'th'),
					en: getContent(item.name, 'en'),
				},
			};
		});

		setOption(optionList);
	}, [eventList, locale]);

	useEffect(() => {
		if (data) {
			setValue(data);

			const foundData = option.find((item) => item.id === data);
			if (foundData) {
				setViewValue(foundData.name);
			}
		} else if (option && option.length) {
			setValue(option[0].id);
			onChange(option[0].id);
		} else {
			setValue(null);
		}
	}, [data, option]);

	if (loading || !value) {
		return require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>;
	}

	return (
		<div className='field mb-2'>
			{require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>}
			<div className='control'>
				{isView ? (
					<>
						<strong>{viewValue['th'] || '-'}</strong>
						<br />
						<strong>{viewValue['en'] || '-'}</strong>
					</>
				) : option ? (
					<div className='select'>
						<select onChange={handleChange} value={value}>
							{option.map((item, index) => {
								if (!item || !locale) {
									return;
								}

								return (
									<option key={index} value={item.id}>
										{item.name[locale]}
									</option>
								);
							})}
						</select>
					</div>
				) : null}
			</div>
		</div>
	);
};

AdminFormInputEvent.propTypes = {
	title: PropTypes.string,
	require: PropTypes.bool,
	data: PropTypes.string,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
};

AdminFormInputEvent.defaultProps = {
	title: '',
	require: false,
	data: '',
	onChange: () => {},
	isView: false,
};

export default AdminFormInputEvent;
