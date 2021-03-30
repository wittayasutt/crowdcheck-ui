import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getLevelColor, getPeopleNumber } from '../../helpers';

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

	const data = {
		programName: 'Lighting Exhibition',
		programImage: '/mock/colosseum.jpeg',
		detail: 'Lighting Designers Thailand',
		date: Date.now(),
		people: getPeopleNumber(2),
		levelColor: getLevelColor(2),
	};

	return (
		<>
			{place && (
				<MobileMenuPlace>
					<PlaceTitle data={data} />
					<Content data={data} />
				</MobileMenuPlace>
			)}

			{place && (
				<Desktop>
					<PlaceTitle data={data} />
					<Content data={data} />
				</Desktop>
			)}
		</>
	);
};

export default Place;
