import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	min-height: 56px;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.color.white};
	font-size: 14px;
	padding: 8px 16px;

	cursor: pointer;
`;

const DropdownItem = ({ children, onClick }) => {
	return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

DropdownItem.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node,
};

DropdownItem.defaultProps = {
	children: <></>,
	onClick: () => {},
};

export default DropdownItem;
