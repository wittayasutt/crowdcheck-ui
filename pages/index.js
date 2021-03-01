import styled from 'styled-components'
import Head from 'next/head'

// components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Map from '../components/Map'

const Wrapper = styled.div`
	min-height: 100vh;

	display: flex;
	flex-direction: column;
`

const Main = styled.main`
	flex: 1;
`

export default function Home() {
	return (
		<Wrapper>
			<Head>
				<title>Crowdcheck.io</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<Main>
				{/* 112px = Nav height + Footer height */}
				<Map offset='112px' />
			</Main>
			<Footer />
		</Wrapper>
	)
}
