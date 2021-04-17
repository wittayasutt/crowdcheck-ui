import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { service_get_venue_list } from '../../services';
import Cookies from 'js-cookie';

// components
import Header from '../../components/Header/admin';
import Layout from '../../components/Layout/admin';
import List from '../../components/List';
import Loading from '../../components/Loading';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	padding: 16px;
`;

const Admin = () => {
	const router = useRouter();
	const { locale } = router;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('token');

		console.log('token', token);

		service_get_venue_list(token)
			.then((res) => {
				if (res.status === 'success') {
					console.log('res', res);
				} else {
					router.push('/admin/login');
				}

				setLoading(false);
			})
			.catch(() => {
				router.push('/admin/login');
			});
	}, []);

	return !loading ? (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<List title={t[locale].venue} type='venue' />
					{/* <List title='Others' /> */}
				</Wrapper>
			</Layout>
		</>
	) : (
		<Loading />
	);
};

export default Admin;
