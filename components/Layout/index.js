import PropTypes from 'prop-types'
import styled from 'styled-components'

// components
import Navbar from '../Navbar'

const Wrapper = styled.div`
	min-height: 100vh;

	display: flex;
	flex-direction: column;
`

const Main = styled.main`
	flex: 1;
`

const MainLayout = ({ children }) => {
	return (
		<Wrapper>
			<Navbar />
			<Main>{children}</Main>
		</Wrapper>
	)
}

MainLayout.propTypes = {
	children: PropTypes.node,
}

MainLayout.defaultProps = {
	children: <></>,
}

export default MainLayout
