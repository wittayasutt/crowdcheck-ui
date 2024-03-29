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

// Modals
import WelcomeModal from '../components/Modal/welcome';
import AttentionModal from '../components/Modal/attention';
import VaccinatedModal from '../components/Modal/vaccinated';
import ExploreModal from '../components/Modal/explore';

// 3 Minutes
const INTERVAL_TIME = 180000;

// Initial
const BYPASS = false;

const useRedux = () => {
	const dispatch = useDispatch();
	const setCrowdData = (crowdData) => dispatch({ type: 'SET_CROWD_DATA', crowdData });
	const zoom = useSelector((state) => state.zoom);
	const filter = useSelector((state) => state.filter);
	const eventId = useSelector((state) => state.eventId);
	const openVaccinatedModal = useSelector((state) => state.openVaccinatedModal);

	return { zoom, filter, eventId, openVaccinatedModal, setCrowdData };
};

const HomePage = () => {
	const router = useRouter();
	const { locale } = router;

	const { zoom, filter, eventId, openVaccinatedModal, setCrowdData } = useRedux();

	const [loading, setLoading] = useState(true);
	const [timeInterval, setTimeInterval] = useState(null);
	const [updatedTime, setUpdatedTime] = useState(Date.now());

	const [venueZoomOut, setVenueZoomOut] = useState([]);
	const [venueZoomIn, setVenueZoomIn] = useState([]);
	const [venue, setVenue] = useState([]);

	const [modalStep, setModalStep] = useState(0);

	const getData = async (isInit) => {
		if (isInit) {
			setLoading(true);
		}

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
		return service_get_venue_list(eventId).then((res) => {
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

	const filterCondition = (data) => {
		const atkOnSite = filter.includes('atkOnSite');
		const atk = filter.includes('atk');
		const notRequire = filter.includes('notRequire');
		const requireOne = filter.includes('requireOne');
		const requireTwo = filter.includes('requireTwo');

		const showAll = (notRequire && requireOne && requireTwo) || (!notRequire && !requireOne && !requireTwo);

		return data.filter((item) => {
			if (!item.covid19Conditions) {
				return true;
			}

			const { isATKRequiredOnSite, isATKRequired, numberOfVaccineDosesRequired } = item.covid19Conditions;

			if (isATKRequiredOnSite && !atkOnSite) {
				return false;
			} else if (isATKRequired && !atk) {
				return false;
			} else if (showAll) {
				return true;
			} else if (numberOfVaccineDosesRequired === 0 && !notRequire) {
				return false;
			} else if (numberOfVaccineDosesRequired === 1 && !requireOne) {
				return false;
			} else if (numberOfVaccineDosesRequired === 2 && !requireTwo) {
				return false;
			}

			return true;
		});
	};

	const setVenueData = (venueData, crowdData) => {
		if (crowdData) {
			const foundData = transformCrowdData(venueData, crowdData, BYPASS);
			const sortedData = sortData(foundData);

			setVenue(sortedData);
			setLoading(false);
		}
	};

	const interval = () => {
		getData(true);

		const interval = setInterval(() => {
			getData(false);
		}, INTERVAL_TIME);

		setTimeInterval(interval);
	};

	const onClickNextModal = () => {
		setModalStep(modalStep + 1);
	};

	useEffect(() => {
		const filteredData = filterCondition(venue);
		const { zoomIn, zoomOut } = getRenderVenue(filteredData);

		if (zoomIn) {
			setVenueZoomIn(zoomIn);
		}

		if (zoomOut) {
			setVenueZoomOut(zoomOut);
		}
	}, [venue, filter]);

	useEffect(() => {
		getData(false);
	}, [eventId]);

	useEffect(() => {
		interval();

		return () => {
			clearInterval(timeInterval);
		};
	}, []);

	useEffect(() => {
		const isOpenAttentionModal = localStorage.getItem('isOpenAttentionModal');
		const isOpenVaccinatedModal = localStorage.getItem('isOpenVaccinatedModal');
		const isOpenExploreModal = localStorage.getItem('isOpenExploreModal');

		if (isOpenAttentionModal) {
			setModalStep(1);
		}

		if (isOpenVaccinatedModal) {
			setModalStep(2);
		}

		if (isOpenExploreModal) {
			setModalStep(3);
		}
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

			{modalStep === 0 && <AttentionModal onClickNext={onClickNextModal} />}
			{(modalStep === 1 || openVaccinatedModal) && <VaccinatedModal onClickNext={onClickNextModal} />}
			{modalStep === 2 && <ExploreModal onClickNext={onClickNextModal} />}

			{/* Don't show welcome modal, pull it back when want to use it again */}
			{false && <WelcomeModal />}
		</>
	);
};

export default HomePage;
