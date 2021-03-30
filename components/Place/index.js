import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import Content from './content';
import MobileMenuPlace from '../MobileMenu/place';
import PlaceTitle from './title';

const usePlace = () => {
	const place = useSelector((state) => state.place);

	return { place };
};

const Desktop = styled.div`
	display: none;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: initial;

		position: fixed;
		top: 64px;
		right: 0;

		height: calc(100vh - 112px);
		width: 480px;
		max-width: 40vw;
		background-color: ${(props) => props.theme.color.white};
		overflow-y: auto;
	}
`;

const Place = () => {
	const { place } = usePlace();

	return (
		<>
			{place && (
				<MobileMenuPlace>
					<PlaceTitle data={place} />
					<Content data={place} />
				</MobileMenuPlace>
			)}

			{place && (
				<Desktop>
					<PlaceTitle data={place} />
					<Content data={place} />
				</Desktop>
			)}
		</>
	);
};

export default Place;
