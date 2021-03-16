import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Label = styled.label`
	display: flex;
	align-items: center;

	margin: 16px 0;
	padding-left: 24px;
	font-size: 11px;
	cursor: pointer;

	input {
		height: 0;
		width: 0;
		position: absolute;

		cursor: pointer;
		opacity: 0;

		&:checked ~ .checkmark:after {
			display: block;
		}
	}

	.checkmark {
		height: 16px;
		width: 16px;

		position: absolute;
		bottom: 0;
		left: 0;

		background-color: white;
		border: 2px solid black;

		&:after {
			content: '';
			position: absolute;
			display: none;
		}
	}

	.checkmark:after {
		width: 100%;
		height: 100%;
		background-color: black;
	}
`;

const Checkbox = ({ label, onChange }) => {
	const [checked, setChecked] = useState(false);

	const handleToggle = () => {
		const newChecked = !checked;

		setChecked(newChecked);
		onChange(newChecked);
	};

	return (
		<Label className='checkbox'>
			<input type='checkbox' checked={checked} onChange={handleToggle} />
			<span className='checkmark'></span>
			<span>{label}</span>
		</Label>
	);
};

Checkbox.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	label: '',
	onChange: () => {},
};

export default Checkbox;
