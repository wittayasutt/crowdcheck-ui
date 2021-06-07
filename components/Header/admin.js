import PropTypes from 'prop-types';
import Header from './index';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { service_auth } from '../../services';

const AdminHeader = ({ children }) => {
	const router = useRouter();

	const checkAuth = () => {
		service_auth()
			.then((res) => {
				if (!res.status === 'success') {
					router.push('/admin/login');
				}
			})
			.catch(() => {
				router.push('/admin/login');
			});
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<Header>
			<title>Administrator | Crowdcheck.info</title>
			{children}
		</Header>
	);
};

AdminHeader.propTypes = {
	children: PropTypes.node,
};

AdminHeader.defaultProps = {
	children: <></>,
};

export default AdminHeader;
