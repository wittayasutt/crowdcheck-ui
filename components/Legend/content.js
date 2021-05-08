import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// components
import Zoom from '../Base/zoom';
import Marker from '../Marker';
import Switch from './switch';
import Checkbox from './checkbox';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const togglePlaceName = () => dispatch({ type: 'TOGGLE_PLACE_NAME' });
	const setPoi = (poi) => dispatch({ type: 'SET_POI', poi });
	const toLocation = () => dispatch({ type: 'TO_LOCATION', coord: 'CURRENT' });
	const poi = useSelector((state) => state.poi);

	return { togglePlaceName, poi, setPoi, toLocation };
};

const Wrapper = styled.div``;

const Row = styled.div`
	min-height: 42px;
	display: flex;
	align-items: center;
	margin: 8px 0;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-left: 16px;

		strong {
			font-size: 13px;
		}
	}
`;

const SwitchWrapper = styled.div`
	display: flex;
	align-items: center;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-right: 16px;
	}
`;

const Title = styled.h4`
	font-size: 12px;
	font-weight: 600;

	margin: 24px 0 12px;
`;

const poiList = [
	'cafeAndRestaurant',
	'parking',
	'gallery',
	'designStudio',
	'craft',
	'fashion',
];

const LegendContent = () => {
	const router = useRouter();
	const { locale } = router;

	const { togglePlaceName, poi, setPoi, toLocation } = useRedux();

	const handleTogglePlaceName = () => {
		togglePlaceName();
	};

	const handleSetPoi = (newPoi) => {
		if (!poi) {
			return;
		}

		const found = poi.find((item) => item === newPoi);

		let updatedPoi = [];
		if (found) {
			updatedPoi = poi.filter((item) => item !== newPoi);
		} else {
			updatedPoi = [...poi, newPoi];
		}

		setPoi(updatedPoi);
	};

	return (
		<Wrapper>
			<SwitchWrapper>
				<p>{t[locale].locationName}</p>
				<Switch onChange={handleTogglePlaceName} />
			</SwitchWrapper>
			<Row>
				<Marker level={0} onClick={toLocation} />
				<p>{t[locale].legend.find}</p>
			</Row>
			<Row>
				<Zoom />
				<p>{t[locale].legend.zoom}</p>
			</Row>
			<Row>
				<Marker level={1} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.goAhead,
					}}
				/>
			</Row>
			<Row>
				<Marker level={2} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.go,
					}}
				/>
			</Row>
			<Row>
				<Marker level={3} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.wait,
					}}
				/>
			</Row>
			<Row>
				<Marker level={4} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.avoid,
					}}
				/>
			</Row>

			<Title>{t[locale].pointOfInterest.title}</Title>
			{poiList.map((item, index) => (
				<Checkbox
					key={`${item}-${index}`}
					label={t[locale].pointOfInterest[item]}
					checked={poi.some((poiItem) => poiItem === item)}
					onChange={() => handleSetPoi(item)}
				/>
			))}
		</Wrapper>
	);
};

export default LegendContent;
