import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { service_get_venue, service_update_venue } from '../../../../services';

// components
import Header from '../../../../components/Header/admin';
import Layout from '../../../../components/Layout/admin';
import Form from '../../../../components/Form';
import Loading from '../../../../components/Loading';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemEditVenue = () => {
	const router = useRouter();
	const { id } = router.query;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const handleUpdate = (payload, updateId, updateSubId, callback) => {
		try {
			service_update_venue(payload, updateId)
				.then((res) => {
					if (res.status === 'success') {
						router.push('/admin');
					} else {
						callback(true);
					}
				})
				.catch(() => {
					callback(true);
				});
		} catch {
			callback(true);
		}
	};

	useEffect(() => {
		setLoading(true);

		if (!id) {
			return;
		}

		try {
			service_get_venue(id)
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
					<Wrapper>
						<Wrapper>
							{data && (
								<Form
									action='EDIT'
									formType='VENUE'
									data={data}
									updateId={id}
									onUpdate={handleUpdate}
								/>
							)}
						</Wrapper>
					</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default AdminItemEditVenue;
