import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const useRedux = () => {
	const dispatch = useDispatch();
	const deselectPlace = () => dispatch({ type: 'DESELECT_PLACE' });

	return { deselectPlace };
};

const Wrapper = styled.div`
	height: calc(100vh - 64px);
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
	max-height: 90%;
	width: 100%;
	background-color: ${(props) => props.theme.color.white};

	position: absolute;
	bottom: 0;
	left: 0;
`;

const MobileMenuPlace = ({ children }) => {
	const { deselectPlace } = useRedux();

	const handleClosePlace = () => {
		deselectPlace();
	};

	return (
		<Wrapper>
			<WrapperOverlay>
				<Overlay onClick={handleClosePlace} />
				<ContentWrapper>{children}</ContentWrapper>
			</WrapperOverlay>
		</Wrapper>
	);
};

MobileMenuPlace.propTypes = {
	children: PropTypes.node,
};

MobileMenuPlace.defaultProps = {
	children: <></>,
};

export default MobileMenuPlace;
