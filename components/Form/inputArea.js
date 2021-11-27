import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { service_get_area_list } from '../../services';
import { getContent } from '../../helpers';

// components
import RequiredLabel from '../Base/requiredLabel';

const AdminFormInputSelect = ({ title, require, data, onChange, isView }) => {
	const router = useRouter();
	const { locale } = router;

	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState('');
	const [viewValue, setViewValue] = useState({});
	const [areaList, setAreaList] = useState([]);
	const [option, setOption] = useState([]);

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	const getArea = () => {
		try {
			service_get_area_list().then((res) => {
				if (res.status === 'success') {
					setAreaList(res.data);
				}

				setLoading(false);
			});
		} catch {}
	};

	useEffect(() => {
		getArea();
	}, []);

	useEffect(() => {
		const optionList = areaList.map((item) => {
			return {
				id: item._id,
				name: {
					th: getContent(item.name, 'th'),
					en: getContent(item.name, 'en'),
				},
			};
		});

		setOption(optionList);
	}, [areaList, locale]);

	useEffect(() => {
		if (data) {
			setValue(data);

			const foundData = option.find((item) => item.id === data);
			if (foundData) {
				setViewValue(foundData.name);
			}
		} else if (option && option.length) {
			setValue(option[0].id);
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
				) : (
					<div className='select'>
						<select onChange={handleChange} value={value}>
							{option.map((item, index) => (
								<option key={index} value={item.id}>
									{item[locale].name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		</div>
	);
};

AdminFormInputSelect.propTypes = {
	title: PropTypes.string,
	require: PropTypes.bool,
	data: PropTypes.string,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
};

AdminFormInputSelect.defaultProps = {
	title: '',
	require: false,
	data: '',
	onChange: () => {},
	isView: false,
};

export default AdminFormInputSelect;
