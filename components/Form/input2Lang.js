import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import RequiredLabel from '../Base/requiredLabel';

const AdminFormInput = ({
	title,
	require,
	data,
	onChange,
	isView,
	isTextarea,
}) => {
	const [valueTH, setValueTH] = useState('');
	const [valueEN, setValueEN] = useState('');

	const handleChangeTH = (e) => {
		onChange({
			...data,
			th: e.target.value,
		});
	};

	const handleChangeEN = (e) => {
		onChange({
			...data,
			en: e.target.value,
		});
	};

	useEffect(() => {
		if (data.th) {
			setValueTH(data.th);
		} else {
			setValueTH('');
		}

		if (data.en) {
			setValueEN(data.en);
		} else {
			setValueEN('');
		}
	}, [data]);

	return (
		<div className='field mb-2'>
			{require ? <RequiredLabel>{title}</RequiredLabel> : <div>{title}</div>}
			<div className='control'>
				{isView && <strong>{valueTH}</strong>}
				{!isView && !isTextarea && (
					<input
						className='input mb-1'
						type='text'
						placeholder='ภาษาไทย'
						value={valueTH}
						onChange={handleChangeTH}
					/>
				)}
				{!isView && isTextarea && (
					<textarea
						className='textarea mb-1'
						placeholder='ภาษาไทย'
						rows='8'
						value={valueTH}
						onChange={handleChangeTH}
					></textarea>
				)}

				{isView && <br />}

				{isView && <strong>{valueEN}</strong>}
				{!isView && !isTextarea && (
					<input
						className='input mb-1'
						type='text'
						placeholder='English'
						value={valueEN}
						onChange={handleChangeEN}
					/>
				)}
				{!isView && isTextarea && (
					<textarea
						className='textarea mb-1'
						placeholder='English'
						rows='8'
						value={valueEN}
						onChange={handleChangeEN}
					></textarea>
				)}
			</div>
		</div>
	);
};

AdminFormInput.propTypes = {
	title: PropTypes.string,
	data: PropTypes.object,
	onChange: PropTypes.func,
	isView: PropTypes.bool,
	isTextarea: PropTypes.bool,
};

AdminFormInput.defaultProps = {
	title: '',
	data: {},
	onChange: () => {},
	isView: false,
	isTextarea: false,
};

export default AdminFormInput;
