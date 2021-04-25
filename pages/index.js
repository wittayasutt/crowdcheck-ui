import { useState, useEffect } from 'react';

import { service_get_venue_list } from '../services';

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

const HomePage = () => {
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
		const interval = setInterval(() => {
			setUpdatedTime(Date.now());
		}, INTERVAL_TIME);

		setTimeInterval(interval);
	};

	useEffect(() => {
		getVenue();
		getCrowdData();

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
