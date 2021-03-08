import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	color: ${(props) => props.theme.color.red};
	font-size: 14px;

	margin: 8px 0 16px;
`;

const ErrorText = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

ErrorText.propTypes = {
	children: PropTypes.node,
};

ErrorText.defaultProps = {
	children: <></>,
};

export default ErrorText;
