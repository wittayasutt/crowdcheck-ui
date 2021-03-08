import PropTypes from 'prop-types'
import Header from './index'
import Router from 'next/router'

const AdminHeader = ({ children }) => {
	// TODO: check permission

	// if (process.browser) {
	// 	Router.push(`/admin/login`)
	// }

	return (
		<Header>
			<title>Administrator | Crowdcheck.io</title>
			{children}
		</Header>
	)
}

AdminHeader.propTypes = {
	children: PropTypes.node,
}

AdminHeader.defaultProps = {
	children: <></>,
}

export default AdminHeader
