import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { service_get_venue_list, service_get_crowd } from '../services';

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

	return { setCrowdData };
};

const HomePage = () => {
	const { setCrowdData } = useRedux();

	const [loading, setLoading] = useState(true);
	const [timeInterval, setTimeInterval] = useState(null);
	const [updatedTime, setUpdatedTime] = useState(Date.now());

	const [venue, setVenue] = useState([]);

	const getVenue = () => {
		setLoading(true);

		service_get_venue_list().then((res) => {
			if (res.status === 'success') {
				setVenue(res.data);
				setLoading(false);
			}
		});
	};

	const getCrowdData = () => {
		service_get_crowd().then((res) => {
			setCrowdData(res);
			setUpdatedTime(Date.now());
		});
	};

	const interval = () => {
		getCrowdData();

		const interval = setInterval(() => {
			getCrowdData();
		}, INTERVAL_TIME);

		setTimeInterval(interval);
	};

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
