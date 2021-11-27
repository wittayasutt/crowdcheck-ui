import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { service_get_event } from '../../../../../../services';

// components
import Header from '../../../../../../components/Header/admin';
import Layout from '../../../../../../components/Layout/admin';
import Form from '../../../../../../components/Form';
import Loading from '../../../../../../components/Loading';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemViewEvent = () => {
	const router = useRouter();
	const { id, eventId } = router.query;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		setLoading(true);

		if (!id || !eventId) {
			return;
		}

		try {
			service_get_event(id, eventId)
				.then((res) => {
					if (res.status === 'success') {
						setData(res.data);
						setLoading(false);
					} else {
						router.push('/admin');
					}
				})
				.catch(() => {
					router.push('/admin');
				});
		} catch {
			router.push('/admin');
		}
	}, [id]);

	return (
		<>
			<Header />
			{!loading ? (
				<Layout>
					<Wrapper>{data && <Form action='VIEW' formType='EVENT' data={data} />}</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default AdminItemViewEvent;
