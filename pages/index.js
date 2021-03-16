// components
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Filter from '../components/Filter';
import Legend from '../components/Legend';

const HomePage = () => {
	return (
		<>
			<Header />
			<Layout>
				<Map />
				<Footer />
				<Filter />
				<Legend />
			</Layout>
		</>
	);
};

export default HomePage;
