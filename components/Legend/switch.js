import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Switch = styled.div`
	.switch {
		position: relative;
		display: inline-block;

		height: 20px;
		width: 40px;
	}

	.switch input {
		height: 0;
		width: 0;
		opacity: 0;
	}

	.slider {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d6d9dd;

		transition: 0.4s;
		-webkit-transition: 0.4s;
		cursor: pointer;
	}

	.slider:before {
		content: '';
		height: 20px;
		width: 20px;
		background-color: #f3f3f4;

		position: absolute;
		transition: 0.4s;
		-webkit-transition: 0.4s;
	}

	input:checked + .slider {
		background-color: ${(props) => props.theme.color.green};
	}

	input:focus + .slider {
		box-shadow: 0 0 1px ${(props) => props.theme.color.green};
	}

	input:checked + .slider:before {
		transform: translateX(20px);
		-webkit-transform: translateX(20px);
		-ms-transform: translateX(20px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 20px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
`;

const Checkbox = ({ onChange }) => {
	const [checked, setChecked] = useState(false);

	const handleToggle = () => {
		const newChecked = !checked;

		setChecked(newChecked);
		onChange(newChecked);
	};

	return (
		<Switch onChange={handleToggle}>
			<label className='switch'>
				<input type='checkbox' />
				<span className='slider round'></span>
			</label>
		</Switch>
	);
};

Checkbox.propTypes = {
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	onChange: () => {},
};

export default Checkbox;
