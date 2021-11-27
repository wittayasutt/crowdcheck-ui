import styled from 'styled-components';
import { useRouter } from 'next/router';

import { service_create_area } from '../../../services';

// components
import Header from '../../../components/Header/admin';
import Layout from '../../../components/Layout/admin';
import Form from '../../../components/Form';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemAddArea = () => {
	const router = useRouter();

	const handleUpdate = (payload, updateId, updateSubId, callback) => {
		try {
			service_create_area(payload)
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

	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<Form action='ADD' formType='AREA' onUpdate={handleUpdate} />
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemAddArea;
