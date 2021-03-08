import styled from 'styled-components';

// components
import Header from '../../../components/Header/admin';
import Layout from '../../../components/Layout/admin';
import Form from '../../../components/Form';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemAddOther = () => {
	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<Form action='ADD' type='other' />
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemAddOther;
