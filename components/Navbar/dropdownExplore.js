import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// components
import Dropdown from '../Base/dropdown';
import DropdownItem from '../Base/dropdownItem';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// lang
import t from '../../translate';

// TODO: remove 'mockData' after implement
const mockData = [
	{
		id: 0,
		province: 'Bangkok',
		event: [
			{
				id: 0,
				name: 'Bangrak',
				lat: 13.73117,
				lng: 100.5232,
				zoom: 16,
			},
			{
				id: 1,
				name: 'Ari - Pradipat',
				lat: 13.73217,
				lng: 100.5332,
				zoom: 15,
			},
			{
				id: 2,
				name: 'Thonglor',
				lat: 13.73317,
				lng: 100.5432,
				zoom: 15,
			},
			{
				id: 3,
				name: 'Phranakorn',
				lat: 13.73417,
				lng: 100.5532,
				zoom: 17,
			},
		],
	},
	{
		id: 1,
		province: 'Chiangmai',
		event: [
			{
				id: 0,
				name: 'Center',
				lat: 18.7941937,
				lng: 98.816391,
				zoom: 16,
			},
		],
	},
];

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

	const [exploreList, setExploreList] = useState([]);
	const [eventList, setEventList] = useState([]);

	const setDefault = () => {
		setEventList([]);
	};

	const handleSelectProvince = (selectProvinceId) => {
		const found = exploreList.find((item) => item.id === selectProvinceId);
		const foundEventList = found ? found.event : [];
		setEventList(foundEventList);
	};

	useEffect(() => {
		setExploreList(mockData);
	}, [mockData]);

	return (
		<Dropdown title={t[locale].exploreArea} onClose={setDefault}>
			{eventList && eventList.length ? (
				<>
					<DropdownItem onClick={() => handleSelectProvince(null)}>
						<IconCaretDown icon={faCaretLeft} /> <BackItem>{t[locale].back}</BackItem>
					</DropdownItem>
					{eventList.map((item) => (
						<DropdownItem key={item.id}>{item.name}</DropdownItem>
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
