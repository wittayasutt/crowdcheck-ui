import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 40px;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0;

	background-color: ${(props) => props.theme.color.green};
	color: ${(props) => props.theme.color.white};
	font-size: 14px;
	font-weight: 600;

	z-index: 1;
`;

const InformationText = ({ text }) => {
	return <Wrapper>{text}</Wrapper>;
};

InformationText.propTypes = {
	text: PropTypes.string,
};

InformationText.defaultProps = {
	text: '',
};

export default InformationText;
