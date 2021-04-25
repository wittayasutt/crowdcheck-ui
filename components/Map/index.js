import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import {
	service_get_program_list,
	service_get_venue_nearby,
} from '../../services';

import { defaultCenter, defaultZoom } from './const';
import mapStyles from './theme';
import { getContent } from '../../helpers';

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

const Map = ({ data, offset }) => {
	const router = useRouter();
	const { locale } = router;

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

	const handleSelectPlace = (id) => {
		service_get_program_list(id).then((res) => {
			if (res.status === 'success') {
				// TODO: find matching time place
				if (res.data[0]) {
					selectPlace(res.data[0]);
				}
			}
		});
	};

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
				{data &&
					data.map((item) => {
						return item.location ? (
							<Marker
								key={item._id}
								level={1}
								title={getContent(item.name, locale)}
								lat={item.location.latitude}
								lng={item.location.longtitude}
								onClick={() => handleSelectPlace(item._id)}
							/>
						) : null;
					})}
			</GoogleMapReact>
		</Wrapper>
	);
};

Map.propTypes = {
	offset: PropTypes.string,
	data: PropTypes.array,
};

Map.defaultProps = {
	offset: '0px',
	data: [],
};

export default Map;
