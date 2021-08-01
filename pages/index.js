import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { service_get_venue_list, service_get_crowd } from '../services';
import orderBy from 'lodash/orderBy';

import { getContent, transformCrowdData } from '../helpers';
import { getRenderVenue } from '../helpers/map';

// components
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Loading from '../components/Loading';

// Popup
import Density from '../components/Density';
import Legend from '../components/Legend';
import Place from '../components/Place';
import WelcomeModal from '../components/Modal/welcome';

// 3 Minutes
const INTERVAL_TIME = 180000;

const useRedux = () => {
	const dispatch = useDispatch();
	const setCrowdData = (crowdData) =>
		dispatch({ type: 'SET_CROWD_DATA', crowdData });
	const zoom = useSelector((state) => state.zoom);

	return { zoom, setCrowdData };
};

const HomePage = () => {
	const router = useRouter();
	const { locale } = router;

	const { zoom, setCrowdData } = useRedux();

	const [loading, setLoading] = useState(true);
	const [timeInterval, setTimeInterval] = useState(null);
	const [updatedTime, setUpdatedTime] = useState(Date.now());

	const [venueZoomOut, setVenueZoomOut] = useState([]);
	const [venueZoomIn, setVenueZoomIn] = useState([]);
	const [venue, setVenue] = useState([]);

	const getData = async () => {
		setLoading(true);

		try {
			const venueData = await getVenue();
			const crowdData = await getCrowdData();

			Promise.all([venueData, crowdData]).then(() => {
				setCrowdData(crowdData);
				setVenueData(venueData, crowdData);
				setUpdatedTime(Date.now());
			});
		} catch {
			setLoading(true);
		}
	};

	const getVenue = () => {
		return service_get_venue_list().then((res) => {
			if (res.status === 'success') {
				return res.data;
			}
		});
	};

	const getCrowdData = () => {
		return service_get_crowd().then((res) => {
			if (res) {
				return res;
			}
		});
	};

	const sortData = (data) => {
		const sortedNameData = orderBy(data, (item) => {
			return getContent(item.name, locale);
		});

		return orderBy(
			sortedNameData,
			(item) => {
				return item.crowd.value;
			},
			'desc'
		);
	};

	const setVenueData = (venueData, crowdData) => {
		if (crowdData) {
			const foundData = transformCrowdData(venueData, crowdData);
			const sortedData = sortData(foundData);

			setVenue(sortedData);
			setLoading(false);
		}
	};

	const interval = () => {
		getData();

		const interval = setInterval(() => {
			getData();
		}, INTERVAL_TIME);

		setTimeInterval(interval);
	};

	useEffect(() => {
		const { zoomIn, zoomOut } = getRenderVenue(venue);

		if (zoomIn) {
			setVenueZoomIn(zoomIn);
		}

		if (zoomOut) {
			setVenueZoomOut(zoomOut);
		}
	}, [venue]);

	useEffect(() => {
		interval();

		return () => {
			clearInterval(timeInterval);
		};
	}, []);

	const showVenue = zoom < 18 ? venueZoomOut : venueZoomIn;

	return (
		<>
			<Header />
			{!loading ? (
				<Layout>
					<Map data={showVenue} />
					<Footer />
					<Density data={venue} updatedTime={updatedTime} />
					<Legend />
					<Place updatedTime={updatedTime} />
				</Layout>
			) : (
				<Loading fullpage />
			)}

			<WelcomeModal />
		</>
	);
};

export default HomePage;
