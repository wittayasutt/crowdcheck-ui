// components
import Header from '../components/Header'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Map from '../components/Map'

const HomePage = () => {
	return (
		<>
			<Header />
			<Layout>
				{/* 112px = Nav height + Footer height */}
				<Map offset='112px' />
				<Footer />
			</Layout>
		</>
	)
}

export default HomePage
