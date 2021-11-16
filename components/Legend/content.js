import styled from 'styled-components';
import { useEffect } from 'react';
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
	const setFilter = (filter) => dispatch({ type: 'SET_FILTER', filter });
	const setPoi = (poi) => dispatch({ type: 'SET_POI', poi });
	const toLocation = () => dispatch({ type: 'TO_LOCATION', coord: 'CURRENT' });

	const filter = useSelector((state) => state.filter);
	const poi = useSelector((state) => state.poi);

	return { togglePlaceName, filter, setFilter, poi, setPoi, toLocation };
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
	margin-top: 12px;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-right: 16px;
	}
`;

const Title = styled.h4`
	font-size: 11px;
	margin-bottom: 12px;
`;

const filterList = ['atk', 'notRequire', 'requireOne', 'requireTwo'];
const poiList = ['cafeAndRestaurant', 'parking', 'gallery', 'designStudio', 'craft', 'fashion'];

const LegendContent = () => {
	const router = useRouter();
	const { locale } = router;

	const { togglePlaceName, filter, setFilter, poi, setPoi, toLocation } = useRedux();

	const handleTogglePlaceName = () => {
		togglePlaceName();
	};

	const handleSetFilter = (newFilter) => {
		if (!newFilter) {
			return;
		}

		const found = filter.find((item) => item === newFilter);

		let updatedFilter = [];
		if (found) {
			updatedFilter = filter.filter((item) => item !== newFilter);
			localStorage.removeItem(newFilter);
		} else {
			updatedFilter = [...filter, newFilter];
			localStorage.setItem(newFilter, true);
		}

		setFilter(updatedFilter);
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

	useEffect(() => {
		const atk = localStorage.getItem('atk');
		const notRequire = localStorage.getItem('notRequire');
		const requireOne = localStorage.getItem('requireOne');
		const requireTwo = localStorage.getItem('requireTwo');

		const updatedFilter = [];
		if (atk) {
			updatedFilter.push('atk');
		}
		if (notRequire) {
			updatedFilter.push('notRequire');
		}
		if (requireOne) {
			updatedFilter.push('requireOne');
		}
		if (requireTwo) {
			updatedFilter.push('requireTwo');
		}

		setFilter(updatedFilter);
	}, []);

	return (
		<Wrapper>
			<Title>{t[locale].filter.title}</Title>
			{filterList.map((item, index) => (
				<Checkbox
					key={`${item}-${index}`}
					label={t[locale].filter[item]}
					logo={`/images/filter/${item}.svg`}
					checked={filter.some((filterItem) => filterItem === item)}
					onChange={() => handleSetFilter(item)}
				/>
			))}

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

			{/* NOTE: For Bangkok Event */}
			{/* <Title>{t[locale].pointOfInterest.title}</Title>
			{poiList.map((item, index) => (
				<Checkbox
					key={`${item}-${index}`}
					label={t[locale].pointOfInterest[item]}
					logo={`/POI/${item}.png`}
					checked={poi.some((poiItem) => poiItem === item)}
					onChange={() => handleSetPoi(item)}
				/>
			))} */}
		</Wrapper>
	);
};

export default LegendContent;
