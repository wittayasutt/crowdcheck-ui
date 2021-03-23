import styled from 'styled-components';

// components
import Header from '../../../components/Header/admin';
import Layout from '../../../components/Layout/admin';
import Form from '../../../components/Form';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemAddProgram = () => {
	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<Form action='ADD' formType='PROGRAM' />
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemAddProgram;
