import styled from 'styled-components'
import Head from 'next/head'

// components
import Navbar from '../components/Navbar'
import About from '../components/About'

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
				<title>About Us | Crowdcheck.io</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<Main>
				<About />
			</Main>
		</Wrapper>
	)
}
