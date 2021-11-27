import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';

// lang
import t from '../../translate';

const Label = styled.span`
	margin-left: 12px;
`;

const AdminFormInputBoolean = ({ title, require, data, onChange, isView }) => {
	const router = useRouter();
	const { locale } = router;

	const [boolean, setBoolean] = useState(false);

	useEffect(() => {
		setBoolean(data);
	}, [data]);

	return (
		<div className='field mb-2'>
			{require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>}
			<div className='control'>
				{isView ? (
					<strong>{boolean ? t[locale].boolean.yes : t[locale].boolean.no}</strong>
				) : (
					<div className='mb-1'>
						<label className='radio'>
							<input type='radio' name='boolean' onChange={() => onChange(true)} checked={boolean} />
							<Label>{t[locale].boolean.yes}</Label>
						</label>
						<label className='radio'>
							<input type='radio' name='boolean' onChange={() => onChange(false)} checked={!boolean} />
							<Label>{t[locale].boolean.no}</Label>
						</label>
					</div>
				)}
			</div>
		</div>
	);
};

AdminFormInputBoolean.propTypes = {
	title: PropTypes.string,
	require: PropTypes.bool,
	data: PropTypes.bool,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
};

AdminFormInputBoolean.defaultProps = {
	title: '',
	require: false,
	data: false,
	onChange: () => {},
	isView: false,
};

export default AdminFormInputBoolean;
