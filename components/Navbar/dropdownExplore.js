import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { service_get_area_and_event } from '../../services';
import { defaultCenter, defaultZoom } from '../Map/const';
import { getContent } from '../../helpers';

// components
import Dropdown from '../Base/dropdown';
import DropdownItem from '../Base/dropdownItem';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const toLocation = (coord) => dispatch({ type: 'TO_LOCATION', coord });

	return { toLocation };
};

const BackItem = styled.span`
	flex: 1;
	text-align: center;

	/* Make it center */
	margin-right: 16px;
`;

const ProvinceItem = styled.span`
	flex: 1;
	font-weight: 600;
	text-align: center;
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 16px;
	width: 16px;
`;

const DropdownExplore = () => {
	const router = useRouter();
	const { locale } = router;

	const { toLocation } = useRedux();

	const [exploreListAPI, setExploreListAPI] = useState([]);
	const [exploreList, setExploreList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [eventName, setEventName] = useState(null);

	const setDefault = () => {
		setEventList([]);
	};

	const handleSelectProvince = (selectProvinceId) => {
		const found = exploreList.find((item) => item.id === selectProvinceId);
		const foundEventList = found ? found.event : [];
		setEventList(foundEventList);
	};

	const handleSelectEvent = (event) => {
		setEventName(event.nameAPI);
		toLocation(event.coord);
	};

	const transformEvent = (events) => {
		return events.map((event) => {
			if (!event) {
				return null;
			}

			return {
				id: event._id,
				name: getContent(event.name, locale),
				nameAPI: event.name,
				coord: {
					latitude: event.location?.latitude ?? defaultCenter.lat,
					longtitude: event.location?.longtitude ?? defaultCenter.lng,
					zoom: event.gmapZoomLevel || defaultZoom,
				},
			};
		});
	};

	const getExploreList = () => {
		try {
			service_get_area_and_event().then((res) => {
				if (res.status === 'success') {
					setExploreListAPI(res.data);
				}
			});
		} catch {}
	};

	useEffect(() => {
		const exploreList = exploreListAPI.map((item) => {
			return {
				id: item._id,
				province: getContent(item.name, locale),
				event: transformEvent(item.events),
			};
		});

		setExploreList(exploreList);
	}, [exploreListAPI, locale]);

	useEffect(() => {
		getExploreList();
	}, []);

	return (
		<Dropdown
			title={`${t[locale].exploreArea}${eventName ? `: ${getContent(eventName, locale)}` : ''}`}
			onClose={setDefault}
		>
			{eventList && eventList.length ? (
				<>
					<DropdownItem onClick={() => handleSelectProvince(null)}>
						<IconCaretDown icon={faCaretLeft} /> <BackItem>{t[locale].back}</BackItem>
					</DropdownItem>
					{eventList.map((item) => (
						<DropdownItem key={item.id} onClick={() => handleSelectEvent(item)}>
							{item.name}
						</DropdownItem>
					))}
				</>
			) : (
				exploreList.map((item) => (
					<DropdownItem key={item.id} onClick={() => handleSelectProvince(item.id)}>
						<ProvinceItem>{item.province}</ProvinceItem> <IconCaretDown icon={faCaretRight} />
					</DropdownItem>
				))
			)}
		</Dropdown>
	);
};

export default DropdownExplore;
