import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// components
import Marker from '../Marker';

const useRedux = () => {
	const dispatch = useDispatch();
	const toLocation = () => dispatch({ type: 'TO_LOCATION', coord: 'CURRENT' });

	return { toLocation };
};

const Wrapper = styled.div`
	height: 40px;
	width: 40px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: absolute;
	bottom: 120px;
	right: 8px;

	background-color: ${(props) => props.theme.color.white};
	border-radius: 50%;

	cursor: pointer;
	z-index: 1;
`;

const ToLocation = () => {
	const { toLocation } = useRedux();

	return (
		<Wrapper onClick={toLocation}>
			<Marker level={0} />
		</Wrapper>
	);
};

export default ToLocation;
