import styled from 'styled-components';

// components
import Header from '../../components/Header/admin';
import Layout from '../../components/Layout/admin';
import List from '../../components/List';

const Wrapper = styled.div`
	padding: 16px;
`;

const Admin = () => {
	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<List title='Venues' type='venue' />
					{/* <List title='Others' /> */}
				</Wrapper>
			</Layout>
		</>
	);
};

export default Admin;
