import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	height: 22px;
	width: 22px;

	margin-right: 8px;
`;

const Label = styled.label`
	display: flex;
	align-items: center;

	margin: 12px 0;
	padding-left: 24px;
	font-size: 12px;
	font-weight: 500;
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

	.label {
		font-size: 11px;
	}
`;

const Checkbox = ({ label, logo, checked, onChange }) => {
	const handleToggle = () => {
		const newChecked = !checked;
		onChange(newChecked);
	};

	return (
		<Wrapper>
			<Logo className='logo' src={logo} alt={label} />
			<Label className='checkbox'>
				<input type='checkbox' checked={checked} onChange={handleToggle} />
				<span className='checkmark'></span>
				<span className='label'>{label}</span>
			</Label>
		</Wrapper>
	);
};

Checkbox.propTypes = {
	label: PropTypes.string,
	logo: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	label: '',
	checked: false,
	onChange: () => {},
};

export default Checkbox;
