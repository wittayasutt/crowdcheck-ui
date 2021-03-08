import PropTypes from 'prop-types'
import Head from 'next/head'

const Header = ({ children }) => {
	return (
		<Head>
			<title>Crowdcheck.io</title>
			<link rel='icon' href='/favicon.ico' />
			{children}
		</Head>
	)
}

Header.propTypes = {
	children: PropTypes.node,
}

Header.defaultProps = {
	children: <></>,
}

export default Header
