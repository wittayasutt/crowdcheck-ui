import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { service_get_venue_list, service_get_crowd } from '../services';
import orderBy from 'lodash/orderBy';

import { getContent, transformCrowdData } from '../helpers';

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

// 3 Minutes
const INTERVAL_TIME = 180000;

const useRedux = () => {
	const dispatch = useDispatch();
	const setCrowdData = (crowdData) =>
		dispatch({ type: 'SET_CROWD_DATA', crowdData });
	const crowd = useSelector((state) => state.crowdData);

	return { crowd, setCrowdData };
};

const HomePage = () => {
	const router = useRouter();
	const { locale } = router;

	const { crowd, setCrowdData } = useRedux();

	const [loading, setLoading] = useState(true);
	const [timeInterval, setTimeInterval] = useState(null);
	const [updatedTime, setUpdatedTime] = useState(Date.now());

	const [rawVenue, setRawVenue] = useState([]);
	const [venue, setVenue] = useState([]);

	const getVenue = () => {
		setLoading(true);

		service_get_venue_list().then((res) => {
			if (res.status === 'success') {
				setRawVenue(res.data);
				setVenueData(res.data, crowd);
			}
		});
	};

	const getCrowdData = () => {
		service_get_crowd().then((res) => {
			if (res) {
				setCrowdData(res);
				setUpdatedTime(Date.now());
			} else {
				// can't get crowd api, waiting 5 sec and get again
				setLoading(true);

				const timeout = setTimeout(() => {
					getCrowdData();
				}, 5000);

				clearTimeout(timeout);
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
		getCrowdData();

		const interval = setInterval(() => {
			getCrowdData();
		}, INTERVAL_TIME);

		setTimeInterval(interval);
	};

	useEffect(() => {
		setVenueData(rawVenue, crowd);
	}, [crowd]);

	useEffect(() => {
		getVenue();
		interval();

		return () => {
			clearInterval(timeInterval);
		};
	}, []);

	return (
		<>
			<Header />
			{!loading ? (
				<Layout>
					<Map data={venue} />
					<Footer />
					<Density data={venue} updatedTime={updatedTime} />
					<Legend />
					<Place updatedTime={updatedTime} />
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default HomePage;
