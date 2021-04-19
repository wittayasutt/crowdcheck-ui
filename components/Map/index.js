import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { defaultCenter, defaultZoom } from './const';
import mapStyles from './theme';

// components
import Marker from '../Marker';

// TODO: add real key
const bootstrapURLKeys = {
	key: 'AIzaSyCER7hN0p-_U36bIxFR3W_fRD6BZ_Kf3CI',
	libraries: ['places', 'geometry'],
};

const useMap = () => {
	const dispatch = useDispatch();
	const selectPlace = (place) => dispatch({ type: 'SELECT_PLACE', place });

	return { selectPlace };
};

const Wrapper = styled.nav`
	height: calc(100vh - 176px);
	width: 100%;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		height: calc(100vh - 112px);
	}
`;

const mockMap = [
	{
		programName: 'Lighting Exhibition',
		programType: 'Program Type',
		programImage: '/mock/colosseum.jpeg',
		owner: 'Exhibitor',
		detail: 'Lighting Designers Thailand',
		date: Date.now(),
		level: 1,
		location: {
			lat: 13.746774,
			lng: 100.5126445,
		},
		link: {
			title: 'BKKDW',
			to: 'https://www.google.co.th/',
		},
	},
	{
		programName: 'Lighting Exhibition',
		programType: 'Program Type',
		programImage: '/mock/colosseum.jpeg',
		owner: 'Exhibitor',
		detail: 'Lighting Designers Thailand',
		date: Date.now(),
		level: 2,
		location: {
			lat: 13.736774,
			lng: 100.5326445,
		},
		link: {
			title: 'BKKDW',
			to: 'https://www.google.co.th/',
		},
	},
	{
		programName: 'Lighting Exhibition',
		programType: 'Program Type',
		programImage: '/mock/colosseum.jpeg',
		owner: 'Exhibitor',
		detail: 'Lighting Designers Thailand',
		date: Date.now(),
		level: 3,
		location: {
			lat: 13.746774,
			lng: 100.5526445,
		},
		link: {
			title: 'BKKDW',
			to: 'https://www.google.co.th/',
		},
	},
	{
		programName: 'Lighting Exhibition',
		programType: 'Program Type',
		programImage: '/mock/colosseum.jpeg',
		owner: 'Exhibitor',
		detail: 'Lighting Designers Thailand',
		date: Date.now(),
		level: 4,
		location: {
			lat: 13.756774,
			lng: 100.5326445,
		},
		link: {
			title: 'BKKDW',
			to: 'https://www.google.co.th/',
		},
	},
];

const Map = ({ offset }) => {
	const { selectPlace } = useMap();

	const [instance, setInstance] = useState(null);
	const [mapApi, setMapApi] = useState({
		loaded: false,
		api: null,
	});

	const apiHasLoaded = (instance, api) => {
		setInstance(instance);
		setMapApi({
			loaded: true,
			api,
		});
	};

	const marker = mockMap;

	return (
		<Wrapper offset={offset}>
			<GoogleMapReact
				bootstrapURLKeys={bootstrapURLKeys}
				defaultCenter={defaultCenter}
				center={defaultCenter}
				defaultZoom={defaultZoom}
				options={{
					styles: mapStyles,
					fullscreenControl: false,
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
			>
				{marker.map((item, key) => (
					<Marker
						key={key}
						level={item.level}
						lat={item.location.lat}
						lng={item.location.lng}
						onClick={() => selectPlace(item)}
					/>
				))}
			</GoogleMapReact>
		</Wrapper>
	);
};

Map.propTypes = {
	offset: PropTypes.string,
};

Map.defaultProps = {
	offset: '0px',
};

export default Map;
