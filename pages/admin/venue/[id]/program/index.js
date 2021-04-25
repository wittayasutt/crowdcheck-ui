import { useRouter } from 'next/router';
import styled from 'styled-components';

import { service_create_program } from '../../../../../services';

// components
import Header from '../../../../../components/Header/admin';
import Layout from '../../../../../components/Layout/admin';
import Form from '../../../../../components/Form';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemAddProgram = () => {
	const router = useRouter();
	const { id } = router.query;

	const handleUpdate = (payload, updateId, updateSubId, callback) => {
		service_create_program(payload, updateId)
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
					<Wrapper>
						<Form
							action='ADD'
							formType='PROGRAM'
							updateId={id}
							onUpdate={handleUpdate}
						/>
					</Wrapper>
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemAddProgram;
