import styled from 'styled-components';
import { useRouter } from 'next/router';

import { service_create_venue } from '../../../services';

// components
import Header from '../../../components/Header/admin';
import Layout from '../../../components/Layout/admin';
import Form from '../../../components/Form';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemAddVenue = () => {
	const router = useRouter();

	const handleUpdate = (payload, updateId, updateSubId, callback) => {
		service_create_venue(payload)
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
	};

	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<Form action='ADD' formType='VENUE' onUpdate={handleUpdate} />
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemAddVenue;
