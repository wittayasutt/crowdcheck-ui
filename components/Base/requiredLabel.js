import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.label`
	span {
		color: ${(props) => props.theme.color.red};
	}
`;

const RequiredLabel = ({ children }) => {
	return (
		<Wrapper className='label'>
			{children}
			<span>*</span>:
		</Wrapper>
	);
};

RequiredLabel.propTypes = {
	children: PropTypes.node,
};

RequiredLabel.defaultProps = {
	children: <></>,
};

export default RequiredLabel;
