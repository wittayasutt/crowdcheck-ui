// components
import Header from '../components/Header';
import Layout from '../components/Layout';
import About from '../components/About';

const AboutPage = () => {
	return (
		<>
			<Header>
				<title>About Us | Crowdcheck.io</title>
			</Header>
			<Layout white>
				<About />
			</Layout>
		</>
	);
};

export default AboutPage;
