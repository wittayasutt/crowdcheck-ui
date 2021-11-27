import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';

// lang
import t from '../../translate';

const AdminFormInputProgramType = ({ title, require, data, onChange, isView }) => {
	const router = useRouter();
	const { locale } = router;

	const [value, setValue] = useState('');

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	useEffect(() => {
		setValue(data);
	}, [data]);

	return (
		<div className='field mb-2'>
			{require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>}
			<div className='control'>
				{isView ? (
					<>
						<strong>{t['th'].programType[value]}</strong>
						<br />
						<strong>{t['en'].programType[value]}</strong>
					</>
				) : (
					<div className='select'>
						<select onChange={handleChange} value={value}>
							<option value='showcase'>{t[locale].programType.showcase}</option>
							<option value='showcaseAndExhibition'>{t[locale].programType.showcaseAndExhibition}</option>
							<option value='creativeMarket'>{t[locale].programType.creativeMarket}</option>
							<option value='workshop'>{t[locale].programType.workshop}</option>
							<option value='talk'>{t[locale].programType.talk}</option>
							<option value='event'>{t[locale].programType.event}</option>
							<option value='tour'>{t[locale].programType.tour}</option>
							<option value='promotion'>{t[locale].programType.promotion}</option>
						</select>
					</div>
				)}
			</div>
		</div>
	);
};

AdminFormInputProgramType.propTypes = {
	title: PropTypes.string,
	require: PropTypes.bool,
	data: PropTypes.string,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
};

AdminFormInputProgramType.defaultProps = {
	title: '',
	require: false,
	data: '',
	onChange: () => {},
	isView: false,
};

export default AdminFormInputProgramType;
