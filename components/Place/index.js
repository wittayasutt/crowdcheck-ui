import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import Content from './content';
import MobileMenuPlace from '../MobileMenu/place';
import PlaceTitle from './title';

// lang
import t from '../../translate';

const useRedux = () => {
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

const NotFound = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	min-height: 20vh;
`;

const Place = ({ updatedTime }) => {
	const router = useRouter();
	const { locale } = router;

	const { place } = useRedux();

	return (
		<>
			{place && (
				<MobileMenuPlace>
					<PlaceTitle data={place} updatedTime={updatedTime} />
					{place.programs === 'NO_EVENT' ? (
						<NotFound>{t[locale].programNotFound}</NotFound>
					) : (
						<Content data={place} />
					)}
				</MobileMenuPlace>
			)}

			{place && (
				<Desktop>
					<PlaceTitle data={place} updatedTime={updatedTime} />
					{place.programs === 'NO_EVENT' ? (
						<NotFound>{t[locale].programNotFound}</NotFound>
					) : (
						<Content data={place} />
					)}
				</Desktop>
			)}
		</>
	);
};

Place.propTypes = {
	updatedTime: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.instanceOf(Date),
	]),
};

Place.defaultProps = {
	updatedTime: new Date(),
};

export default Place;
