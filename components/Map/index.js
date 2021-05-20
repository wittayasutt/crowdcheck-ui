import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Zoom from '../Base/zoom';

const bootstrapURLKeys = {
	key: 'AIzaSyDNAO9CrN3__3vQ6BEOLAY4QdBEf56GiRk',
	libraries: ['places', 'geometry'],
};

const POI_DATA = [
	{
		title: 'cafeAndRestaurant',
		data: 'https://crowdcheck.info/POI/gastronomy.kml',
	},
	{
		title: 'parking',
		data: 'https://crowdcheck.info/POI/parking.kml',
	},
	{
		title: 'gallery',
		data: 'https://crowdcheck.info/POI/gallery.kml',
	},
	{
		title: 'designStudio',
		data: 'https://crowdcheck.info/POI/design_studio.kml',
	},
	{
		title: 'craft',
		data: 'https://developers.google.com/kml/documentation/KML_Samples.kml',
	},
	{
		title: 'fashion',
		data: 'https://crowdcheck.info/POI/fashion.kml',
	},
];

const useRedux = () => {
	const dispatch = useDispatch();
	const selectPlace = (place) => dispatch({ type: 'SELECT_PLACE', place });
	const setZoom = (zoom) => dispatch({ type: 'SET_ZOOM', zoom });
	const toLocation = (coord) => dispatch({ type: 'TO_LOCATION', coord });
	const poi = useSelector((state) => state.poi);
	const coord = useSelector((state) => state.coord);

	return { selectPlace, setZoom, poi, coord, toLocation };
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

	const { selectPlace, setZoom, poi, coord, toLocation } = useRedux();

	const [instance, setInstance] = useState({
		zoom: defaultZoom,
	});
	const [mapApi, setMapApi] = useState({
		loaded: false,
		api: null,
	});

	const [kmlLayers, setKmlLayers] = useState(null);
	const [userLocation, setUserLocation] = useState(null);

	const apiHasLoaded = (instance, api) => {
		setInstance(instance);
		setMapApi({
			loaded: true,
			api,
		});
	};

	const handleSelectPlace = (id, venueName, crowd) => {
		service_get_program_list(id).then((res) => {
			if (res.status === 'success') {
				const matchedPrograms = getMatchingProgram(res.data);

				if (matchedPrograms.length > 0 && crowd.value) {
					selectPlace({
						programs: matchedPrograms,
						venueName,
						crowd,
						nearby: 'loading',
					});

					handleGetNearlyPlace(id, matchedPrograms, venueName, crowd);
				} else {
					selectPlace({
						programs: 'NO_EVENT',
						venueName,
						crowd,
					});
				}
			}
		});
	};

	const handleGetNearlyPlace = (id, programs, venueName, crowd) => {
		service_get_venue_nearby(id).then((res) => {
			if (res.status === 'success') {
				selectPlace({
					programs,
					venueName,
					crowd,
					nearby: res.data,
				});
			}
		});
	};

	const handleChangeZoom = (zoom) => {
		setZoom(zoom);
	};

	useEffect(() => {
		if (mapApi.api) {
			const kmlLayers = POI_DATA.map((item) => {
				const kmlLayer = new mapApi.api.KmlLayer(item.data, {
					suppressInfoWindows: false,
					preserveViewport: true,
				});

				return { title: item.title, kmlLayer };
			});

			setKmlLayers(kmlLayers);
		}
	}, [mapApi.api]);

	useEffect(() => {
		if (kmlLayers) {
			kmlLayers.forEach((item) => {
				item.kmlLayer.setMap(null);
			});
		}

		if (kmlLayers && poi) {
			poi.forEach((poiItem) => {
				const found = kmlLayers.find((item) => item.title === poiItem);
				found.kmlLayer.setMap(instance);
			});
		}
	}, [instance, kmlLayers, poi]);

	useEffect(() => {
		if (instance && mapApi.api && navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				if (
					position.coords &&
					position.coords.latitude &&
					position.coords.longitude
				) {
					setUserLocation({
						latitude: position.coords.latitude,
						longtitude: position.coords.longitude,
					});

					const marker = new mapApi.api.Marker({
						position: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						icon: '/images/user.png',
					});

					marker.setMap(instance);
				}
			});
		}
	}, [instance, mapApi.api, navigator, navigator.geolocation]);

	useEffect(() => {
		if (coord && mapApi.api && userLocation) {
			const bounds = new mapApi.api.LatLngBounds();

			const toLatitude =
				coord === 'CURRENT' ? userLocation.latitude : coord.latitude;
			const toLongtitude =
				coord === 'CURRENT' ? userLocation.longtitude : coord.longtitude;

			const marker = new mapApi.api.Marker({
				position: new mapApi.api.LatLng(toLatitude, toLongtitude),
			});

			bounds.extend(marker.getPosition());

			instance.fitBounds(bounds);
			instance.setZoom(17);

			toLocation(null);
		}
	}, [coord]);

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
				onZoomAnimationStart={handleChangeZoom}
			>
				{data &&
					data.map((item, index) => {
						if (item.number) {
							return (
								<Zoom
									key={index}
									number={item.number}
									lat={item.location.latitude}
									lng={item.location.longtitude}
								/>
							);
						}

						return item.crowd && item.crowd.value && item.location ? (
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
										item.crowd
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
