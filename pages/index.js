// components
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Map from '../components/Map';

// Popup
import Filter from '../components/Filter';
import Legend from '../components/Legend';
import Place from '../components/Place';

const HomePage = () => {
	return (
		<>
			<Header />
			<Layout>
				<Map />
				<Footer />
				<Filter />
				<Legend />
				<Place />
			</Layout>
		</>
	);
};

export default HomePage;
