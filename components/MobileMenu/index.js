import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const useRedux = () => {
	const dispatch = useDispatch();
	const hideMenu = () => dispatch({ type: 'HIDE_MENU' });

	return { hideMenu };
};

const Wrapper = styled.div`
	height: calc(100vh - 128px);
	width: 100vw;

	position: fixed;
	top: 64px;
	left: 0;

	z-index: 1000;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: none;
	}
`;

const WrapperOverlay = styled.div`
	height: 100%;
	width: 100%;

	position: relative;
`;

const Overlay = styled.div`
	height: 100%;
	width: 100%;

	position: absolute;
	top: 0;
	left: 0;
`;

const ContentWrapper = styled.div`
	max-height: 100%;
	width: 256px;
	padding: 0 16px;
	background-color: ${(props) => props.theme.color.white};
	overflow-y: auto;

	position: absolute;
	bottom: 0;
	left: 0;
`;

const MobileMenu = ({ children }) => {
	const { hideMenu } = useRedux();

	const handleCloseMenu = () => {
		hideMenu();
	};

	return (
		<Wrapper>
			<WrapperOverlay>
				<Overlay onClick={handleCloseMenu} />
				<ContentWrapper>{children}</ContentWrapper>
			</WrapperOverlay>
		</Wrapper>
	);
};

MobileMenu.propTypes = {
	children: PropTypes.node,
};

MobileMenu.defaultProps = {
	children: <></>,
};

export default MobileMenu;
