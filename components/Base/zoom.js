import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	height: 32px;
	width: 32px;
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
`;

const Square = styled.div`
	height: 20px;
	width: 20px;
	border: 2px solid #000;
	position: absolute;
	transform: rotate(45deg);
	background-color: ${(props) => props.theme.color.white};
`;

const Number = styled.div`
	position: absolute;
	margin: 0 1px 0 0;
	font-size: 12px;
	font-weight: 600;
`;

const ZoomComponent = ({ number }) => {
	return (
		<Wrapper>
			<Square />
			<Number>{number}</Number>
		</Wrapper>
	);
};

ZoomComponent.propTypes = {
	number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ZoomComponent.defaultProps = {
	number: 'x',
};

export default ZoomComponent;
