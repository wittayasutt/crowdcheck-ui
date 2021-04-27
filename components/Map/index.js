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
import { getContent, getMatchingProgram } from '../../helpers';

// components
import Marker from '../Marker';

// TODO: add real key
const bootstrapURLKeys = {
	key: 'AIzaSyCER7hN0p-_U36bIxFR3W_fRD6BZ_Kf3CI',
	libraries: ['places', 'geometry'],
};

const useRedux = () => {
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

const Map = ({ data, offset }) => {
	const router = useRouter();
	const { locale } = router;

	const { selectPlace } = useRedux();

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

	const handleSelectPlace = (id, venueName, level) => {
		service_get_program_list(id).then((res) => {
			if (res.status === 'success') {
				const matchedPrograms = getMatchingProgram(res.data);

				if (matchedPrograms.length > 0) {
					selectPlace({
						programs: matchedPrograms,
						venueName,
						level,
						nearby: 'loading',
					});

					handleGetNearlyPlace(id, matchedPrograms, venueName, level);
				} else {
					selectPlace('NO_EVENT');
				}
			}
		});
	};

	const handleGetNearlyPlace = (id, programs, venueName, level) => {
		service_get_venue_nearby(id).then((res) => {
			if (res.status === 'success') {
				selectPlace({
					programs,
					venueName,
					level,
					nearby: res.data,
				});
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
						return item.crowd.value && item.location ? (
							<Marker
								key={item._id}
								level={item.crowd.value}
								title={getContent(item.name, locale)}
								lat={item.location.latitude}
								lng={item.location.longtitude}
								onClick={() =>
									handleSelectPlace(
										item._id,
										getContent(item.name, locale),
										item.crowd.value
									)
								}
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
